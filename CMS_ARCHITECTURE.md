# CMS Architecture & Blueprint: Nagu Dental

This document details the content model, schema structures, relationships, and the future frontend integration strategy for connecting the Nagu Dental website to Sanity CMS.

---

## 1. CMS Folder Structure

The schemas in the Sanity Studio are structured as follows:

```text
studio-nagu-dental-cms/schemaTypes/
├── documents/
│   ├── faq.ts            # Reusable FAQ Q&A database
│   ├── testimonial.ts    # Reusable testimonial/review database
│   ├── treatment.ts      # Reusable dental treatments collection
│   ├── siteSettings.ts   # Global settings singleton (header, footer, phone, etc.)
│   ├── homePage.ts       # Homepage content singleton
│   ├── aboutPage.ts      # About page content singleton
│   └── contactPage.ts    # Contact page content singleton
├── objects/
│   ├── cta.ts            # Reusable button link setup (label, URL)
│   ├── hero.ts           # Reusable hero banner layout (heading, text, images, cta)
│   ├── seo.ts            # Reusable SEO metadata (metaTitle, metaDescription, shareImage)
│   ├── statCard.ts       # Reusable quick facts stat structure (value, label, image)
│   └── awardCard.ts      # Reusable award/badge layout (title, organization, year)
└── index.ts              # Primary schema registry
```

---

## 2. Content Model & Schema Definitions

### A. Document Schemas (Collections)

#### 1. Treatment (`treatment`)
* **Type**: Document
* **Purpose**: Represents each of the specialized treatment detail pages (e.g. Dental Implants, Teeth Cleaning).
* **Fields**:
  * `title` (string): Treatment name.
  * `slug` (slug): Auto-generated from title (matches page filenames e.g. `dental-implants`).
  * `heroTitle` (string): Custom title for page banner.
  * `heroImage` (image): Header background.
  * `description` (text): Full descriptive write-up.
  * `faqs` (array of references to `faq`): Specific FAQ questions matching this treatment.

#### 2. Testimonial (`testimonial`)
* **Type**: Document
* **Purpose**: Stores patient reviews for the homepage marquee list.
* **Fields**:
  * `author` (string): Reviewer name.
  * `role` (string): E.g., Patient.
  * `quote` (text): Testimonial text.
  * `rating` (number): Star rating (1-5).
  * `avatar` (image): Reviewer image.
  * `signature` (string): Cursive text for signature.

#### 3. FAQ (`faq`)
* **Type**: Document
* **Purpose**: General Q&A items used across treatments and the general treatments page.
* **Fields**:
  * `question` (string): The FAQ query.
  * `answer` (text): The detailed response.

---

### B. Singleton Documents (Single-instance Pages)

#### 1. Global Settings (`siteSettings`)
* **Type**: Singleton Document
* **Purpose**: Holds layout elements that appear on every page (Header, Navigation, Footer, Contact info).
* **Fields**:
  * `logoDark` (image): Logo for light backgrounds.
  * `logoLight` (image): Logo for dark backgrounds.
  * `phone` (string): Master clinic number.
  * `email` (string): Master clinic email.
  * `address` (text): Clinic location address.
  * `workingHours` (array of objects): Open hours schedule.
  * `socialLinks` (array of objects): Social profile URLs.
  * `seo` (object: `seo`): Fallback SEO configurations.

#### 2. Home Page (`homePage`)
* **Type**: Singleton Document
* **Purpose**: Editable content blocks for the main homepage sections.
* **Fields**:
  * `hero` (object: `hero`): Background images carousel, heading, description, and CTA.
  * `aboutSection` (object): Heading, text paragraph, features checklist, doctor card, and right main image.
  * `tourSection` (object): Tour text and 360-degree panorama image.
  * `seo` (object: `seo`): Home page SEO overrides.

#### 3. About Page (`aboutPage`)
* **Type**: Singleton Document
* **Purpose**: Content for `about.html`.
* **Fields**:
  * `hero` (object: `hero`): About hero image and main tagline.
  * `storySection` (object): Text story, section headers, and inline image gallery.
  * `successMetrics` (array of `statCard`): Statistical cards ("38+ Google Reviews", etc.).
  * `awardsSection` (object): Awards header and list of `awardCard` items.
  * `seo` (object: `seo`): About page SEO overrides.

#### 4. Contact Page (`contactPage`)
* **Type**: Singleton Document
* **Purpose**: Content for `contact.html`.
* **Fields**:
  * `hero` (object: `hero`): Contact header.
  * `contactDetailsSection` (object): Address, email, phone, and hours description overrides.
  * `mapSection` (object): Embed maps URL configuration.
  * `seo` (object: `seo`): Contact page SEO overrides.

---

## 3. Future Frontend Integration Plan

Since the Nagu Dental website is built with static HTML and vanilla JavaScript, we will fetch content asynchronously on page load and dynamically inject it into the DOM.

