
(function () {
  const config = window.SITE_CONFIG || {};
  const state = { posts: [], client: null };

  function $(sel, root=document){ return root.querySelector(sel); }
  function $all(sel, root=document){ return Array.from(root.querySelectorAll(sel)); }

  function formatDate(value){
    try{
      return new Date(value).toLocaleDateString(undefined,{year:'numeric', month:'long', day:'numeric'});
    }catch(e){ return value || ''; }
  }

  function slugify(text){
    return String(text || '')
      .toLowerCase()
      .replace(/[^\w\s-]/g,'')
      .trim()
      .replace(/\s+/g,'-')
      .replace(/-+/g,'-');
  }

  const fallbackPosts = [
    {
      title: "Meeting People Where They Are—In Every Season",
      slug: "meeting-people-where-they-are-in-every-season",
      excerpt: "Dave’s Winter Insights on Engagement. Good engagement doesn’t come from a script. It comes from reading the moment.",
      cover_image: "https://donofr.io/wp-content/uploads/2025/12/803beb59-d1eb-48ea-a83b-0b692036a85a_1688x3000-576x1024.jpg",
      author: "Dave D’Onofrio",
      published_at: "2025-12-05T18:49:49Z",
      content_html: `
        <h2>Dave’s Winter Insights on Engagement</h2>
        <p>Winter’s here, and it’s a great time to be out in the field. From snow on the Allegheny ridges to the sharp wind across the plains to the chill of the Pacific Northwest, every season brings its own rhythm to the work.</p>
        <p>Of course, not every meeting feels calm. Sometimes the passion in a public hearing fills the room. Folks raise their voices because they care strongly about things. And that’s OK. But when the room gets too loud, it’s a cue to get creative—to find other ways to communicate, listen, and engage.</p>
        <img src="https://donofr.io/wp-content/uploads/2025/12/803beb59-d1eb-48ea-a83b-0b692036a85a_1688x3000-576x1024.jpg" alt="Winter field engagement" />
        <p>Good engagement doesn’t come from a script. It comes from reading the moment. Some communities want facts and figures. Others want to know who’s behind the project and what kind of neighbors they’ll be.</p>
        <p>The best campaigns adapt. They meet people where they are—in coffee shops, at ballfields, or through local voices they already trust.</p>
      `
    },
    {
      title: "Which LLMs Can Actually Code Genetic Algorithms That Work?",
      slug: "which-llms-can-actually-code-genetic-algorithms-that-work",
      excerpt: "A practical test using Snake to separate working algorithm design from confident-sounding code.",
      cover_image: "https://donofr.io/wp-content/uploads/2025/12/results-1024x597.jpg",
      author: "Ryan D’Onofrio",
      published_at: "2025-12-05T18:43:18Z",
      content_html: `
        <p>I won’t bury the lede. Here’s the cool part.</p>
        <img src="https://donofr.io/wp-content/uploads/2025/12/results-1024x597.jpg" alt="LLM coding results" />
        <p>I was recently building a Minesweeper deep learning system and hit a wall. I turned to GPT-5 and got hundreds of lines of sophisticated-looking nonsense.</p>
        <p>I wanted to know which models can truly design algorithmic systems that work, not just generate confident-sounding code. So I used the classic Snake game as a test.</p>
        <p><a href="https://ryan.donofr.io/blog/llm-genetic-algorithms">Read the full story here</a>.</p>
      `
    }
  ];

  async function getClient(){
    if (state.client) return state.client;
    if (!window.supabase || !config.supabaseUrl || !config.supabaseAnonKey || config.supabaseUrl.startsWith('YOUR_')) return null;
    state.client = window.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey);
    return state.client;
  }

  async function fetchPosts(limit){
    const client = await getClient();
    if (!client) {
      state.posts = fallbackPosts.slice();
      return state.posts.slice(0, limit || fallbackPosts.length);
    }
    const query = client.from('posts')
      .select('id,title,slug,excerpt,cover_image,author,published_at,content_html')
      .eq('published', true)
      .order('published_at', { ascending: false });

    const { data, error } = limit ? await query.limit(limit) : await query;
    if (error || !data || !data.length) {
      state.posts = fallbackPosts.slice();
      return state.posts.slice(0, limit || fallbackPosts.length);
    }
    state.posts = data;
    return data;
  }

  function renderPosts(posts, targetSel){
    const root = $(targetSel);
    if (!root) return;
    root.innerHTML = posts.map(post => `
      <article class="card blog-card">
        ${post.cover_image ? `<img src="${post.cover_image}" alt="${post.title}">` : ''}
        <div class="card-body">
          <div class="blog-meta">${formatDate(post.published_at)} · ${post.author || 'DONOFR.IO'}</div>
          <h3><a href="post.html?slug=${encodeURIComponent(post.slug)}">${post.title}</a></h3>
          <p>${post.excerpt || ''}</p>
        </div>
      </article>
    `).join('');
  }

  async function initHome(){
    const posts = await fetchPosts(2);
    renderPosts(posts, '#latest-posts');
  }

  async function initThoughts(){
    const posts = await fetchPosts();
    renderPosts(posts, '#all-posts');
  }

  async function initPost(){
    const root = $('#post-root');
    if (!root) return;
    const params = new URLSearchParams(location.search);
    const slug = params.get('slug');
    const posts = await fetchPosts();
    const post = posts.find(p => p.slug === slug) || fallbackPosts.find(p => p.slug === slug);
    if (!post) {
      root.innerHTML = '<div class="notice">Post not found.</div>';
      return;
    }
    document.title = `${post.title} — ${config.siteName || 'DONOFR.IO'}`;
    root.innerHTML = `
      <div class="post-wrap">
        <div class="small"><a href="thoughts.html">← Back to Thoughts</a></div>
        <header class="page-hero">
          <h1>${post.title}</h1>
          <div class="blog-meta">${formatDate(post.published_at)} · ${post.author || 'DONOFR.IO'}</div>
        </header>
        <article class="post-content">${post.content_html || ''}</article>
      </div>
    `;
  }

  async function initAdmin(){
    const loginBtn = $('#login-btn');
    const saveBtn = $('#save-post-btn');
    const signOutBtn = $('#signout-btn');
    const authState = $('#auth-state');
    const postForm = $('#post-form');
    if (!loginBtn || !postForm) return;

    const client = await getClient();
    if (!client) {
      authState.innerHTML = 'Add your Supabase URL and anon key in <code>config.js</code> to use the blog admin.';
      return;
    }

    async function refreshSession(){
      const { data } = await client.auth.getSession();
      const session = data.session;
      authState.textContent = session?.user?.email ? `Signed in as ${session.user.email}` : 'Not signed in.';
      postForm.style.display = session ? 'block' : 'none';
      signOutBtn.style.display = session ? 'inline-flex' : 'none';
      return session;
    }

    loginBtn.addEventListener('click', async () => {
      const email = $('#email').value.trim() || config.adminEmail;
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: location.href }
      });
      authState.textContent = error ? error.message : 'Magic link sent. Open it on this device, then come back here.';
    });

    saveBtn.addEventListener('click', async () => {
      const session = await refreshSession();
      if (!session) {
        authState.textContent = 'Sign in first.';
        return;
      }
      const payload = {
        title: $('#title').value.trim(),
        slug: slugify($('#slug').value.trim() || $('#title').value.trim()),
        excerpt: $('#excerpt').value.trim(),
        cover_image: $('#cover_image').value.trim(),
        author: $('#author').value.trim() || 'DONOFR.IO',
        content_html: $('#content_html').value.trim(),
        published: $('#published').checked,
        published_at: new Date().toISOString()
      };
      const { error } = await client.from('posts').insert(payload);
      authState.textContent = error ? error.message : 'Post saved.';
      if (!error) postForm.reset();
    });

    signOutBtn.addEventListener('click', async () => {
      await client.auth.signOut();
      refreshSession();
    });

    client.auth.onAuthStateChange(() => refreshSession());
    refreshSession();
  }

  document.addEventListener('DOMContentLoaded', () => {
    if ($('#latest-posts')) initHome();
    if ($('#all-posts')) initThoughts();
    if ($('#post-root')) initPost();
    if ($('#admin-root')) initAdmin();
  });
})();
