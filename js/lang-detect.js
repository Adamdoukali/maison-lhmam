/**
 * MAISON L'HMAM FLEURISTE — MULTILINGUAL ENGINE & SMART DEVICE DETECTION
 * Languages: French (fr), English (en), Spanish (es).
 * 
 * Features:
 * 1. Automatic browser/device language detection on entry (navigator.language).
 *    - Spanish device -> /es/ (or /es/shop)
 *    - English device -> /en/ (or /en/shop)
 *    - French/Other device -> / (or /shop)
 * 2. Persistent user preference storage in localStorage ('maison_lhmam_user_lang').
 * 3. Bidirectional navigation across /fr/, /en/, /es/ and /french, /english, /spanish.
 * 4. Active language highlight and SEO-friendly link interception.
 */

(function () {
  const SUPPORTED_LANGS = ['fr', 'en', 'es'];
  const STORAGE_KEY = 'maison_lhmam_user_lang';

  // 1. Get language from URL path
  function getLangFromUrl() {
    const path = window.location.pathname.toLowerCase();
    if (path.startsWith('/en') || path.startsWith('/english')) return 'en';
    if (path.startsWith('/es') || path.startsWith('/spanish')) return 'es';
    if (path.startsWith('/fr') || path.startsWith('/french')) return 'fr';
    return null;
  }

  // 2. Detect device / browser primary language
  function getDeviceLang() {
    try {
      const nav = window.navigator;
      const raw = (nav.languages && nav.languages[0]) || nav.language || nav.userLanguage || 'fr';
      const clean = raw.toLowerCase().split('-')[0];
      if (SUPPORTED_LANGS.includes(clean)) return clean;
    } catch (e) {
      // Fallback
    }
    return 'fr';
  }

  // 3. Auto-Redirect on Entry (only if user has not explicitly navigated to a language path)
  function handleAutoDetection() {
    const urlLang = getLangFromUrl();
    const path = window.location.pathname;

    // If already on a language-prefixed route, store it as the preferred language and do not redirect
    if (urlLang) {
      localStorage.setItem(STORAGE_KEY, urlLang);
      return;
    }

    // Only auto-redirect on root index or root shop page
    const isRootHome = path === '/' || path === '/index.html' || path === '';
    const isRootShop = path === '/shop' || path === '/shop.html';

    if (isRootHome || isRootShop) {
      const stored = localStorage.getItem(STORAGE_KEY);
      const targetLang = stored || getDeviceLang();

      // If French and at root, French is already the root default
      if (targetLang === 'fr') return;

      const destination = isRootShop ? `/${targetLang}/shop` : `/${targetLang}/`;
      if (path !== destination && path !== `/${targetLang}/index.html` && path !== `/${targetLang}/shop.html`) {
        window.location.replace(destination);
      }
    }
  }

  // 4. Bind Language Switchers (Desktop Pill & Mobile Menu)
  function initLanguageSwitchers() {
    const currentLang = document.documentElement.lang || getLangFromUrl() || 'fr';

    const langButtons = document.querySelectorAll('.lang-btn, [data-lang], [data-set-lang]');
    langButtons.forEach(btn => {
      const btnLang = btn.dataset.lang || btn.getAttribute('data-set-lang') || (btn.textContent || '').trim().toLowerCase();
      
      // Update active state visual indicator
      if (btnLang === currentLang || (btnLang.length === 2 && currentLang.startsWith(btnLang))) {
        btn.classList.add('active');
        btn.setAttribute('aria-current', 'true');
      } else {
        btn.classList.remove('active');
        btn.removeAttribute('aria-current');
      }

      btn.addEventListener('click', (e) => {
        let target = btn.dataset.lang || btn.getAttribute('data-set-lang');
        if (!target) {
          const txt = (btn.textContent || '').trim().toUpperCase();
          if (txt.includes('FR')) target = 'fr';
          else if (txt.includes('EN')) target = 'en';
          else if (txt.includes('ES')) target = 'es';
        }

        if (!target || !SUPPORTED_LANGS.includes(target)) return;

        // Save preference so device language auto-detect won't override user's deliberate switch
        localStorage.setItem(STORAGE_KEY, target);

        const currentPath = window.location.pathname;
        const isShop = currentPath.includes('shop');

        let targetUrl = '/';
        if (target === 'en') {
          targetUrl = isShop ? '/en/shop' : '/en/';
        } else if (target === 'es') {
          targetUrl = isShop ? '/es/shop' : '/es/';
        } else {
          targetUrl = isShop ? '/shop' : '/';
        }

        if (window.location.pathname !== targetUrl) {
          e.preventDefault();
          window.location.href = targetUrl;
        }
      });
    });
  }

  // Run auto detection immediately
  handleAutoDetection();

  // Attach click events on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageSwitchers);
  } else {
    initLanguageSwitchers();
  }

  // Global helper API
  window.MaisonLhmamI18n = {
    getLang: () => document.documentElement.lang || getLangFromUrl() || 'fr',
    setLang: (l) => {
      if (SUPPORTED_LANGS.includes(l)) {
        localStorage.setItem(STORAGE_KEY, l);
      }
    }
  };
})();