### Step 1: Set Up Allowed CORS Origins
Before requesting data, you must add your development and staging URLs to the allowed CORS list:
1. Go to the [Sanity Manage Console](https://www.sanity.io/manage).
2. Select your project: `exi81qhl`.
3. Go to **Settings > API settings > CORS Origins**.
4. Click **Add CORS Origin** and enter `http://localhost:5500` (or your local dev server port) and your production URL. Check the "Allow credentials" box.

### Step 2: Add the CDN Script in HTML
Include the UMD version of `@sanity/client` at the bottom of your HTML pages:
```html
<!-- Sanity Client CDN -->
<script src="https://cdn.jsdelivr.net/npm/@sanity/client@6.1.3/dist/index.umd.min.js"></script>
```

### Step 3: Initialize Sanity Client
Create a shared JavaScript file (e.g. `assets/js/sanity-client.js`):
```javascript
const client = window.SanityClient.createClient({
  projectId: 'exi81qhl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true, // Speeds up loading by caching responses on edge servers
});
```

---

## 4. Frontend Selector & Field Mapping

Here is the exact selector-to-field map you should implement in your JavaScript:

### Global Header & Footer (Loaded on all pages)
| Content Element | Sanity Field | DOM Selector | Populate Action |
| :--- | :--- | :--- | :--- |
| Header Logo | `siteSettings.logoDark` | `.logo_image` | `element.src = url` |
| Contact Phone | `siteSettings.phone` | `a[href^="tel:"]` | `element.innerText = phone; element.href = 'tel:' + phone` |
| Contact Email | `siteSettings.email` | `a[href^="mailto:"]` | `element.innerText = email; element.href = 'mailto:' + email` |
| Office Hours | `siteSettings.workingHours` | `.our-info_item (Hours card)` | Loops and sets paragraphs |
| Footer Copy | `siteSettings.seo.metaTitle` | `.footer_copyright` | `element.innerHTML = '© ' + new Date().getFullYear() + ' ' + title` |

### Home Page (`index.html`)
```javascript
// Query Home Page content
const homeQuery = `*[_type == "homePage"][0]{
  hero {
    heading,
    paragraph,
    cta { label, url },
    backgroundImages[] { asset->{url} }
  },
  aboutSection {
    tag, title, description,
    features[] { title, description },
    doctorCta { doctorName, doctorTitle, doctorImage { asset->{url} }, ctaLabel },
    rightImage { asset->{url} }
  }
}`;
```

| Content Element | Sanity Field | DOM Selector | Populate Action |
| :--- | :--- | :--- | :--- |
| Hero Heading | `hero.heading` | `.hero-text-split` | `element.innerText = heading` |
| Hero Subtext | `hero.paragraph` | `.home-hero_para` | `element.innerText = paragraph` |
| Hero Slider Image 1 | `hero.backgroundImages[0]` | `.home-hero_image.is-active` | `element.src = image` |
| About Heading | `aboutSection.title` | `.story-title` | `element.innerHTML = title` (e.g. Discover `<span class="text-highlighted">Nagu</span>`) |
| About Description | `aboutSection.description` | `.story-description` | `element.innerText = description` |
| About Feature 1 | `aboutSection.features[0]` | `.story-feature-item:nth-child(1)` | Sets child heading & description text |
| Doctor Avatar | `aboutSection.doctorCta.doctorImage` | `.story-cta-doctor-img` | `element.src = doctorImage` |
| Doctor Name | `aboutSection.doctorCta.doctorName` | `.story-cta-doctor-name` | `element.innerText = name` |

### Testimonials Slider (Marquee on Homepage)
Query:
```javascript
const testiQuery = `*[_type == "testimonial"]{ author, role, quote, rating, avatar { asset->{url} }, signature }`;
```
For the marquee, you will dynamically construct the testimonial cards and append them to the slider container:
```javascript
client.fetch(testiQuery).then(testimonials => {
  const container = document.querySelector('.testimonials-marquee-group');
  container.innerHTML = testimonials.map(t => `
    <div class="testimonials-card">
      <div class="testimonials-card-top">
        <img class="testi-avatar" src="${t.avatar ? t.avatar.asset.url : 'assets/img/default-avatar.png'}" alt="${t.author}">
        <div class="testi-quote-badge">
            <svg viewBox="0 0 24 24"><path d="M11.192 15.757c0-.754-.025-1.43-.075-2.028a3.713 3.713 0 0 1-.057-.583c0-2.527 2.078-4.57 4.617-4.57.773 0 1.5.19 2.137.525a4.34 4.34 0 0 1 1.737 1.637 4.67 4.67 0 0 1 .599 2.271 4.62 4.62 0 0 1-1.348 3.238 4.63 4.63 0 0 1-3.237 1.348c-.61 0-1.229-.126-1.854-.378a4.49 4.49 0 0 1-1.633-1.074 4.42 4.42 0 0 1-.987-1.488ZM2 15.757c0-.754-.025-1.43-.075-2.028a3.713 3.713 0 0 1-.057-.583C1.868 10.619 3.946 8.576 6.485 8.576c.773 0 1.5.19 2.137.525a4.34 4.34 0 0 1 1.737 1.637 4.67 4.67 0 0 1 .599 2.271 4.62 4.62 0 0 1-1.348 3.238 4.63 4.63 0 0 1-3.237 1.348c-.61 0-1.229-.126-1.854-.378A4.49 4.49 0 0 1 2.89 16.14 4.42 4.42 0 0 1 1.903 14.652Z"/></svg>
        </div>
      </div>
      <div class="testimonials-card-middle">
        <div class="testi-rating-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
        <p class="testimonials-desc-text">"${t.quote}"</p>
      </div>
      <div class="testimonials-card-bottom">
        <div class="testi-signature">${t.signature || t.author}</div>
        <div class="testi-role">${t.role}</div>
      </div>
    </div>
  `).join('');
});
```

---

## 5. Notes and Best Practices for Editors

1. **Singleton Navigation**: Homepage, About, Contact, and Global Settings singletons appear with custom icons and can only be updated, preventing multiple home pages or settings pages from being created.
2. **Dynamic Slugs**: Testimonials are loaded dynamically using client query filters. If you delete or add a new testimonial, it automatically adds/removes it from the marquee.
3. **CORS Checklist**: Always ensure that when you launch a new staging or production subdomain, you add it to the Sanity Manage dashboard, or your fetch queries will be blocked by modern web browsers.
