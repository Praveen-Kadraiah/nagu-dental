# NAGU by Dr. Gowri — Dental Website

A premium, fully static multi-page dental clinic website. Built with plain HTML, vanilla CSS, and GSAP animations — no frameworks, no build step, deploys anywhere in seconds.

---

## Project Structure

```
/
|-- index.html                  Home page
|-- about.html                  About the clinic and team
|-- treatments.html             All treatments overview
|-- contact.html                Contact form + Google Maps
|-- teeth-cleaning.html         Service page: Preventive Care
|-- teeth-whitening.html        Service page: Cosmetic Dentistry
|-- orthodontics.html           Service page: Orthodontics
|-- dental-implants.html        Service page: Dental Implants
|-- emergency-care.html         Service page: Emergency Care
|-- fillings-restorations.html  Service page: Fillings & Restorations
|-- privacy.html                Privacy Policy
|-- terms.html                  Terms & Conditions
|-- cookies.html                Cookie Policy
|-- licenses.html               Licenses
|-- 404.html                    Custom 404 page
|-- robots.txt                  Crawler instructions
|-- sitemap.xml                 XML sitemap for search engines
|-- .nojekyll                   Disables Jekyll on GitHub Pages
|-- assets/
|   |-- css/nagu.css            Full design system
|   |-- js/                     GSAP, ScrollTrigger, SplitText, jQuery
|   `-- img/                    All images (webp, jpg, png, svg)
```

---

## Running Locally

No install or build step required. You have two options:

### Option A — Python (recommended, zero setup)

If Python is installed:

```bash
# Navigate to the project folder
cd "c:/Users/HP/OneDrive/Desktop/nagu dental"

# Python 3
python -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080
```

Then open http://localhost:8080 in your browser.

### Option B — VS Code Live Server

1. Install the "Live Server" extension in VS Code.
2. Right-click index.html in the explorer.
3. Click "Open with Live Server".

### Option C — Node.js serve (if you have Node)

```bash
npx -y serve .
```

---

## Deploying to Vercel

Vercel is the fastest way to go live. It is free for personal/hobby projects.

### Step 1 — Create a GitHub Repository

1. Go to https://github.com and sign in (create a free account if needed).
2. Click "+" -> "New repository".
3. Name it: nagu-dental (or any name you like).
4. Set it to Private or Public.
5. Click "Create repository".
6. Do NOT initialise with README or .gitignore (the project already has its own files).

### Step 2 — Push the Project to GitHub

Open PowerShell in the project folder:

```powershell
cd "c:\Users\HP\OneDrive\Desktop\nagu dental"

# Initialise git (skip if already done)
git init
git add .
git commit -m "Initial commit"

# Link to your GitHub repo (replace YOUR_USERNAME and YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 3 — Deploy on Vercel

1. Go to https://vercel.com and sign in with your GitHub account.
2. Click "Add New..." -> "Project".
3. Find your nagu-dental repository and click "Import".
4. Vercel auto-detects it is a static site. Leave all settings as default.
5. Click "Deploy".
6. In about 30 seconds your site will be live at:
   https://nagu-dental.vercel.app (or similar auto-generated URL).

That's it! Every time you push a new commit to GitHub, Vercel redeploys automatically.

---

## Setting Up a Custom Domain (e.g. nagudental.in)

### Step 1 — Add Domain in Vercel

1. Go to your project dashboard at https://vercel.com.
2. Click "Settings" -> "Domains".
3. Type your domain: nagudental.in (and optionally www.nagudental.in).
4. Click "Add".
5. Vercel will show you DNS records to configure.

### Step 2 — Configure DNS at Your Domain Registrar

Log in to wherever you bought the domain (GoDaddy, Namecheap, Google Domains, Hostinger, etc.).
Go to DNS Settings / DNS Management for your domain.

