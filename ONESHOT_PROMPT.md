# ONE-SHOT PROMPT — NAGU Dental Website (Complete Reproduction Spec)

> **HOW TO USE THIS FILE**
> This is a fully self-contained reproduction prompt for the NAGU by Dr. Gowri dental website.
> Copy this entire document into any capable coding agent (Claude, Gemini, Cursor, Windsurf, etc.).
> Fill in Section 0 with your own brand details. The agent will produce a complete, SEO-ready,
> animated, multi-page static dental website identical in structure and quality to this one.
>
> This prompt is exhaustive. It covers the full design system, every page, every component, all
> SEO meta, the JSON-LD schema, legal pages, animations, and deployment steps. Nothing is left
> to guesswork.

---

## 0. PLACEHOLDERS — Edit These Once, Touch Nothing Else

```
[BUSINESS_NAME]    = "NAGU by Dr. Gowri"
[SHORT_NAME]       = "NAGU"
[TAGLINE]          = "Modern, Gentle Dentistry"
[DOCTOR_NAME]      = "Dr. Gowri"
[PHONE_DISPLAY]    = "+91 99451 79026"
[PHONE_TEL]        = "+919945179026"
[WHATSAPP_NUMBER]  = "919945179026"
[EMAIL]            = "info@nagudental.in"
[CITY]             = "Bengaluru"
[ADDRESS]          = "17, 80 Feet Ring Road, Next to Bank of Baroda, KHB Colony, Basaveshwar Nagar, Bengaluru 560079"
[MAPS_URL]         = "https://maps.app.goo.gl/xQcUcdyBpCfMst6D9"
[DOMAIN]           = "https://nagudental.in"
[ACCENT]           = "#3f8f98"
[ACCENT_DARK]      = "#0d565e"
[INK_DARK]         = "#002124"
[GEO_LAT]          = 13.00716
[GEO_LNG]          = 77.52897
[LOGO_DARK_SVG]    = "assets/img/Janani-logo-dark.svg"
[LOGO_LIGHT_SVG]   = "assets/img/Janani-logo.svg"
[FAVICON]          = "assets/img/favicon.svg"
[WEBCLIP]          = "assets/img/webclip.png"
[CSS_FILE]         = "assets/css/nagu.css"
[HOURS_WEEKDAY]    = "Mon - Sat: 8:30 AM - 8:30 PM"
[HOURS_SUNDAY]     = "Sunday: Closed"
```

---

## 0.5 ABSOLUTE RULES (breaking any one = failure)

1. PLAIN STATIC STACK ONLY. Multi-page .html + one nagu.css + vanilla JS + GSAP (loaded locally).
   FORBIDDEN: React, Vue, Next, Tailwind, Vite, webpack, any framework or build step.
   The site must open by double-clicking index.html with no server required for local preview.

2. NOTHING IS EVER INVISIBLE BY DEFAULT. Never put opacity:0 in HTML attributes.
   Scroll-reveals are progressive enhancement added only in JS. Everything must render with JS OFF.

3. NO BROKEN IMAGES. Every img must have a real src. Every page includes an image guard script
   that swaps failed images to an on-brand SVG gradient placeholder.

4. ANIMATIONS MUST ACTUALLY BE PRESENT. GSAP scroll-reveal (fade + slide-up) on every section.
   Hover effects on all buttons, cards, and nav links.

5. ONE H1 PER PAGE. Verify with document.querySelectorAll('h1').length === 1 on every page.

6. SEO COMPLETE. Every page: title, meta description, OG tags, og:url, canonical, Twitter card.
   index.html also needs the Dentist JSON-LD schema block.

7. NO BUILDER FINGERPRINTS. Zero Webflow/Framer/builder meta tags in the final output.

---

## 1. PROJECT MISSION & DESIGN PRINCIPLES

Build a website that reads as a real, original, premium dental practice - never as a template.
Emotional target: calm, clean, trustworthy, modern, warm. Think Apple-grade restraint meets a
boutique health brand.

