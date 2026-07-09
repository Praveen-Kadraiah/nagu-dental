import { createClient } from 'https://esm.sh/@sanity/client@6.1.3';

// Sanity Client initialization
const client = createClient({
  projectId: 'exi81qhl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false
});

// Helper to convert Sanity Image references to CDN URLs
function urlFor(source) {
  if (!source || !source.asset || !source.asset._ref) return '';
  const ref = source.asset._ref;
  const parts = ref.split('-');
  if (parts.length < 4) return '';
  const id = parts[1];
  const dims = parts[2];
  const ext = parts[3];
  return `https://cdn.sanity.io/images/exi81qhl/production/${id}-${dims}.${ext}`;
}

// Helper to dynamically update document title and SEO meta tags
function updateSEO(seo) {
  if (!seo) return;
  if (seo.metaTitle) {
    document.title = seo.metaTitle;
  }
  if (seo.metaDescription) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = seo.metaDescription;
  }
  if (seo.ogImage) {
    let metaOgImg = document.querySelector('meta[property="og:image"]');
    if (!metaOgImg) {
      metaOgImg = document.createElement('meta');
      metaOgImg.setAttribute('property', 'og:image');
      document.head.appendChild(metaOgImg);
    }
    metaOgImg.content = urlFor(seo.ogImage);
  }
}

// Reusable FAQ Section Component HTML Template
const FAQ_SECTION_TEMPLATE = `
  <section class="section_faq">
    <div class="section-padding padding-120x140">
      <div class="container">
        <div class="section_component">
          <div class="faq-element">
            <div class="faq_info">
              <div class="faq-info_content">
                <div class="margin-bottom margin-12px">
                  <div class="section_tag">
                    <div class="icon_wrap is-small">
                      <svg fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 12 12" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.45455H7.31455L10.6255 2.14364L9.85636 1.37455L6.54545 4.68545V0H5.45455V4.68545L2.14364 1.37455L1.37455 2.14364L4.68545 5.45455H0V6.54545H4.68545L1.37455 9.85636L2.14364 10.6255L5.45455 7.31455V12H6.54545V7.31455L9.85636 10.6255L10.6255 9.85636L7.31455 6.54545H12V5.45455Z" fill="currentColor"></path>
                      </svg>
                    </div>
                    <div>FAQ</div>
                  </div>
                </div>
                <div class="margin-bottom margin-16px">
                  <h2><span class="text-highlighted">Questions </span>We Get Often</h2>
                </div>
                <p class="body-text-18px">Answers to Your Most Common Questions About Dental Care and Our Services</p>
              </div>
              <div class="faq_cta">
                <div class="faq-cta_icon-wrap">
                  <svg class="faq-cta_icon" fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16.42V19.9561C21 20.4811 20.5941 20.9167 20.0705 20.9537C19.6331 20.9846 19.2763 21 19 21C10.1634 21 3 13.8366 3 5C3 4.72371 3.01545 4.36687 3.04635 3.9295C3.08337 3.40588 3.51894 3 4.04386 3H7.5801C7.83678 3 8.05176 3.19442 8.07753 3.4498C8.10067 3.67907 8.12218 3.86314 8.14207 4.00202C8.34435 5.41472 8.75753 6.75936 9.3487 8.00303C9.44359 8.20265 9.38171 8.44159 9.20185 8.57006L7.04355 10.1118C8.35752 13.1811 10.8189 15.6425 13.8882 16.9565L15.4271 14.8019C15.5572 14.6199 15.799 14.5573 16.001 14.6532C17.2446 15.2439 18.5891 15.6566 20.0016 15.8584C20.1396 15.8782 20.3225 15.8995 20.5502 15.9225C20.8056 15.9483 21 16.1633 21 16.42Z" fill="currentColor"></path>
                  </svg>
                </div>
                <div class="faq-cta_info">
                  <div class="faq-cta_info-content">
                    <div class="faq-cta_info-title">Still have a question?</div>
                    <p>Our team is ready to assist you with anything you need.</p>
                  </div>
                  <div class="faq-cta_info-button">
                    <a class="button_primary w-inline-block" href="contact.html">
                      <div class="button_inner">
                        <div class="button-text_wrap">
                          <div class="button_text">Make A Call</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="faq_list" data-sanity="faqs-list">
              <!-- FAQs loaded dynamically -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
`;

