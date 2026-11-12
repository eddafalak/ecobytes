# EcoBytes

EcoBytes is a mini blog about sustainable technology: green computing, eco-friendly gadgets and
the trends shaping a lower-carbon future. It is built with **Next.js** and uses **Prismic** as a
headless CMS, so the content can be edited without touching the code.

- **Live site:** _add your Vercel URL here_
- **Prismic repository:** _add your repository URL here_ (`https://<repo-name>.prismic.io`)

## Features

| Page | URL | What it shows |
| --- | --- | --- |
| Homepage | `/` | Headline and intro from Prismic, the featured articles (one large, the rest in a grid) |
| Articles | `/articles` | All articles, newest first, each with thumbnail, category, date, title, summary and "Read more" |
| Article | `/articles/<slug>` | The full article: text, images, quotes and embedded videos or social posts, plus "More from EcoBytes" |
| About | `/about` | The mission and why sustainable technology matters, edited in Prismic |

Also: a 404 page, `sitemap.xml`, `robots.txt`, page titles and descriptions for search engines and
social sharing, structured data (`BlogPosting`) on articles, and a "Skip to content" link.

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router, Cache Components) and React 19
- [Prismic](https://prismic.io) with Slice Machine, `@prismicio/client`, `@prismicio/react` and `@prismicio/next`
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript, with types generated from the Prismic models
- Hosting on [Vercel](https://vercel.com)

## Project structure

```
ecobytes/
├── customtypes/              Prismic page types (created with Slice Machine)
│   ├── article/index.json      Article: title, summary, image, date, category, author, featured, body
│   ├── home/index.json         Homepage (single): headline, intro, hero image
│   └── about/index.json        About page (single): title, intro, image, body
├── src/
│   ├── app/                  Pages (Next.js App Router)
│   │   ├── page.tsx            Homepage
│   │   ├── articles/page.tsx   All articles
│   │   ├── articles/[uid]/     One article (static page per article)
│   │   ├── about/page.tsx      About page
│   │   ├── api/revalidate/     Webhook that refreshes the site when content is published
│   │   ├── slice-simulator/    Used by Slice Machine to preview slices
│   │   ├── sitemap.ts, robots.ts, not-found.tsx, layout.tsx, globals.css
│   ├── slices/               Building blocks for article bodies (model.json + React component)
│   │   ├── Text/               Paragraphs, headings and lists
│   │   ├── ImageBlock/         Image with caption
│   │   ├── Embed/              YouTube/Vimeo video or social media post
│   │   └── Quote/              Highlighted quote
│   ├── components/           Header, navigation, footer, article card, rich text styles
│   ├── lib/content.ts        All Prismic queries, cached
│   ├── lib/format.ts         Date helpers
│   └── prismicio.ts          Prismic client and URL routes
├── scripts/seed.mjs          Loads the sample content into Prismic
├── prismicio-types.d.ts      TypeScript types generated from the models
└── slicemachine.config.json  Prismic repository name and slice library
```

## How it works

**Content model.** In Prismic, an *Article* has a title, summary, featured image, publication
date, category, author, a "Featured on the homepage" switch, and a body made of **slices**: Text,
Image, Embed and Quote. Editors build an article by stacking slices in any order. Every page type
also has an *SEO & Metadata* tab for the page title, description and social image.

**Fetching.** All queries live in `src/lib/content.ts`. Each function is marked `"use cache"`, so
its result is stored and reused instead of calling Prismic on every visit.

**Static generation.** `generateStaticParams` in `articles/[uid]/page.tsx` lists every article, so
Next.js builds a static HTML page for each one at build time. The homepage, articles list and
about page are static too. This makes the site fast and easy for search engines to read. An article
published after the build is generated on its first visit and then cached.

**Updating content.** When an editor publishes in Prismic, a webhook calls `/api/revalidate`, which
expires the cached content (the `prismic` cache tag). The next visitor triggers a rebuild of the
affected pages. In development, the cache only lasts a few seconds, so changes show up on reload.

**Responsive and accessible.** Layouts are mobile-first with Tailwind; text colours meet WCAG AA
contrast; there is a skip link, visible keyboard focus, `aria-current` in the navigation, and alt
text comes from each image's alt field in Prismic. Images are served through Prismic's image CDN
in the right size for each screen (`PrismicNextImage`).

## Getting started

Requirements: Node.js 20 or newer and a free [Prismic](https://prismic.io) account.

1. **Install**

   ```bash
   npm install
   ```

2. **Create a Prismic repository** at [prismic.io/dashboard](https://prismic.io/dashboard) (   Next.js, "start from scratch"). Put its name in `slicemachine.config.json` as `repositoryName`.

3. **Push the content model to Prismic.** Start Slice Machine, log in when asked, and press
   **Push** in the top-right corner. This creates the Article, Homepage and About page types and
   the four slices in your repository.

   ```bash
   npm run slicemachine
   ```

   Slice Machine runs at http://localhost:9999.

4. **Environment variables.** Copy `.env.example` to `.env.local` and fill in what you need (see
   the comments in the file).

5. **Add the sample content** (optional). Create a write token in Prismic (Settings → API &
   Security → Write APIs), add it to `.env.local` as `PRISMIC_WRITE_TOKEN`, then:

   ```bash
   npm run seed
   ```

   This creates the homepage, the about page and three articles in a *Migration release*. Open it
   in Prismic, add the images (see below) and publish.

6. **Run the site**

   ```bash
   npm run dev
   ```

   Open http://localhost:3000.

### Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the site in development mode |
| `npm run build` / `npm start` | Build and run the production version |
| `npm run slicemachine` | Start Slice Machine to edit the content model |
| `npm run seed` | Load the sample content into Prismic |
| `npm run types` | Regenerate `prismicio-types.d.ts` from the models |
| `npm run lint` / `npm run typecheck` | Check the code |

## Adding a new article in Prismic

1. Log in to Prismic and open the EcoBytes repository.
2. Click **Create new** (the pencil icon) and choose **Article**.
3. Fill in the fields on the **Main** tab:
   - **URL slug**: the web address of the article, e.g. `solar-powered-laptops` gives
     `/articles/solar-powered-laptops`. Lowercase, words separated by hyphens.
   - **Title** and **Summary**: the summary appears on the cards and in search results.
   - **Featured image**: click the field and upload a picture, or search Unsplash from the media
     library. Always fill in the **alt text** (a short description for screen readers).
   - **Publication date**, **Category** and **Author**.
   - **Featured on the homepage**: switch on to show the article on the homepage.
4. Build the body with slices: click **Add slice** and pick:
   - **Text** for paragraphs, headings (H2/H3), lists and links
   - **Image** for a picture with a caption
   - **Embed** and paste a YouTube, Vimeo, X or Instagram link
   - **Quote** for a highlighted quote
5. Optionally fill in the **SEO & Metadata** tab (title, description and image for search engines
   and social media). If left empty, the title, summary and featured image are used.
6. Click **Save**, then **Publish**. The article appears on the site within a few seconds (or after
   the next visit, once the webhook is set up).

To edit the homepage headline or the About page, open the **Homepage** or **About page** document,
make the changes and publish.

## Deployment (Vercel)

1. Push the project to GitHub.
2. In [Vercel](https://vercel.com), click **Add New → Project** and import the repository. The
   default Next.js settings work as they are.
3. Add the environment variables `NEXT_PUBLIC_SITE_URL` (the site's address) and
   `PRISMIC_WEBHOOK_SECRET` (any long random string) under Settings → Environment Variables, then
   deploy.
4. In Prismic, go to **Settings → Webhooks** and add a webhook with the URL
   `https://<your-site>/api/revalidate` and the same secret. Now publishing in Prismic updates the
   live site.

## Development process

- **Day 1: setup and layout.** Created the Next.js project with TypeScript and Tailwind, installed
  the Prismic packages and Slice Machine, and built the layout: header, navigation, footer and
  article card.
- **Day 2: content model, content and styling.** Defined the Article, Homepage and About page
  types and the Text, Image, Embed and Quote slices; generated TypeScript types from them; built the
  pages and the cached data layer; wrote three sample articles and the seed script; styled the site
  with a calm green palette.
- **Day 3: testing and optimisation.** Checked the pages on mobile, tablet and desktop; checked
  keyboard navigation and colour contrast; added metadata, sitemap, robots.txt and structured data;
  set up static generation and on-demand revalidation; deployed to Vercel.

## Possible next steps

- Prismic previews, so editors can see drafts on the site before publishing
- Filter articles by category
- Search
- Pagination once there are many articles