Hard principles:
- Self-contained. All assets (CSS, JS, images, icons) are local under assets/.
- No build step. Runs from python3 -m http.server and deploys to Vercel/GitHub Pages directly.
- Nothing is invisible. Animations reveal content; every element ends visible regardless.
- No blur in reveals. Fade + slide only. Blur filters leave images blurry if triggers misfire.
- Accessibility. Alt text on every image, one H1 per page, visible focus states, aria-labels.
- Conversion-first. Every page funnels to the WhatsApp booking CTA.
- Premium feel. Generous whitespace, soft shadows, rounded cards (18-24px), smooth easing.

---

## 2. FILE TREE

```
/
|-- index.html                  # Home
|-- about.html                  # About Us + Team
|-- treatments.html             # All Treatments overview
|-- contact.html                # Contact + Map + Appointment form
|-- teeth-cleaning.html         # Service: Preventive & General Care
|-- teeth-whitening.html        # Service: Cosmetic Dentistry
|-- orthodontics.html           # Service: Orthodontics & Specialised
|-- dental-implants.html        # Service: Dental Implants
|-- emergency-care.html         # Service: Emergency Care
|-- fillings-restorations.html  # Service: Fillings & Restorations
|-- privacy.html                # Privacy Policy
|-- terms.html                  # Terms & Conditions
|-- cookies.html                # Cookie Policy
|-- licenses.html               # Licenses
|-- 404.html                    # Not Found (noindex)
|-- robots.txt                  # SEO crawler instructions
|-- sitemap.xml                 # All public pages listed with priorities
|-- .nojekyll                   # Empty file -- disables Jekyll on GitHub Pages
|-- assets/
|   |-- css/
|   |   `-- nagu.css            # Entire design system + all component styles
|   |-- js/
|   |   |-- gsap.min.js
|   |   |-- ScrollTrigger.min.js
|   |   |-- SplitText.min.js
|   |   `-- jquery-3.5.1.min.js
|   `-- img/
|       |-- Janani-logo-dark.svg
|       |-- Janani-logo.svg
|       |-- favicon.svg
|       |-- webclip.png
|       |-- hero background 1.png
|       |-- hero background 2.png
|       |-- cta doctor.png
|       |-- our service doctor.png
|       |-- nagu 360.png
|       |-- door.jpg, equipment.jpg, treating.jpg, outsite look.jpg, office table.jpg
|       |-- about receptionist.jpg
|       |-- doctor-karthik.jpg, doctor-nidhi.jpg, doctor-sunil.jpg
|       |-- gen_hero-2.jpg, gen_hero-3.jpg, gen_hero-4.jpg
|       |-- gen_about-hero-image.jpg
|       |-- gen_dentist-examining-patients-teeth-close-up_1.jpg
|       |-- gen_our-story-image-1.jpg through gen_our-story-image-5.jpg
|       |-- gen_service-thumbnail-image.jpg through gen_service-thumbnail-image-4.jpg
|       |-- gen_team-bg.jpg, gen_team-image-1.jpg through gen_team-image-6.jpg
|       |-- gen_testimonial-author-1.jpg through gen_testimonial-author-3.jpg
|       |-- gen_home-value-image.jpg
|       `-- testimonal-image-1.png through testimonal-image-5.png
```

---

## 3. TECH STACK & GLOBAL HEAD

Fonts: Sora (Google Fonts), weights 300/400/500/600/700, plus Caveat 400/700.
Loaded via WebFont.load() for reliability (not a bare link tag).