Add these records exactly as Vercel shows them (they may vary slightly — always follow Vercel's instructions):

For the root domain (nagudental.in):

  TYPE    NAME    VALUE
  A       @       76.76.21.21

For the www subdomain:

  TYPE    NAME    VALUE
  CNAME   www     cname.vercel-dns.com

> Note: Vercel's actual IP and CNAME values are shown on your Vercel Domains settings page.
> Always copy from there — the values above may change. Vercel sometimes shows an ALIAS/ANAME
> record for the root domain instead of an A record, depending on your registrar.

### Step 3 — Wait for DNS Propagation

DNS changes can take anywhere from 5 minutes to 48 hours to propagate worldwide.
You can check progress at https://dnschecker.org

### Step 4 — SSL Certificate

Vercel automatically provisions and renews a free SSL certificate (HTTPS) for your custom domain
within a few minutes of DNS propagation. No action required.

---

## After Going Live — Important Tasks

### 1. Update Canonical URLs and Sitemap Domain

Currently the canonical URLs and sitemap use the placeholder:

  https://nagudental.in

If your actual domain is different, do a global find-and-replace:

```powershell
cd "c:\Users\HP\OneDrive\Desktop\nagu dental"

# Replace nagudental.in with your actual domain in all HTML files
Get-ChildItem -Filter "*.html" | ForEach-Object {
    (Get-Content $_.FullName) -replace 'nagudental\.in', 'YOURDOMAIN.com' |
    Set-Content $_.FullName
}

# Also update robots.txt and sitemap.xml
(Get-Content robots.txt)  -replace 'nagudental\.in', 'YOURDOMAIN.com' | Set-Content robots.txt
(Get-Content sitemap.xml) -replace 'nagudental\.in', 'YOURDOMAIN.com' | Set-Content sitemap.xml
```

Then commit and push to trigger a Vercel redeploy.

### 2. Submit Sitemap to Google Search Console

1. Go to https://search.google.com/search-console
2. Click "Add property" -> enter your domain.
3. Verify ownership (Vercel makes this easy — add the HTML meta tag Vercel provides).
4. Go to "Sitemaps" in the left menu.
5. Enter: sitemap.xml
6. Click "Submit".

Google will start crawling and indexing your pages within a few days.

### 3. Test Performance (Google PageSpeed Insights)

1. Go to https://pagespeed.web.dev
2. Enter your live URL.
3. Review the report for both Mobile and Desktop.
4. Fix any red or orange issues flagged.

Common wins:
  - Convert large PNG images (hero bg, testimonials) to WebP format.
  - Ensure all above-fold images use loading="eager" (not "lazy").
  - Minimise unused CSS.

### 4. Validate JSON-LD Schema

1. Go to https://validator.schema.org
2. Paste the URL of your live homepage or the raw HTML source.
3. Confirm the Dentist schema validates without errors.

---

## Making Updates

1. Edit any HTML/CSS/JS files locally.
2. Run git add . && git commit -m "your message" && git push.
3. Vercel redeploys in under 30 seconds automatically.

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Structure | HTML5 (multi-page, fully static)    |
| Styles    | Vanilla CSS (nagu.css, 252KB)       |
| Animation | GSAP 3 + ScrollTrigger (local)      |
| Fonts     | Sora + Caveat (Google Fonts)        |
| Forms     | WhatsApp deeplink (no backend)      |
| Hosting   | Vercel (free tier)                  |
| SSL       | Vercel auto-provisioned             |
| DNS       | Your domain registrar + Vercel DNS  |

---

## Contact & Clinic Info

Clinic: NAGU by Dr. Gowri
Address: 17, 80 Feet Ring Road, Next to Bank of Baroda, KHB Colony, Basaveshwar Nagar, Bengaluru 560079
Phone: +91 99451 79026
WhatsApp: https://wa.me/919945179026
Hours: Monday to Saturday 8:30 AM - 8:30 PM | Sunday Closed
Maps: https://maps.app.goo.gl/xQcUcdyBpCfMst6D9