// 1. Load Global Components (Header, Footer, Contact info)
function loadGlobalSettings() {
  const query = `*[_type == "siteSettings"][0]{
    logoDark,
    logoLight,
    phone,
    email,
    address,
    workingHours,
    socialLinks,
    ctaBanner {
      heading,
      description,
      cta { label, url }
    }
  }`;

  return client.fetch(query).then(settings => {
    if (!settings) return;

    // Header & Footer Logos
    if (settings.logoDark) {
      document.querySelectorAll('[data-sanity="logo-dark"]').forEach(el => {
        el.src = urlFor(settings.logoDark);
      });
    }
    if (settings.logoLight) {
      document.querySelectorAll('[data-sanity="logo-light"]').forEach(el => {
        el.src = urlFor(settings.logoLight);
      });
    }

    // Phone Links
    if (settings.phone) {
      document.querySelectorAll('[data-sanity="phone"]').forEach(el => {
        el.innerText = settings.phone;
        if (el.tagName === 'A') {
          el.href = `tel:${settings.phone.replace(/\s+/g, '')}`;
        }
      });
    }

    // Email Links
    if (settings.email) {
      document.querySelectorAll('[data-sanity="email"]').forEach(el => {
        el.innerText = settings.email;
        if (el.tagName === 'A') {
          el.href = `mailto:${settings.email}`;
        }
      });
    }

    // Address
    if (settings.address) {
      document.querySelectorAll('[data-sanity="address"]').forEach(el => {
        el.innerText = settings.address;
      });
    }

    // Working Hours
    if (settings.workingHours && settings.workingHours.length > 0) {
      document.querySelectorAll('[data-sanity="hours"]').forEach(el => {
        el.innerHTML = settings.workingHours.map(item => 
          `<p>${item.days}: ${item.hours}</p>`
        ).join('');
      });
    }

    // Social Links
    if (settings.socialLinks) {
      settings.socialLinks.forEach(link => {
        const platform = link.platform.toLowerCase();
        document.querySelectorAll(`[data-sanity="social-${platform}"]`).forEach(el => {
          el.href = link.url;
        });
      });
    }

    // Global CTA Banner Promotion
    if (settings.ctaBanner) {
      const banner = settings.ctaBanner;
      document.querySelectorAll('[data-sanity="cta-banner"]').forEach(container => {
        const titleEl = container.querySelector('[data-sanity="cta-title"]');
        const descEl = container.querySelector('[data-sanity="cta-desc"]');
        const btnEl = container.querySelector('[data-sanity="cta-btn"]');
        
        if (titleEl && banner.heading) titleEl.innerText = banner.heading;
        if (descEl && banner.description) descEl.innerText = banner.description;
        if (btnEl && banner.cta) {
          btnEl.innerText = banner.cta.label;
          btnEl.href = banner.cta.url;
        }
      });
    }

    reinitializeWebflow();
  });
}

// 2. Load Testimonials (Homepage slider/marquee)
function loadTestimonials() {
  const containers = document.querySelectorAll('[data-sanity="testimonials-list"]');
  if (containers.length === 0) return;

  const query = `*[_type == "testimonial"]{
    author,
    role,
    quote,
    rating,
    avatar,
    signature
  }`;

  client.fetch(query).then(testimonials => {
    if (!testimonials || testimonials.length === 0) return;

    const html = testimonials.map(t => `
      <div class="testimonials-card w-dyn-item">
        <div class="testimonials-card-top">
          <img class="testi-avatar" src="${t.avatar ? urlFor(t.avatar) : 'assets/img/default-avatar.png'}" alt="${t.author}">
          <div class="testi-quote-badge">
            <svg width="100%" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.192 15.757c0-.754-.025-1.43-.075-2.028a3.713 3.713 0 0 1-.057-.583c0-2.527 2.078-4.57 4.617-4.57.773 0 1.5.19 2.137.525a4.34 4.34 0 0 1 1.737 1.637 4.67 4.67 0 0 1 .599 2.271 4.62 4.62 0 0 1-1.348 3.238 4.63 4.63 0 0 1-3.237 1.348c-.61 0-1.229-.126-1.854-.378a4.49 4.49 0 0 1-1.633-1.074 4.42 4.42 0 0 1-.987-1.488ZM2 15.757c0-.754-.025-1.43-.075-2.028a3.713 3.713 0 0 1-.057-.583C1.868 10.619 3.946 8.576 6.485 8.576c.773 0 1.5.19 2.137.525a4.34 4.34 0 0 1 1.737 1.637 4.67 4.67 0 0 1 .599 2.271 4.62 4.62 0 0 1-1.348 3.238 4.63 4.63 0 0 1-3.237 1.348c-.61 0-1.229-.126-1.854-.378A4.49 4.49 0 0 1 2.89 16.14 4.42 4.42 0 0 1 1.903 14.652Z"/>
            </svg>
          </div>
        </div>
        <div class="testimonials-card-middle">
          <div class="testi-rating-stars">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
          <p class="testimonials-desc-text">"${t.quote}"</p>
        </div>
        <div class="testimonials-card-bottom">
          <div class="testi-signature">${t.signature || t.author}</div>
          <div class="testi-role">${t.role || 'Verified Patient'}</div>
        </div>
      </div>
    `).join('');

    containers.forEach(container => {
      container.innerHTML = html;
    });

    reinitializeWebflow();
  });
}