Every page head must contain:

  <meta charset="utf-8"/>
  <title>[PAGE TITLE] | [BUSINESS_NAME]</title>
  <meta name="description" content="[PAGE DESCRIPTION]"/>
  <meta property="og:title" content="[PAGE TITLE] | [BUSINESS_NAME]"/>
  <meta property="og:description" content="[PAGE DESCRIPTION]"/>
  <meta property="og:type" content="website"/>
  <meta property="og:url" content="[DOMAIN]/[page].html"/>
  <meta property="og:image" content="[OG image path]"/>
  <meta name="twitter:card" content="summary_large_image"/>
  <meta name="twitter:title" content="[PAGE TITLE] | [BUSINESS_NAME]"/>
  <meta name="twitter:description" content="[PAGE DESCRIPTION]"/>
  <meta name="twitter:image" content="[OG image path]"/>
  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <link rel="canonical" href="[DOMAIN]/[page].html"/>
  <link href="assets/css/nagu.css?v=[build-hash]" rel="stylesheet" type="text/css"/>
  <link href="[FAVICON]" rel="shortcut icon" type="image/x-icon"/>
  <link href="[WEBCLIP]" rel="apple-touch-icon"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link href="https://fonts.gstatic.com" rel="preconnect"/>
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
  <script>WebFont.load({ google: { families: ["Sora:300,400,500,600,700","Caveat:400,700"] }});</script>
  <script src="assets/js/gsap.min.js"></script>
  <script src="assets/js/ScrollTrigger.min.js"></script>

index.html ONLY - add this Dentist JSON-LD block in the head:

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Dentist",
    "name": "[BUSINESS_NAME]",
    "url": "[DOMAIN]",
    "telephone": "[PHONE_TEL]",
    "image": "[DOMAIN]/assets/img/hero background 1.png",
    "description": "[META DESCRIPTION]",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "[STREET ADDRESS]",
      "addressLocality": "[CITY]",
      "addressRegion": "Karnataka",
      "postalCode": "560079",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": [GEO_LAT],
      "longitude": [GEO_LNG]
    },
    "openingHoursSpecification": [{
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "08:30",
      "closes": "20:30"
    }],
    "priceRange": "Rs.Rs.",
    "hasMap": "[MAPS_URL]",
    "sameAs": ["https://wa.me/[WHATSAPP_NUMBER]"]
  }
  </script>

---

## 4. DESIGN SYSTEM (Brand Tokens)

Colors:
  --color-accent:        #3f8f98   (primary teal)
  --color-accent-dark:   #0d565e   (hover teal)
  --color-ink-dark:      #002124   (deep brand dark)
  --color-text-main:     #111111
  --color-text-muted:    #6b7280
  --color-text-secondary:#4b5563
  --color-bg-teal-soft:  #e6f3f6   (appointment section bg)
  --color-bg-neutral-50: #fef5ec   (hours card bg)
  --color-border:        #e5e7eb

Typography:
  Font: Sora (primary), Caveat (accent/handwriting labels)
  H1: 64-80px, weight 700, letter-spacing -2px to -3px
  H2: 48-54px, weight 400-600, letter-spacing -1px
  H3: 24-28px, weight 600
  Body: 15-16px, line-height 1.6
  Label: 13-14px, weight 600, uppercase, letter-spacing 0.5px

Spacing:
  Section padding: 80-120px vertical
  Container max-width: 1200px
  Grid gaps: 32-64px

Radius + Shadows:
  Cards: border-radius 20-24px
  Buttons (pill): border-radius 999px
  Box shadows: 0 4px 20px rgba(0,0,0,0.04) subtle | 0 20px 60px rgba(0,0,0,0.08) elevated

---

## 5. NAVBAR (shared across all pages)

Structure:
  - Logo left: [LOGO_DARK_SVG] -> links to index.html
  - Nav: Home | Treatments (dropdown) | About | Contact
  - Treatments dropdown items:
      Preventive & General Care -> teeth-cleaning.html
      Cosmetic Dentistry -> teeth-whitening.html
      Orthodontics & Specialised -> orthodontics.html
      Dental Implants -> dental-implants.html
      Emergency Care -> emergency-care.html
      Fillings & Restorations -> fillings-restorations.html
  - CTA button: "Book Appointment" -> contact.html
  - Hamburger on mobile
  - Sticky on scroll

