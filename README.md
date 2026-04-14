
# DONOFR.IO GitHub Pages starter

This is a static rebuild of the current WordPress site, set up so it can live on GitHub Pages and use Supabase for blog posts.

## Files

- `index.html` — homepage
- `thoughts.html` — blog listing page
- `post.html` — individual blog post page
- `admin.html` — lightweight browser-based blog editor
- `styles.css` — site styles
- `app.js` — blog and admin logic
- `config.js` — add your Supabase keys here
- `supabase.sql` — schema, row-level security policies, and seed posts

## What this keeps

- Existing structure and messaging from the current site
- Existing public image and video URLs from `donofr.io`
- A blog workflow that does not need WordPress

## Before you publish

### 1) Add Supabase config
Open `config.js` and replace:

- `YOUR_SUPABASE_URL`
- `YOUR_SUPABASE_ANON_KEY`

### 2) Run the SQL
In Supabase SQL Editor, run `supabase.sql`.

That creates:
- `posts` table
- public read access to published posts
- authenticated write access for `ddonofrio@thecaseygroup.us`

### 3) Enable email auth
In Supabase Auth:
- enable Email / OTP
- add your production URL and local preview URL to redirect settings

Suggested site URL:
- `https://donofr.io`
- and if using the repository subdomain first: `https://YOUR_GITHUB_USERNAME.github.io/donofr.io/`

### 4) Upload to GitHub
Put these files in the root of your `donofr.io` repository.

Then in GitHub:
- Settings
- Pages
- Source: Deploy from branch
- Branch: `main`
- Folder: `/root`

## Notes

This starter uses the public image and video URLs already on the live site. That means it will work fast, but the most complete final version would be to move those media files into the GitHub repo or Supabase Storage later.

## Easy next improvements

- move media off WordPress and into your own storage
- add an edit/delete post view to `admin.html`
- add a contact form backed by Supabase Edge Functions or Formspree
- replace any leftover theme/demo images still coming from old WPZoom URLs