// 3. Load FAQs (Accordion)
function loadFaqs() {
  const componentWrappers = document.querySelectorAll('[data-sanity-component="faq-section"]');
  
  if (componentWrappers.length > 0) {
    componentWrappers.forEach(el => {
      el.innerHTML = FAQ_SECTION_TEMPLATE;
    });
  }

  const container = document.querySelector('[data-sanity="faqs-list"]');
  if (!container) return;

  const query = `*[_type == "faq"]{ question, answer }`;

  client.fetch(query).then(faqs => {
    if (!faqs || faqs.length === 0) return;

    container.innerHTML = faqs.map((faq, idx) => `
      <div class="faq_accordion">
        <div class="faq_question-trigger">
          <div class="faq_question-text">${faq.question}</div>
          <div class="faq_icon-wrap">
            <div class="faq_icon-line is-horizontal"></div>
            <div class="faq_icon-line is-vertical"></div>
          </div>
        </div>
        <div class="faq_answer-wrap">
          <div class="faq_answer-content">
            <p class="faq_answer-text">${faq.answer}</p>
          </div>
        </div>
      </div>
    `).join('');

    bindAccordionClicks();
    reinitializeWebflow();
  });
}

// Helper to manually toggle accordion heights since we inject them dynamically
function bindAccordionClicks() {
  document.querySelectorAll('.faq_question-trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const parent = this.parentElement;
      const answerWrap = parent.querySelector('.faq_answer-wrap');
      const isExpanded = parent.classList.toggle('is-expanded');
      
      if (isExpanded) {
        answerWrap.style.maxHeight = answerWrap.scrollHeight + 'px';
      } else {
        answerWrap.style.maxHeight = '0px';
      }
    });
  });
}