Light page navbar colors:
  .navbar_link, .navbar-dropdown_toggle { color: #002124 !important; }
  .navbar_link:hover { color: #3f8f98 !important; box-shadow: inset 0 -2px 0 0 #3f8f98 !important; }
  .navbar_link.w--current { box-shadow: inset 0 -2px 0 0 #002124 !important; }
  .navbar-toggler-bar { background-color: #002124 !important; }

---

## 6. FOOTER (shared across all pages)

Dark footer background #002124:
  - Logo (white version) + tagline
  - Nav columns: Pages | Treatments | Legal
  - Copyright: "2026 [BUSINESS_NAME]. All rights reserved."
  - WhatsApp floating button (fixed bottom-right):
    href="https://wa.me/[WHATSAPP_NUMBER]?text=Hi%20[DOCTOR_NAME]%2C%20I%20would%20like%20to%20book%20an%20appointment."

WhatsApp widget CSS:
  position: fixed; bottom: 28px; right: 28px;
  width: 56px; height: 56px; background: #25d366; border-radius: 50%;
  display: flex; align-items: center; justify-content: center; z-index: 9999;
  box-shadow: 0 4px 20px rgba(37,211,102,0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

---

## 7. IMAGE GUARD (every page, before </body>)

  (function(){
    function ph(label){
      var t=(label||'[BUSINESS_NAME]').replace(/[<>&]/g,'').slice(0,22);
      var svg='<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="720">'
        +'<defs><linearGradient id="lg" x1="0" y1="0" x2="1280" y2="720" gradientUnits="userSpaceOnUse">'
        +'<stop offset="0" stop-color="[ACCENT]"/><stop offset="1" stop-color="[INK_DARK]"/></linearGradient></defs>'
        +'<rect width="1280" height="720" fill="url(#lg)"/>'
        +'<text x="640" y="380" fill="#fff" font-family="Sora,Arial" font-size="40" font-weight="600" text-anchor="middle">'+t+'</text></svg>';
      return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
    }
    function bind(im){
      im.addEventListener('error',function(){ if(im.dataset.fbk)return; im.dataset.fbk='1'; im.src=ph(im.alt); });
      if(im.complete&&im.naturalWidth===0&&!im.dataset.fbk){ im.dataset.fbk='1'; im.src=ph(im.alt); }
    }
    document.querySelectorAll('img').forEach(bind);
  })();

---

## 8. PAGES — FULL SPECIFICATION

### 8.1 index.html — Home

Title: "[BUSINESS_NAME] | [TAGLINE]"

Sections in order:

  1. Navbar

  2. Hero (full-screen, 112vh desktop)
     - Background: image carousel cycling through 4 images (hero background 1.png, gen_hero-2.jpg,
       gen_hero-3.jpg, gen_hero-4.jpg), auto-rotates every 5s with CSS fade transition
     - Dark overlay rgba(0,0,0,0.45) for text contrast
     - H1: "Trusted Dental Care, Close to Home"
     - Subtext: "Modern dentistry for [CITY] families - gentle, precise, and built around you."
     - CTAs: "Book Appointment" (contact.html) + "Our Treatments" (treatments.html)
     - Mobile: background image covers top 72vh with gradient fade to #002124

  3. Our Info Strip (dark teal #002124)
     - 4 stat cards: "500+ Happy Patients", "3 Expert Dentists", "10+ Years Experience",
       "Mon-Sat 8:30AM-8:30PM"
     - Grid with vertical dividers on desktop, stacked list on mobile

  4. Our Story / About Us (2-column)
     - Left: Tag pill "Our Story" + H2 + 2-3 paragraphs + 2 feature highlights + teal CTA banner
     - Right: Clinic/doctor image with hover zoom effect
     - H2: "From a dream to [CITY]'s most trusted smile."

  5. Why Choose Us (4 feature cards in horizontal grid)
     - H2: "Why Patients Choose [SHORT_NAME]"
     - Cards: Gentle Approach | Advanced Technology | Experienced Team | Transparent Pricing
     - Each card: SVG icon + title + description. Hover: background lightens

  6. Our Services (treatment card grid)
     - 6 cards, one per treatment, each with: thumbnail image, category badge, title, description
     - "View All Treatments" CTA -> treatments.html

  7. 360 Degree Clinic Tour (sticky scroll section)
     - GSAP ScrollTrigger pinned section, scrub: true
     - Images cycle through: door -> reception -> equipment -> treatment room -> exterior
     - Overlay text fades per image: "Step Inside", "Modern Equipment", "Expert Care"

  8. Appointment / Booking Section (soft teal bg #e6f3f6)
     - H2: "Ready for Your Best Smile?"
     - Left: contact info cards (phone, WhatsApp, address, hours)
     - Right: WhatsApp appointment form (Name + Phone + Service + Date + Time)

  9. Team Section (dark teal background)
     - H2: "Meet Our Team"
     - Doctor cards: photo + name + specialisation + bio
     - Doctors: Dr. Gowri (Lead), Dr. Karthik, Dr. Nidhi, Dr. Sunil + support staff

  10. Testimonials (slider/carousel)
      - H2: "What Our Patients Say"
      - Testimonial cards: patient photo + quote + name + 5 stars
      - Drag-to-scroll or arrow navigation

  11. Footer

---

### 8.2 about.html — About Us

Title: "About | [BUSINESS_NAME]"

Sections:
  1. Navbar (light variant)
  2. Hero: H1 "We're [SHORT_NAME]. We care about more than just teeth." + subtitle
  3. Philosophy: 2-column text + about hero image
  4. Our Story Timeline: 3-5 milestone items
  5. Team Grid: all doctors + support staff
  6. Awards strip: 4 award badge images
  7. CTA Banner: "Book Your Visit Today" -> contact.html
  8. Footer

---

### 8.3 treatments.html — All Treatments

Title: "Our Services | [BUSINESS_NAME]"

Sections:
  1. Navbar
  2. Hero: H1 "Every Smile Deserves Expert Care" + subtitle
  3. Six treatment sections (one per service), each with:
     - Service thumbnail image, category badge
     - H2: service name
     - 3 bullet points / description
     - "Book This Treatment" CTA -> WhatsApp
  4. CTA Banner: "Book an Appointment" -> contact.html
  5. Footer

---

### 8.4 contact.html — Contact & Appointments

Title: "Contact Us | [BUSINESS_NAME]"

Sections:
  1. Navbar
  2. Hero: H1 "Get in Touch. We're Here for You."
  3. Contact Info (left column):
     - Phone, WhatsApp, Address, Hours
  4. Appointment Form (right column):
     - Fields: Full Name (required), Phone (required, numeric), Service (select),
       Date (next 7 days, no Sundays), Time (Morning/Afternoon/Evening)
     - Submit: builds WhatsApp deeplink and opens wa.me/[WHATSAPP_NUMBER]?text=...
  5. Google Maps embed: [MAPS_EMBED_URL]
     "Open in Google Maps" link: [MAPS_URL]
  6. Footer

---

### 8.5 Service Pages (6 pages, same template)

Files: teeth-cleaning.html, teeth-whitening.html, orthodontics.html,
       dental-implants.html, emergency-care.html, fillings-restorations.html

Template:
  1. Navbar
  2. Hero: H1 = service name + short description
  3. Service Detail:
     - Left: description + bullet benefits + FAQ accordion (3-5 Q&As)
     - Right: sticky service/doctor image
  4. Related Services: links to other 5 pages
  5. CTA Banner: "Book [Service]" -> WhatsApp deeplink
  6. Footer

Page titles and H1s:
  teeth-cleaning.html        -> "Professional Teeth Cleaning & Preventive Care | [BUSINESS_NAME]"
  teeth-whitening.html       -> "Teeth Whitening & Cosmetic Dentistry | [BUSINESS_NAME]"
  orthodontics.html          -> "Orthodontics & Braces | [BUSINESS_NAME]"
  dental-implants.html       -> "Dental Implants | [BUSINESS_NAME]"
  emergency-care.html        -> "Emergency Dental Care | [BUSINESS_NAME]"
  fillings-restorations.html -> "Fillings & Restorations | [BUSINESS_NAME]"

---

### 8.6 Legal Pages

privacy.html   -> Title: "Privacy Policy | [BUSINESS_NAME]"
terms.html     -> Title: "Terms & Conditions | [BUSINESS_NAME]"
cookies.html   -> Title: "Cookie Policy | [BUSINESS_NAME]"
licenses.html  -> Title: "Licenses | [BUSINESS_NAME]"

Each has: canonical URL, viewport meta, favicon, Sora font, light clean layout with H2 sections.

---

### 8.7 404.html — Not Found

  <!DOCTYPE html><html lang="en"><head>
  <meta charset="utf-8"/>
  <title>Page not found | [BUSINESS_NAME]</title>
  <meta name="robots" content="noindex, nofollow"/>
  <link rel="canonical" href="[DOMAIN]/404.html"/>
  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <style>
    body{margin:0;height:100vh;display:flex;flex-direction:column;align-items:center;
      justify-content:center;background:#fafafa;color:[INK_DARK];font-family:Sora,Arial,sans-serif;
      text-align:center;padding:24px}
    h1{font-size:clamp(64px,12vw,140px);margin:0;letter-spacing:-3px}
    p{color:#5d6c7b;font-size:18px;margin:8px 0 28px}
    a{display:inline-flex;align-items:center;gap:8px;background:[INK_DARK];color:#fff;
      text-decoration:none;padding:14px 26px;border-radius:999px;font-weight:500}
  </style>
  </head><body>
  <h1>404</h1><p>We couldn't find that page.</p><a href="index.html">Back to home</a>
  </body></html>

---

## 9. robots.txt

  User-agent: *
  Allow: /

  Sitemap: [DOMAIN]/sitemap.xml

---

## 10. sitemap.xml

  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url><loc>[DOMAIN]/</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>1.0</priority></url>
    <url><loc>[DOMAIN]/about.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
    <url><loc>[DOMAIN]/treatments.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
    <url><loc>[DOMAIN]/contact.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.8</priority></url>
    <url><loc>[DOMAIN]/teeth-cleaning.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>[DOMAIN]/teeth-whitening.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>[DOMAIN]/dental-implants.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>[DOMAIN]/fillings-restorations.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>[DOMAIN]/emergency-care.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>[DOMAIN]/orthodontics.html</loc><lastmod>2026-06-29</lastmod><changefreq>monthly</changefreq><priority>0.7</priority></url>
    <url><loc>[DOMAIN]/privacy.html</loc><lastmod>2026-06-29</lastmod><changefreq>yearly</changefreq><priority>0.3</priority></url>
  </urlset>

---

## 11. ANIMATIONS

GSAP scroll-reveal (add data-reveal attribute to every section, card, and heading):

  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray('[data-reveal]').forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      opacity: 0, y: 30, duration: 0.9, ease: 'power2.out', immediateRender: false,
    });
  });

Safety net - force-show anything that ended hidden:
  document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
      document.querySelectorAll('[style*="opacity: 0"],[style*="opacity:0"]').forEach(function(el){
        el.style.opacity='1'; el.style.transform='none';
      });
    }, 3000);
  });

