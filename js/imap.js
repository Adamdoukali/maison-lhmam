/**
 * MAISON L'HMAM — INTERACTIVE GOOGLE MAPS CONTROLLER ("iMap")
 * Switches between:
 * - Store 1: Moujahidine (https://maps.app.goo.gl/Ni36PKvkmt94vurT6 | 35.7665252, -5.8578994)
 * - Store 2: Avenue Idriss Ier (https://maps.app.goo.gl/4JgsXBxLP4e6wzs16 | 35.7717167, -5.7970454)
 * - Overview: Both boutiques in Tangier
 */

document.addEventListener('DOMContentLoaded', () => {
  const currentLang = (document.documentElement.lang || 'fr').toLowerCase();

  const storeMapUrls = {
    store1: `https://maps.google.com/maps?q=35.7665252,-5.8578994&hl=${currentLang}&z=16&output=embed`,
    store2: `https://maps.google.com/maps?q=35.7717167,-5.7970454&hl=${currentLang}&z=16&output=embed`,
    both: `https://maps.google.com/maps?q=35.769,-5.827&hl=${currentLang}&z=13&output=embed`
  };

  const iframe = document.getElementById('imap-frame');
  const titleEl = document.getElementById('map-status-text');
  const cards = document.querySelectorAll('.boutique-card');
  const tabs = document.querySelectorAll('.map-tab-btn');

  function setStore(storeKey) {
    if (!iframe) return;
    const url = storeMapUrls[storeKey] || storeMapUrls.store1;
    iframe.src = url;

    const matchingCard = document.querySelector(`.boutique-card[data-store="${storeKey}"]`);
    if (titleEl) {
      if (matchingCard && matchingCard.dataset.title) {
        titleEl.textContent = matchingCard.dataset.title;
      } else if (storeKey === 'both') {
        titleEl.textContent = currentLang === 'en'
          ? 'Tangier — Both Boutiques'
          : currentLang === 'es'
            ? 'Tánger — Ambas Boutiques'
            : 'Tanger — Nos 2 Boutiques';
      }
    }

    cards.forEach(c => {
      if (c.dataset.store === storeKey) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    tabs.forEach(t => {
      if (t.dataset.target === storeKey) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  }

  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('a')) return;
      setStore(card.dataset.store);
    });
  });

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      setStore(tab.dataset.target);
    });
  });
});
