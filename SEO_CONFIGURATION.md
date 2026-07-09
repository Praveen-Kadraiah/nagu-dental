# SEO Configuration (Robots & Sitemap) in Sanity CMS

This documentation details the newly created SEO configuration schemas inside the Sanity CMS. These schemas allow content managers to configure SEO rules directly from the CMS without needing to edit source code or deploy updates.

---

## 1. Why These Schemas Were Created

Previously, the website's SEO settings for search engine crawlers were defined in static, hardcoded files at the root of the project:
*   `robots.txt`
*   `sitemap.xml`

While these files are functional, modifying them requires developer intervention, a code commit, and a website redeployment. 

By defining **Robots Settings** and **Sitemap Settings** as **singleton schemas** within Sanity CMS, we provide:
1.  **Non-technical control**: Content teams can modify indexing parameters, change crawls rates, exclude paths, or declare new custom paths directly from the CMS.
2.  **Centralization**: All content and SEO configurations are kept in one unified database (Sanity).
3.  **Future Scalability**: If the site moves to a dynamic framework (like Next.js, SvelteKit, Astro, or Remix), these settings are ready to be fetched at build-time or run-time to generate dynamic SEO endpoints.

---

## 2. Relationships to Existing Files

> [!WARNING]
> The current static files (`robots.txt` and `sitemap.xml`) at the workspace root **remain unchanged**. Creating or updating the Sanity documents will **not** modify or overwrite these files. The CMS configurations serve as the *future schema representation* and are ready to be integrated dynamically when needed.

| CMS Document / Field | Description | Corresponding Static File Location / Line |
| :--- | :--- | :--- |
| **Robots Settings** | Control crawler directives | Maps to `robots.txt` |
| `enableIndexing` | `true` instructs indexing; `false` blocks indexation | `User-agent: *` block |
| `allowCrawling` | `true` allows crawlers to read the site | `Allow: /` |
| `allowRules` | Paths explicitly allowed to crawl | `Allow: <path>` |
| `disallowRules` | Paths forbidden to crawl | `Disallow: <path>` |
| `sitemapUrls` | Additional sitemaps to declare | `Sitemap: <url>` |
| `customDirectives` | Append raw text directives | Appended at end of file (e.g., `Crawl-delay`) |
| **Sitemap Settings** | Configure the XML sitemap pages | Maps to `sitemap.xml` |
| `baseUrl` | Production URL prefix for site URLs | Root prefix in `<loc>` values |
| `defaultChangefreq` | Default value for page refresh rate | `<changefreq>` tags |
| `defaultPriority` | Default importance level (0.0 to 1.0) | `<priority>` tags |
| `includeHomepage` | Include `/` | `<url>` node for `/` |
| `includeAboutPage` | Include `/about.html` | `<url>` node for `/about.html` |
| `includeTreatments` | Include `/treatments.html` and dynamic items | `<url>` node for `/treatments.html` |
| `includeContactPage` | Include `/contact.html` | `<url>` node for `/contact.html` |
| `customUrls` | Manually specify paths with custom settings | Additional custom `<url>` entries |
| `excludedUrls` | Array of paths to filter out of the XML sitemap | Prevents creation of `<url>` entry for path |

---

## 3. Schema Fields Breakdown

### 🤖 Robots Settings (`robotsSettings`)
*   **Enable Indexing** (`enableIndexing` - boolean): A high-level switch. If disabled, can be used to generate a `Disallow: /` or `X-Robots-Tag: noindex` rule.
*   **Allow Crawling** (`allowCrawling` - boolean): Controls the default catch-all rule (`Allow: /` or `Disallow: /`).
*   **Allow Rules** (`allowRules` - array of strings): Specify paths that crawlers should scan, even if parent paths are disallowed (e.g., `/assets/`).
*   **Disallow Rules** (`disallowRules` - array of strings): Specify directories crawlers must ignore (e.g., `/admin/`, `/temp/`).
*   **Additional Sitemap URLs** (`sitemapUrls` - array of URLs): Full paths to external or supplementary sitemaps.
*   **Custom Robots Directives** (`customDirectives` - text): Text box to write user-agent specific blocks or other custom attributes.

### 🗺️ Sitemap Settings (`sitemapSettings`)
*   **Website Base URL** (`baseUrl` - URL): The production origin (e.g., `https://nagudental.in`).
*   **Default Change Frequency** (`defaultChangefreq` - string choice): Select from `always`, `hourly`, `daily`, `weekly`, `monthly`, `yearly`, `never`.
*   **Default Priority** (`defaultPriority` - number): Default rating (between `0.0` and `1.0`) for pages without explicit priority overrides.
*   **Core Toggles** (boolean): Easy-to-manage toggles to turn on/off standard pages in the sitemap output:
    *   *Include Homepage*
    *   *Include About Page*
    *   *Include Treatments*
    *   *Include Contact Page*
*   **Additional Custom URLs** (`customUrls` - array of objects): Each entry lets you specify:
    *   *Path* (e.g., `/teeth-cleaning.html`)
    *   *Change Frequency Override* (optional)
    *   *Priority Override* (optional)
*   **Excluded URLs** (`excludedUrls` - array of strings): Paths to prevent from being listed in the sitemap.

---

## 4. Scalability: Supporting Future Pages

The `sitemapSettings` schema was designed to scale gracefully. To add support for new static or dynamic content pages in the future, follow these patterns:

### Option A: Adding a new core boolean toggle
If a new main page is created (e.g., `/team.html` or `/gallery.html`), open `sitemap.ts` and add a new boolean field under the `pages` group:
```typescript
defineField({
  name: 'includeTeamPage',
  title: 'Include Team Page',
  type: 'boolean',
  group: 'pages',
  initialValue: true,
})
```

### Option B: Using the `customUrls` array
If you don't want to modify the schema for every single page addition, you can add it directly in Sanity Studio by adding an item to the **Include Additional Custom URLs** list. Specify the path (e.g., `/reviews`), change frequency, and priority.

### Option C: Dynamic Generation (Recommendation)
If you integrate a framework, write a handler that queries Sanity:
1. Fetch all documents of type `treatment` where the `slug` is defined.
2. If `includeTreatments` is enabled in `sitemapSettings`, dynamically generate sitemap URLs for each treatment (e.g., `${baseUrl}/treatments/${treatment.slug.current}`).

---

## 5. Future Integration Roadmap

Here is how you can fetch these settings dynamically using Sanity GROQ queries when building your website:

### GROQ Query for Robots
```groq
*[_type == "robotsSettings"][0] {
  enableIndexing,
  allowCrawling,
  allowRules,
  disallowRules,
  sitemapUrls,
  customDirectives
}
```

### GROQ Query for Sitemap
```groq
*[_type == "sitemapSettings"][0] {
  baseUrl,
  defaultChangefreq,
  defaultPriority,
  includeHomepage,
  includeAboutPage,
  includeTreatments,
  includeContactPage,
  customUrls,
  excludedUrls
}
```

### Example dynamic Express/Next.js/Astro Endpoint implementation:
1.  Set up a route handler at `/robots.txt` or `/sitemap.xml`.
2.  Query Sanity.
3.  Format the response into standard plain text or XML structure.
4.  Serve the response with the correct `Content-Type` header:
    *   `text/plain` for robots.txt
    *   `application/xml` or `text/xml` for sitemap.xml