Hero carousel:
  const imgs = document.querySelectorAll('.hero-carousel-img');
  let idx = 0;
  setInterval(() => {
    imgs[idx].classList.remove('is-active');
    idx = (idx + 1) % imgs.length;
    imgs[idx].classList.add('is-active');
  }, 5000);

---

## 12. APPOINTMENT FORM (WhatsApp submit)

  function handleContactAptSubmit(e) {
    e.preventDefault();
    const name    = document.getElementById('capt_name').value.trim();
    const phone   = document.getElementById('capt_phone').value.trim();
    const service = document.getElementById('capt_service').value;
    const date    = document.getElementById('capt_date').value;
    const time    = document.getElementById('capt_time').value;
    if (!name || !phone || !service || !time) {
      alert('Please fill in all required fields.'); return false;
    }
    const msg = encodeURIComponent(
      'Hi [DOCTOR_NAME], I would like to book an appointment.\n\n'
      + 'Name: ' + name + '\nPhone: ' + phone + '\nService: ' + service
      + '\nDate: ' + (date || 'Flexible') + '\nTime: ' + time
    );
    window.open('https://wa.me/[WHATSAPP_NUMBER]?text=' + msg, '_blank');
    return false;
  }

Date validation (no past dates, no Sundays):
  inp.addEventListener('change', function() {
    if (!inp.value) return;
    var chosen = new Date(inp.value + 'T00:00:00');
    if (chosen.getDay() === 0) {
      alert('Sorry, we are closed on Sundays. Please choose another day.');
      inp.value = '';
    }
  });