// 4. Load Home Page specific content
function loadHomePage() {
  const query = `*[_type == "homePage"][0]{
    hero {
      heading,
      paragraph,
      cta { label, url },
      backgroundImages
    },
    aboutSection {
      tag,
      title,
      description,
      features[] {
        title,
        description
      },
      doctorCta {
        doctorName,
        doctorTitle,
        doctorImage,
        ctaLabel
      },
      rightImage
    },
    whyChooseUsSection {
      heading,
      description,
      features[] {
        title,
        description,
        icon
      }
    },
    tourSection {
      title,
      tourImage
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }`;

  client.fetch(query).then(data => {
    if (!data) return;

    // SEO Settings
    updateSEO(data.seo);

    // Hero content
    if (data.hero) {
      const headingEl = document.querySelector('[data-sanity="home-hero-heading"]');
      const paraEl = document.querySelector('[data-sanity="home-hero-paragraph"]');
      const ctaEl = document.querySelector('[data-sanity="home-hero-cta"]');
      
      if (headingEl && data.hero.heading) headingEl.innerText = data.hero.heading;
      if (paraEl && data.hero.paragraph) paraEl.innerText = data.hero.paragraph;
      if (ctaEl && data.hero.cta) ctaEl.innerText = data.hero.cta.label;

      // Hero carousel images
      if (data.hero.backgroundImages && data.hero.backgroundImages.length > 0) {
        const carouselImgs = document.querySelectorAll('.hero-carousel-img');
        data.hero.backgroundImages.forEach((img, idx) => {
          if (carouselImgs[idx]) {
            carouselImgs[idx].src = urlFor(img);
            carouselImgs[idx].removeAttribute('srcset');
          }
        });
      }
    }

    // About Section
    if (data.aboutSection) {
      const about = data.aboutSection;
      const tagEl = document.querySelector('[data-sanity="home-about-tag"]');
      const titleEl = document.querySelector('[data-sanity="home-about-title"]');
      const descEl = document.querySelector('[data-sanity="home-about-desc"]');
      const rightImg = document.querySelector('[data-sanity="home-about-right-image"]');

      if (tagEl && about.tag) tagEl.innerText = about.tag;
      if (titleEl && about.title) titleEl.innerText = about.title;
      if (descEl && about.description) descEl.innerText = about.description;
      if (rightImg && about.rightImage) {
        rightImg.src = urlFor(about.rightImage);
        rightImg.removeAttribute('srcset');
      }

      // Feature cards
      if (about.features) {
        about.features.forEach((feat, idx) => {
          const fTitle = document.querySelector(`[data-sanity="home-about-feature-title-${idx}"]`);
          const fDesc = document.querySelector(`[data-sanity="home-about-feature-desc-${idx}"]`);
          if (fTitle && feat.title) fTitle.innerText = feat.title;
          if (fDesc && feat.description) fDesc.innerText = feat.description;
        });
      }

      // Doctor CTA
      if (about.doctorCta) {
        const doc = about.doctorCta;
        const dName = document.querySelector('[data-sanity="home-about-doctor-name"]');
        const dTitle = document.querySelector('[data-sanity="home-about-doctor-title"]');
        const dImg = document.querySelector('[data-sanity="home-about-doctor-img"]');
        const dCta = document.querySelector('[data-sanity="home-about-doctor-cta"]');

        if (dName && doc.doctorName) dName.innerText = doc.doctorName;
        if (dTitle && doc.doctorTitle) dTitle.innerText = doc.doctorTitle;
        if (dImg && doc.doctorImage) {
          dImg.src = urlFor(doc.doctorImage);
          dImg.removeAttribute('srcset');
        }
        if (dCta && doc.ctaLabel) dCta.innerText = doc.ctaLabel;
      }
    }

    // Why Choose Us Section
    if (data.whyChooseUsSection) {
      const wcu = data.whyChooseUsSection;
      const wTitle = document.querySelector('[data-sanity="home-wcu-heading"]');
      const wDesc = document.querySelector('[data-sanity="home-wcu-desc"]');
      const cardsBox = document.querySelector('[data-sanity="home-wcu-cards"]');

      if (wTitle && wcu.heading) wTitle.innerText = wcu.heading;
      if (wDesc && wcu.description) wDesc.innerText = wcu.description;

      if (cardsBox && wcu.features && wcu.features.length > 0) {
        cardsBox.innerHTML = wcu.features.map(feat => `
          <div class="wcu-card">
            <div class="wcu-card-icon-wrap">
              ${feat.icon ? `<img class="wcu-card-icon" src="${urlFor(feat.icon)}" alt="${feat.title}" style="width:40px; height:40px; object-fit:contain;" />` : `
                <svg class="wcu-card-icon" fill="none" stroke="#3f8f98" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 16h6m-3 0v12c0 4.4 3.6 8 8 8s8-3.6 8-8v-12h6"></path>
                  <path d="M25 36v10c0 4.4 3.6 8 8 8h10"></path>
                  <circle cx="48" cy="54" r="5"></circle>
                  <circle cx="48" cy="54" r="1.5"></circle>
                </svg>
              `}
            </div>
            <h3 class="wcu-card-title">${feat.title}</h3>
            <p class="wcu-card-desc">${feat.description}</p>
          </div>
        `).join('');
      }
    }

    // Clinic Tour Section
    if (data.tourSection) {
      const tour = data.tourSection;
      const tTitle = document.querySelector('[data-sanity="home-tour-title"]');
      const tImg = document.querySelector('[data-sanity="home-tour-image"]');

      if (tTitle && tour.title) tTitle.innerText = tour.title;
      if (tImg && tour.tourImage) {
        tImg.src = urlFor(tour.tourImage);
        tImg.removeAttribute('srcset');
      }
    }

    reinitializeWebflow();
  });
}

