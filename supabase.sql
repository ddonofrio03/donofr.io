
create extension if not exists pgcrypto;

create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text,
  cover_image text,
  author text default 'DONOFR.IO',
  content_html text not null,
  published boolean not null default false,
  published_at timestamptz default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users(id) on delete set null
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_posts_updated_at on public.posts;
create trigger trg_posts_updated_at
before update on public.posts
for each row execute function public.set_updated_at();

alter table public.posts enable row level security;

drop policy if exists "public can read published posts" on public.posts;
create policy "public can read published posts"
on public.posts
for select
using (published = true);

drop policy if exists "approved user can insert posts" on public.posts;
create policy "approved user can insert posts"
on public.posts
for insert
to authenticated
with check (
  auth.email() = 'ddonofrio@thecaseygroup.us'
);

drop policy if exists "approved user can update posts" on public.posts;
create policy "approved user can update posts"
on public.posts
for update
to authenticated
using (auth.email() = 'ddonofrio@thecaseygroup.us')
with check (auth.email() = 'ddonofrio@thecaseygroup.us');

drop policy if exists "approved user can delete posts" on public.posts;
create policy "approved user can delete posts"
on public.posts
for delete
to authenticated
using (auth.email() = 'ddonofrio@thecaseygroup.us');

insert into public.posts (title, slug, excerpt, cover_image, author, content_html, published, published_at)
values
(
  'Meeting People Where They Are—In Every Season',
  'meeting-people-where-they-are-in-every-season',
  'Dave’s Winter Insights on Engagement. Good engagement doesn’t come from a script. It comes from reading the moment.',
  'https://donofr.io/wp-content/uploads/2025/12/803beb59-d1eb-48ea-a83b-0b692036a85a_1688x3000-576x1024.jpg',
  'Dave D’Onofrio',
  '<h2>Dave’s Winter Insights on Engagement</h2><p>Winter’s here, and it’s a great time to be out in the field. From snow on the Allegheny ridges to the sharp wind across the plains to the chill of the Pacific Northwest, every season brings its own rhythm to the work.</p><p>Of course, not every meeting feels calm. Sometimes the passion in a public hearing fills the room. Folks raise their voices because they care strongly about things. And that’s OK. But when the room gets too loud, it’s a cue to get creative—to find other ways to communicate, listen, and engage.</p><img src="https://donofr.io/wp-content/uploads/2025/12/803beb59-d1eb-48ea-a83b-0b692036a85a_1688x3000-576x1024.jpg" alt="Winter field engagement" /><p>Good engagement doesn’t come from a script. It comes from reading the moment. Some communities want facts and figures. Others want to know who’s behind the project and what kind of neighbors they’ll be.</p><p>The best campaigns adapt. They meet people where they are—in coffee shops, at ballfields, or through local voices they already trust.</p>',
  true,
  '2025-12-05T18:49:49Z'
),
(
  'Which LLMs Can Actually Code Genetic Algorithms That Work?',
  'which-llms-can-actually-code-genetic-algorithms-that-work',
  'A practical test using Snake to separate working algorithm design from confident-sounding code.',
  'https://donofr.io/wp-content/uploads/2025/12/results-1024x597.jpg',
  'Ryan D’Onofrio',
  '<p>I won’t bury the lede. Here’s the cool part.</p><img src="https://donofr.io/wp-content/uploads/2025/12/results-1024x597.jpg" alt="LLM coding results" /><p>I was recently building a Minesweeper deep learning system and hit a wall. I turned to GPT-5 and got hundreds of lines of sophisticated-looking nonsense.</p><p>I wanted to know which models can truly design algorithmic systems that work, not just generate confident-sounding code. So I used the classic Snake game as a test.</p><p><a href="https://ryan.donofr.io/blog/llm-genetic-algorithms">Read the full story here</a>.</p>',
  true,
  '2025-12-05T18:43:18Z'
)
on conflict (slug) do nothing;