---

## 13. SEO CHECKLIST

  [ ] Every page: title, meta description, og:title, og:description, og:image, og:type, og:url, canonical
  [ ] Twitter card tags on every page
  [ ] index.html: Dentist JSON-LD schema present and valid (test at validator.schema.org)
  [ ] robots.txt in root: allows all, points to sitemap
  [ ] sitemap.xml in root: all 11 public pages listed
  [ ] Every img: has descriptive alt text
  [ ] One H1 per page, proper H2/H3 hierarchy below
  [ ] loading="lazy" on all below-fold images
  [ ] loading="eager" on above-fold hero image only
  [ ] 404.html: has meta name="robots" content="noindex, nofollow"
  [ ] .nojekyll file exists (empty) in root

---

## 14. SELF-VERIFICATION SNIPPET

Run in browser DevTools on every page before declaring done:

  // Check H1 count
  console.assert(document.querySelectorAll('h1').length === 1, 'BAD: H1 count != 1');
  // Check for invisible elements
  document.querySelectorAll('*').forEach(el => {
    const s = getComputedStyle(el);
    if (s.opacity === '0' || s.visibility === 'hidden') console.warn('Hidden element:', el);
  });
  // Check for broken images
  document.querySelectorAll('img').forEach(img => {
    if (!img.complete || img.naturalWidth === 0) console.warn('Broken image:', img.src);
  });
  // Check canonical
  const canon = document.querySelector('link[rel="canonical"]');
  console.assert(canon, 'Missing canonical link');
  console.log('Canonical:', canon?.href);