// 5. Load About Page specific content
function loadAboutPage() {
  const query = `*[_type == "aboutPage"][0]{
    hero {
      heading,
      paragraph,
      cta { label, url },
      backgroundImages
    },
    storySection {
      tag,
      title,
      description,
      gallery
    },
    successMetrics[] {
      value,
      label,
      image
    },
    awardsSection {
      title,
      awards[] {
        title,
        organization,
        year,
        image
      }
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }`;

  client.fetch(query).then(data => {
    if (!data) return;

    // SEO Settings
    updateSEO(data.seo);

    // Hero
    if (data.hero) {
      const headingEl = document.querySelector('[data-sanity="about-hero-heading"]');
      const paraEl = document.querySelector('[data-sanity="about-hero-paragraph"]');
      const ctaEl = document.querySelector('[data-sanity="about-hero-cta"]');
      const heroImg = document.querySelector('[data-sanity="about-hero-image"]');

      if (headingEl && data.hero.heading) headingEl.innerText = data.hero.heading;
      if (paraEl && data.hero.paragraph) paraEl.innerText = data.hero.paragraph;
      if (ctaEl && data.hero.cta) ctaEl.innerText = data.hero.cta.label;
      if (heroImg && data.hero.backgroundImages && data.hero.backgroundImages.length > 0) {
        heroImg.src = urlFor(data.hero.backgroundImages[0]);
        heroImg.removeAttribute('srcset');
      }
    }

    // Success Metrics stats cards
    if (data.successMetrics && data.successMetrics.length > 0) {
      const metricsContainer = document.querySelector('[data-sanity="about-metrics"]');
      if (metricsContainer) {
        metricsContainer.innerHTML = data.successMetrics.map(stat => `
          <div class="about-hero_info-item">
            <div class="about-hero_info-item_title">
              <div class="counter_wrapper">
                <div class="count-number">${stat.value}</div>
              </div>
            </div>
            <div class="about-hero_info-item_text">${stat.label}</div>
          </div>
        `).join('');

        // Trigger GSAP counter numbers animation if defined
        if (typeof window.initCounterAnimations === 'function') {
          window.initCounterAnimations();
        }
      }
    }

    // Story section
    if (data.storySection) {
      const story = data.storySection;
      const sTag = document.querySelector('[data-sanity="about-story-tag"]');
      const sTitle = document.querySelector('[data-sanity="about-story-title"]');
      const sDesc = document.querySelector('[data-sanity="about-story-desc"]');
      const sGallery = document.querySelector('[data-sanity="about-story-gallery"]');

      if (sTag && story.tag) sTag.innerText = story.tag;
      if (sTitle && story.title) sTitle.innerText = story.title;
      if (sDesc && story.description) sDesc.innerText = story.description;

      if (sGallery && story.gallery && story.gallery.length > 0) {
        const layoutClasses = ['', 'is-odd', 'is-big', 'is-odd', ''];
        sGallery.innerHTML = story.gallery.map((img, idx) => {
          const cls = layoutClasses[idx % layoutClasses.length];
          return `
            <div class="story-images_wrap ${cls}">
              <img alt="Story image" class="story_images" loading="lazy" src="${urlFor(img)}"/>
            </div>
          `;
        }).join('');
      }
    }

    // Awards tabs section
    if (data.awardsSection && data.awardsSection.awards && data.awardsSection.awards.length > 0) {
      const awardsContainer = document.querySelector('[data-sanity="about-awards"]');
      if (awardsContainer) {
        const awards = data.awardsSection.awards;
        
        const tabMenuHtml = awards.map((award, idx) => `
          <a class="awards-tabs_link w-inline-block w-tab-link ${idx === 0 ? 'w--current' : ''}" data-w-tab="Tab ${idx + 1}">
            <div class="awards-tabs_link-image_wrap">
              <img alt="${award.title}" class="awards-tabs_link-image" loading="lazy" src="${award.image ? urlFor(award.image) : 'assets/img/default-award.png'}"/>
            </div>
            <div class="awards-tabs_link-text">${award.title}</div>
          </a>
        `).join('');

        const tabContentsHtml = awards.map((award, idx) => `
          <div class="w-tab-pane ${idx === 0 ? 'w--tab-active' : ''}" data-w-tab="Tab ${idx + 1}">
            <div class="awards-tabs_pane-inner">
              <div class="awards-tabs_pane-content">
                <div class="awards-tabs_pane-content_header">
                  <div class="margin-bottom margin-12px">
                    <div class="section_tag">
                      <div class="icon_wrap is-small">
                        <svg fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 12 12" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5.45455H7.31455L10.6255 2.14364L9.85636 1.37455L6.54545 4.68545V0H5.45455V4.68545L2.14364 1.37455L1.37455 2.14364L4.68545 5.45455H0V6.54545H4.68545L1.37455 9.85636L2.14364 10.6255L5.45455 7.31455V12H6.54545V7.31455L9.85636 10.6255L10.6255 9.85636L7.31455 6.54545H12V5.45455Z" fill="currentColor"></path>
                        </svg>
                      </div>
                      <div>Awards & Recognition</div>
                    </div>
                  </div>
                  <div class="margin-bottom margin-16px">
                    <h2>${award.title}</h2>
                  </div>
                  <p class="body-text-18px">${award.organization || ''} ${award.year ? `(${award.year})` : ''}</p>
                </div>
                <div class="awards-tabs_pane-feature">
                  <div class="awards-tabs_pane-feature_item">
                    <div class="awards-tabs_pane-feature_item-icon">
                      <svg fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 16 16" width="100%" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16 7.27273H9.75273L14.1673 2.85818L13.1418 1.83273L8.72727 6.24727V0H7.27273V6.24727L2.85818 1.83273L1.83273 2.85818L6.24727 7.27273H0V8.72727H6.24727L1.83273 13.1418L2.85818 14.1673L7.27273 9.75273V16H8.72727V9.75273L13.1418 14.1673L14.1673 13.1418L9.75273 8.72727H16V7.27273Z" fill="#3f8f98"></path>
                      </svg>
                    </div>
                    <div>Recognized for Setting New Standards in Dental Excellence.</div>
                  </div>
                </div>
              </div>
              <div class="awards-tabs_pane-image">
                <div class="awards-tabs_image-wrap">
                  <img alt="${award.title}" class="awards-tabs_image" loading="lazy" src="${award.image ? urlFor(award.image) : 'assets/img/default-award.png'}"/>
                </div>
                <div class="awards-tabs_image-content">
                  <div class="awards-tabs_image-title_wrap">
                    <h3 class="awards-tabs_image-content_title">${award.organization || ''} ${award.year ? `(${award.year})` : ''}</h3>
                  </div>
                </div>
                <div class="awards-tabs_image-overlay"></div>
              </div>
            </div>
          </div>
        `).join('');

        awardsContainer.innerHTML = `
          <div class="section-padding padding-120x120">
            <div class="container">
              <div class="section_component">
                <div class="awards_tabs w-tabs" data-current="Tab 1" data-duration-in="300" data-duration-out="100" data-easing="ease">
                  <div class="awards-tabs_menu w-tab-menu">
                    ${tabMenuHtml}
                  </div>
                  <div class="awards-tabs_content w-tab-content">
                    ${tabContentsHtml}
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
      }
    }

    reinitializeWebflow();
  });
}

// 6. Load Contact Page specific content
function loadContactPage() {
  const query = `*[_type == "contactPage"][0]{
    hero {
      heading,
      paragraph,
      cta { label, url }
    },
    contactDetailsSection {
      title,
      address,
      phone,
      email,
      hoursText
    },
    mapSection {
      title,
      googleMapsUrl,
      embedMapUrl
    },
    seo {
      metaTitle,
      metaDescription,
      ogImage
    }
  }`;

  client.fetch(query).then(data => {
    if (!data) return;

    // SEO Settings
    updateSEO(data.seo);

    // Hero heading and paragraph
    if (data.hero) {
      const headingEl = document.querySelector('[data-sanity="contact-hero-heading"]');
      const paraEl = document.querySelector('[data-sanity="contact-hero-paragraph"]');
      
      if (headingEl && data.hero.heading) headingEl.innerHTML = data.hero.heading;
      if (paraEl && data.hero.paragraph) paraEl.innerText = data.hero.paragraph;
    }

    // Contact Details Section overrides
    if (data.contactDetailsSection) {
      const details = data.contactDetailsSection;
      const cTitle = document.querySelector('[data-sanity="contact-details-title"]');
      const cAddr = document.querySelector('[data-sanity="contact-details-address"]');
      const cHours = document.querySelector('[data-sanity="contact-details-hours"]');
      const cPhone = document.querySelector('[data-sanity="phone"]');
      const cEmail = document.querySelector('[data-sanity="email"]');

      if (cTitle && details.title) cTitle.innerText = details.title;
      if (cAddr && details.address) cAddr.innerText = details.address;
      
      if (details.phone && cPhone) {
        cPhone.innerText = details.phone;
        if (cPhone.tagName === 'A') cPhone.href = `tel:${details.phone.replace(/\s+/g, '')}`;
      }
      if (details.email && cEmail) {
        cEmail.innerText = details.email;
        if (cEmail.tagName === 'A') cEmail.href = `mailto:${details.email}`;
      }

      if (cHours && details.hoursText) {
        cHours.innerHTML = `<p style="margin: 0; line-height: 1.6; color: #5d6c7b;">${details.hoursText.replace(/\n/g, '<br>')}</p>`;
      }
    }

    // Map Section
    if (data.mapSection) {
      const map = data.mapSection;
      const mTitle = document.querySelector('[data-sanity="contact-map-title"]');
      const mLink = document.querySelector('[data-sanity="contact-map-link"]');
      const mIframe = document.querySelector('[data-sanity="contact-map-iframe"]');

      if (mTitle && map.title) mTitle.innerText = map.title;
      if (mLink && map.googleMapsUrl) mLink.href = map.googleMapsUrl;
      if (mIframe && map.embedMapUrl) mIframe.src = map.embedMapUrl;
    }

    reinitializeWebflow();
  });
}

// 7. Load Treatments main page (Accordion listing)
function loadTreatmentsPage() {
  const container = document.querySelector('[data-sanity="treatments-list"]');
  if (!container) return;

  const query = `*[_type == "treatment"]{
    title,
    slug,
    description,
    heroImage
  }`;

  client.fetch(query).then(treatments => {
    if (!treatments || treatments.length === 0) return;

    container.innerHTML = treatments.map(t => {
      const slugStr = t.slug?.current?.toLowerCase() || '';
      let detailPage = 'contact.html'; // Fallback
      if (slugStr.includes('clean') || slugStr.includes('preventive')) detailPage = 'teeth-cleaning.html';
      else if (slugStr.includes('whiten') || slugStr.includes('cosmetic')) detailPage = 'teeth-whitening.html';
      else if (slugStr.includes('ortho')) detailPage = 'orthodontics.html';
      else if (slugStr.includes('implant')) detailPage = 'dental-implants.html';
      else if (slugStr.includes('emerg')) detailPage = 'emergency-care.html';
      else if (slugStr.includes('fill') || slugStr.includes('restor')) detailPage = 'fillings-restorations.html';

      const thumbUrl = t.heroImage ? urlFor(t.heroImage) : 'assets/img/gen_service-thumbnail-image.jpg';

      return `
        <div class="w-dyn-item" role="listitem">
          <div class="service-item_wrap">
            <div class="service-item_trigger">
              <div class="service-trigger_content-wrap">
                <h3 class="service-trigger_title">${t.title}</h3>
                <div class="service-trigger_para-wrap">
                  <p class="service-trigger_para">${t.description || ''}</p>
                </div>
              </div>
              <div class="service-trigger_icon-wrap">
                <div class="service-trigger_icon">
                  <svg fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 12 18" width="100%" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.53047 17.0606L5.53024 1.50232M10.5303 6.06051L5.53023 1.06055L0.530273 6.06055" stroke="currentColor" stroke-width="1.5"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div class="service-item_body">
              <div class="service-item_body-inner">
                <div class="service-item_small-text">What includes</div>
                <div class="service-item_details">
                  <div class="service-thumbnail_wrap">
                    <img alt="${t.title}" class="service_thumbnail" loading="lazy" src="${thumbUrl}"/>
                  </div>
                  <div class="service-tag_wrap">
                    <div class="service_tag">
                      <div class="service-tag_icon">
                        <svg fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z" fill="white"></path>
                        </svg>
                      </div>
                      <div>Expert Consultation</div>
                    </div>
                    <div class="service_tag">
                      <div class="service-tag_icon">
                        <svg fill="none" preserveAspectRatio="none" vector-effect="non-scaling-stroke" viewBox="0 0 24 24" width="100%" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM17.4571 9.45711L11 15.9142L6.79289 11.7071L8.20711 10.2929L11 13.0858L16.0429 8.04289L17.4571 9.45711Z" fill="white"></path>
                        </svg>
                      </div>
                      <div>Modern Technology</div>
                    </div>
                  </div>
                  <div class="button-container" style="display: flex; gap: 12px; margin-top: 20px; flex-wrap: wrap;">
                    <a class="button_primary w-inline-block" href="contact.html">
                      <div class="button_inner">
                        <div class="button-text_wrap">
                          <div class="button_text">Book Appointment</div>
                        </div>
                      </div>
                    </a>
                    <a class="button_primary w-inline-block" href="${detailPage}" style="background-color: transparent; border: 1px solid #3f8f98; color: #3f8f98;">
                      <div class="button_inner">
                        <div class="button-text_wrap">
                          <div class="button_text" style="color: #3f8f98;">View Details</div>
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');

    bindTreatmentsAccordionClicks();
    reinitializeWebflow();
  });
}

// Accordion helper logic for dynamic treatments
function bindTreatmentsAccordionClicks() {
  document.querySelectorAll('.service-item_trigger').forEach(trigger => {
    trigger.addEventListener('click', function() {
      const itemWrap = this.closest('.service-item_wrap');
      if (!itemWrap) return;
      
      const body = itemWrap.querySelector('.service-item_body');
      if (!body) return;
      
      const isExpanded = itemWrap.classList.toggle('is-expanded');
      
      if (isExpanded) {
        body.style.display = 'block';
        body.style.maxHeight = body.scrollHeight + 'px';
      } else {
        body.style.maxHeight = '0px';
        setTimeout(() => {
          if (!itemWrap.classList.contains('is-expanded')) {
            body.style.display = 'none';
          }
        }, 300);
      }
    });
  });
}

// 8. Load single Treatment detail content (teeth-cleaning.html, emergency-care.html, etc.)
function loadTreatmentDetailPage() {
  const titleEl = document.querySelector('[data-sanity="treatment-title"]');
  const descEl = document.querySelector('[data-sanity="treatment-description"]');
  if (!titleEl && !descEl) return;

  const query = `*[_type == "treatment"]{
    title,
    slug,
    heroTitle,
    description
  }`;

  client.fetch(query).then(treatments => {
    if (!treatments || treatments.length === 0) return;

    const path = window.location.pathname.toLowerCase();
    
    // Find matching treatment based on filename keywords
    const matched = treatments.find(t => {
      const slugStr = t.slug?.current?.toLowerCase() || '';
      const titleStr = t.title?.toLowerCase() || '';
      
      if (path.includes('cleaning') && (slugStr.includes('clean') || slugStr.includes('prevent') || titleStr.includes('clean') || titleStr.includes('prevent'))) return true;
      if (path.includes('whitening') && (slugStr.includes('whiten') || slugStr.includes('cosmetic') || titleStr.includes('whiten') || titleStr.includes('cosmetic'))) return true;
      if (path.includes('orthodontics') && (slugStr.includes('ortho') || titleStr.includes('ortho'))) return true;
      if (path.includes('implants') && (slugStr.includes('implant') || titleStr.includes('implant'))) return true;
      if (path.includes('emergency') && (slugStr.includes('emerg') || titleStr.includes('emerg'))) return true;
      if (path.includes('fillings') && (slugStr.includes('fill') || slugStr.includes('restor') || titleStr.includes('fill') || titleStr.includes('restor'))) return true;
      return false;
    });

    if (matched) {
      if (titleEl) titleEl.innerText = matched.heroTitle || matched.title;
      if (descEl && matched.description) descEl.innerText = matched.description;
    }
  });
}

// Helper to reinitialize Webflow interactions
function reinitializeWebflow() {
  if (window.Webflow) {
    window.Webflow.destroy();
    window.Webflow.ready();
    if (window.Webflow.require('ix2')) {
      window.Webflow.require('ix2').init();
    }
  }
}

// Routing logic
function initPageLoader() {
  const path = window.location.pathname.toLowerCase();
  
  loadGlobalSettings();
  loadTestimonials();
  loadFaqs();

  if (path === '/' || path.endsWith('/index.html') || path.endsWith('/')) {
    loadHomePage();
  } else if (path.includes('about')) {
    loadAboutPage();
  } else if (path.includes('contact')) {
    loadContactPage();
  } else if (path.includes('treatments')) {
    loadTreatmentsPage();
  } else {
    loadTreatmentDetailPage();
  }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();

  // Listen to mutations on siteSettings, homePage, aboutPage, contactPage, and treatments
  // and trigger dynamic re-render on save/publish in real-time
  client.listen('*[_type in ["siteSettings", "homePage", "aboutPage", "contactPage", "treatment"]]').subscribe(() => {
    initPageLoader();
  });
});
