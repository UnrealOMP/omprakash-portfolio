/**
 * OM PRAKASH GADGE — PORTFOLIO INTERACTIONS, ANIMATIONS & LIVE TELEMETRY
 * Handles:
 * 1. Adaptive Navigation (Dark Hero -> Light Editorial -> Dark Contact) & ScrollSpy
 * 2. Theme Toggle (Dual-Experience Editorial Light vs. Full Dark Mode)
 * 3. Technical Skills Category Filtering
 * 4. Interactive Project Stage Tabs (Live UI Preview vs. System Architecture)
 * 5. Real GitHub & LeetCode Activity Integration (with verified snapshot fallback)
 * 6. GSAP + ScrollTrigger Entrance Animations (respecting prefers-reduced-motion)
 * 7. Functional Google Apps Script Contact Form & Copy-to-Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ==========================================================================
     1. CURSOR SPOTLIGHT
     ========================================================================== */
  const spotlight = document.getElementById('cursor-spotlight');
  if (spotlight && !prefersReducedMotion) {
    window.addEventListener('mousemove', (e) => {
      spotlight.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }, { passive: true });
  }

  /* ==========================================================================
     2. ADAPTIVE NAVBAR & MOBILE MENU
     ========================================================================== */
  const siteHeader = document.getElementById('site-header');
  const heroSection = document.getElementById('hero');
  const contactSection = document.getElementById('contact');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenuIcon = document.getElementById('mobile-menu-icon');
  const mobileNavDrawer = document.getElementById('mobile-nav-drawer');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNavbarAppearance() {
    if (!siteHeader || !heroSection) return;
    const scrollY = window.scrollY;
    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight - 80;
    const contactTop = contactSection ? contactSection.offsetTop - 80 : Infinity;

    if (scrollY < 40) {
      siteHeader.classList.remove('nav-scrolled-light', 'nav-scrolled-dark');
    } else if (scrollY >= heroBottom && scrollY < contactTop) {
      siteHeader.classList.add('nav-scrolled-light');
      siteHeader.classList.remove('nav-scrolled-dark');
    } else {
      siteHeader.classList.add('nav-scrolled-dark');
      siteHeader.classList.remove('nav-scrolled-light');
    }

    // Active section ScrollSpy
    let currentSectionId = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 140;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentSectionId = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === `#${currentSectionId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  window.addEventListener('scroll', updateNavbarAppearance, { passive: true });
  updateNavbarAppearance();

  function closeMobileMenu() {
    if (!mobileNavDrawer || !mobileMenuBtn) return;
    mobileNavDrawer.classList.remove('open');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
    if (mobileMenuIcon) {
      mobileMenuIcon.className = 'fa-solid fa-bars';
    }
  }

  if (mobileMenuBtn && mobileNavDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer.classList.toggle('open');
      mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
      if (mobileMenuIcon) {
        mobileMenuIcon.className = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
      }
    });

    document.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    });
  }

  /* ==========================================================================
     3. THEME SWITCHER (Dual-Tone Default vs. Full-Dark Mode)
     ========================================================================== */
  const themeSwitchBtn = document.getElementById('theme-switch-btn');
  const themeSwitchIcon = document.getElementById('theme-switch-icon');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
      if (themeSwitchIcon) themeSwitchIcon.className = 'fa-solid fa-moon';
      if (themeSwitchBtn) themeSwitchBtn.setAttribute('aria-label', 'Switch to editorial light mode');
    } else {
      document.body.removeAttribute('data-theme');
      if (themeSwitchIcon) themeSwitchIcon.className = 'fa-solid fa-sun';
      if (themeSwitchBtn) themeSwitchBtn.setAttribute('aria-label', 'Switch to full dark mode');
    }
  }

  const savedTheme = localStorage.getItem('omp_portfolio_theme') || 'editorial';
  applyTheme(savedTheme);

  if (themeSwitchBtn) {
    themeSwitchBtn.addEventListener('click', () => {
      const isDark = document.body.getAttribute('data-theme') === 'dark';
      const nextTheme = isDark ? 'editorial' : 'dark';
      localStorage.setItem('omp_portfolio_theme', nextTheme);
      applyTheme(nextTheme);
    });
  }

  /* ==========================================================================
     4. TECHNICAL SKILLS CATEGORY FILTER
     ========================================================================== */
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCards = document.querySelectorAll('.skill-category-card');

  skillFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      skillFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      skillCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        const matches = filter === 'all' || category === filter;
        if (matches) {
          card.style.display = 'flex';
          if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
            gsap.fromTo(
              card,
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
            );
          }
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     5. INTERACTIVE PROJECT SHOWCASE STAGE TABS (UI Preview vs. Architecture)
     ========================================================================== */
  const stageTabBtns = document.querySelectorAll('.stage-tab-btn');
  stageTabBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const targetPaneId = btn.getAttribute('data-target');
      const parentStage = btn.closest('.project-visual-stage');
      if (!parentStage || !targetPaneId) return;

      parentStage.querySelectorAll('.stage-tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      parentStage.querySelectorAll('.stage-pane').forEach((pane) => {
        if (pane.id === targetPaneId) {
          pane.classList.add('active');
        } else {
          pane.classList.remove('active');
        }
      });
    });
  });

  /* ==========================================================================
     6. GITHUB & LEETCODE REAL ACTIVITY INTEGRATION
     ========================================================================== */
  const heatmapContainer = document.getElementById('gh-heatmap-grid');

  // Verified real contribution dates & levels from UnrealOMP GitHub profile
  const verifiedContributionMap = {
    '2026-01-18': { count: 1, level: 1 },
    '2026-02-15': { count: 3, level: 2 },
    '2026-02-16': { count: 1, level: 1 },
    '2026-02-17': { count: 6, level: 3 },
    '2026-02-27': { count: 3, level: 2 },
    '2026-02-28': { count: 8, level: 4 },
    '2026-03-04': { count: 4, level: 2 },
    '2026-04-17': { count: 2, level: 1 },
    '2026-04-18': { count: 1, level: 1 },
    '2026-05-09': { count: 1, level: 1 },
    '2026-05-26': { count: 1, level: 1 },
    '2026-06-17': { count: 1, level: 1 },
    '2026-07-02': { count: 3, level: 2 },
    '2026-07-24': { count: 4, level: 2 },
    '2026-08-01': { count: 1, level: 1 },
    '2026-08-02': { count: 2, level: 1 },
    '2026-08-03': { count: 2, level: 1 },
    '2026-08-04': { count: 3, level: 2 },
    '2026-08-05': { count: 2, level: 1 },
    '2026-08-06': { count: 5, level: 3 },
    '2026-08-07': { count: 1, level: 1 },
    '2026-08-08': { count: 2, level: 1 },
    '2026-08-09': { count: 1, level: 1 },
    '2026-08-10': { count: 3, level: 2 },
    '2026-08-11': { count: 2, level: 1 },
    '2026-08-12': { count: 1, level: 1 },
    '2026-08-13': { count: 2, level: 1 },
    '2026-08-18': { count: 2, level: 1 },
    '2026-08-19': { count: 2, level: 1 },
    '2026-08-20': { count: 2, level: 1 },
    '2026-08-21': { count: 1, level: 1 },
    '2026-08-24': { count: 4, level: 2 },
    '2026-08-25': { count: 2, level: 1 },
    '2026-08-26': { count: 1, level: 1 },
    '2026-08-27': { count: 1, level: 1 },
    '2026-09-02': { count: 3, level: 2 },
    '2026-09-06': { count: 3, level: 2 },
    '2026-09-07': { count: 1, level: 1 },
    '2026-09-22': { count: 3, level: 2 },
    '2026-09-23': { count: 1, level: 1 },
    '2026-09-24': { count: 8, level: 4 },
    '2026-10-12': { count: 1, level: 1 },
    '2026-10-19': { count: 1, level: 1 }
  };

  function renderHeatmapCells(contributionsArray) {
    if (!heatmapContainer) return;
    heatmapContainer.innerHTML = '';
    const fragment = document.createDocumentFragment();

    contributionsArray.forEach((day) => {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.setAttribute('data-level', String(day.level || 0));
      cell.setAttribute(
        'title',
        `${day.count || 0} contribution${day.count === 1 ? '' : 's'} on ${day.date}`
      );
      fragment.appendChild(cell);
    });

    heatmapContainer.appendChild(fragment);
  }

  // Build initial 364-day array using verified snapshot
  function buildFallbackContributions() {
    const days = [];
    const end = new Date('2026-11-17T00:00:00Z');
    for (let i = 363; i >= 0; i--) {
      const d = new Date(end);
      d.setUTCDate(d.getUTCDate() - i);
      const iso = d.toISOString().slice(0, 10);
      const hit = verifiedContributionMap[iso];
      days.push({
        date: iso,
        count: hit ? hit.count : 0,
        level: hit ? hit.level : 0
      });
    }
    return days;
  }

  renderHeatmapCells(buildFallbackContributions());

  // Live fetch GitHub Contributions API
  fetch('https://github-contributions-api.jogruber.de/v4/UnrealOMP?y=last')
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((data) => {
      if (data && Array.isArray(data.contributions)) {
        renderHeatmapCells(data.contributions.slice(-364));
      }
      if (data && data.total && typeof data.total.lastYear === 'number') {
        const contribEl = document.getElementById('gh-contrib-count');
        if (contribEl) contribEl.textContent = String(data.total.lastYear);
      }
    })
    .catch(() => {
      // Keeps verified snapshot seamlessly
    });

  // Live fetch GitHub User API
  fetch('https://api.github.com/users/UnrealOMP')
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((profile) => {
      if (profile && typeof profile.public_repos === 'number') {
        const repoCountEl = document.getElementById('gh-repo-count');
        if (repoCountEl) repoCountEl.textContent = String(profile.public_repos);
      }
    })
    .catch(() => {});

  // Live fetch LeetCode Profile API
  fetch('https://alfa-leetcode-api.onrender.com/userProfile/Unreal_OMP')
    .then((res) => (res.ok ? res.json() : Promise.reject()))
    .then((lc) => {
      if (!lc || typeof lc.totalSolved !== 'number') return;
      const totalEl = document.getElementById('lc-total-solved');
      const easyEl = document.getElementById('lc-easy-count');
      const medEl = document.getElementById('lc-medium-count');
      const hardEl = document.getElementById('lc-hard-count');
      const subEl = document.getElementById('lc-submissions-count');

      if (totalEl) totalEl.textContent = String(lc.totalSolved);
      if (easyEl && typeof lc.easySolved === 'number') {
        easyEl.textContent = `${lc.easySolved} / ${lc.totalEasy || 976}`;
      }
      if (medEl && typeof lc.mediumSolved === 'number') {
        medEl.textContent = `${lc.mediumSolved} / ${lc.totalMedium || 2148}`;
      }
      if (hardEl && typeof lc.hardSolved === 'number') {
        hardEl.textContent = `${lc.hardSolved} / ${lc.totalHard || 991}`;
      }
      if (subEl && Array.isArray(lc.totalSubmissions) && lc.totalSubmissions[0]) {
        subEl.textContent = `${lc.totalSubmissions[0].submissions} Total Submissions`;
      }
    })
    .catch(() => {
      // Keeps verified real LeetCode snapshot
    });

  /* ==========================================================================
     7. GSAP + SCROLLTRIGGER ANIMATIONS
     ========================================================================== */
  if (typeof gsap !== 'undefined' && !prefersReducedMotion) {
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Hero Entrance Sequence
    const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    heroTl
      .fromTo('.hero-anim-item', { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.11, delay: 0.1 })
      .fromTo('.hero-scene-caption', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.35')
      .fromTo('.scroll-down-indicator', { opacity: 0 }, { opacity: 1, duration: 0.6 }, '-=0.3');

    // Scroll-triggered reveals for sections
    if (typeof ScrollTrigger !== 'undefined') {
      gsap.utils.toArray('.reveal-up').forEach((elem) => {
        gsap.fromTo(
          elem,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 86%',
              toggleActions: 'play none none none'
            }
          }
        );
      });
    }
  }

  /* ==========================================================================
     8. ONE-CLICK COPY EMAIL BUTTON
     ========================================================================== */
  const copyEmailBtn = document.getElementById('copy-email-btn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'omprakashg6766@gmail.com';
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(() => {
          const originalText = copyEmailBtn.innerHTML;
          copyEmailBtn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
          setTimeout(() => {
            copyEmailBtn.innerHTML = originalText;
          }, 2200);
        });
      }
    });
  }

  /* ==========================================================================
     9. FUNCTIONAL CONTACT FORM (Google Apps Script Backend + Mailto Fallback)
     ========================================================================== */
  const contactForm = document.getElementById('portfolio-contact-form');
  const submitBtn = document.getElementById('contact-submit-btn');
  const feedbackBox = document.getElementById('contact-form-feedback');
  const googleScriptURL =
    'https://script.google.com/macros/s/AKfycbySrZDlhV-YCl_84zFKqy0aVl29E4Em-MxF-nAUPzgdEp56ARd-zVRkWPHIf_TwDCH7BA/exec';

  if (contactForm && submitBtn && feedbackBox) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = contactForm.elements['Name'].value.trim();
      const emailVal = contactForm.elements['Email'].value.trim();
      const messageVal = contactForm.elements['message'].value.trim();

      if (!nameVal || !emailVal || !messageVal) {
        feedbackBox.className = 'form-feedback error';
        feedbackBox.innerHTML =
          '<i class="fa-solid fa-circle-exclamation"></i> Please complete all required fields before sending.';
        return;
      }

      submitBtn.disabled = true;
      const originalBtnHTML = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Dispatching Message...';
      feedbackBox.className = 'form-feedback';
      feedbackBox.style.display = 'none';

      const formData = new FormData(contactForm);

      fetch(googleScriptURL, {
        method: 'POST',
        body: formData,
        mode: 'no-cors'
      })
        .then(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          contactForm.reset();
          feedbackBox.className = 'form-feedback success';
          feedbackBox.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been logged to Omprakash\'s inbox.';
        })
        .catch(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHTML;
          feedbackBox.className = 'form-feedback error';
          feedbackBox.innerHTML =
            '<i class="fa-solid fa-envelope"></i> Network restricted — <a href="mailto:omprakashg6766@gmail.com" style="text-decoration:underline;font-weight:700;">click here to email omprakashg6766@gmail.com directly</a>.';
        });
    });
  }
});