---

## 15. CURRENT PROJECT STATUS (as of 2026-06-29)

Pages:          index.html, about.html, treatments.html, contact.html, 6 service pages,
                privacy.html, terms.html, cookies.html, licenses.html, 404.html -- ALL COMPLETE

Design system:  assets/css/nagu.css -- COMPLETE (252KB, full Webflow-exported + customised)
JS:             gsap.min.js, ScrollTrigger.min.js, SplitText.min.js, jquery-3.5.1.min.js -- LOCAL
Images:         70 assets under assets/img/ including webp, jpg, png, svg -- COMPLETE

SEO:
  Unique title per page                      DONE
  Meta description per page                 DONE
  Open Graph + Twitter card tags            DONE (all pages)
  og:url per page                           DONE
  Canonical URL per page                    DONE
  Dentist JSON-LD schema (index.html)       DONE
  robots.txt                               DONE
  sitemap.xml (11 pages)                   DONE
  favicon.svg + apple-touch-icon           DONE
  loading=lazy on below-fold images         DONE
  WebP images (most assets)               DONE
  404.html (styled, branded, noindex)       DONE
  Privacy Policy page                      DONE
  SSL (via Vercel)                         AUTOMATIC

Pending:
  Domain canonical URLs use placeholder nagudental.in -- UPDATE before go-live
  Large PNG images (hero bg, testimonials) -- CONVERT TO WEBP for performance
  Google PageSpeed audit                   -- TEST AFTER DEPLOYMENT
  Google Search Console sitemap submit     -- AFTER DNS IS LIVE
