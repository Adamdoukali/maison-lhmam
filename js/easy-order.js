/**
 * MAISON L'HMAM FLEURISTE — COMMANDE FACILE (easy-order.js)
 * Clean white layout controller with Teddy Bears, Gifts, Flowers & Bouquets,
 * dynamic search/filtering, quantity steppers, and floating express order bar.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. CLEAN CATALOG: TEDDY BEARS, GIFTS, FLOWERS & BOUQUETS
  // =========================================================================
  const EASY_PRODUCTS = [
    // TEDDY BEARS
    {
      id: 'teddy-couture-creme',
      name: "Grand Ourson Peluche Royal & Roses Blanches",
      category: 'teddy',
      price: 650,
      img: 'assets/images/teddy_bear_couture.jpg',
      badge: "🧸 Peluche de Luxe",
      badgeType: "badge-teddy",
      subtitle: "Peluche Douceur Haute Couture • Ruban Satin Doré",
      desc: "Magnifique grand ourson crème ultra-doux paré d'un nœud en satin champagne, accompagné d'un délicat bouquet de roses blanches d'altitude et d'eucalyptus frais."
    },
    {
      id: 'teddy-roses-blush',
      name: "L'Ourson Éternel aux Roses Blush",
      category: 'teddy',
      price: 590,
      img: 'assets/images/rose_teddy_bear.jpg',
      badge: "🧸 Roses Éternelles",
      badgeType: "badge-teddy",
      subtitle: "Sculpté à la Main • Écrin Transparent Doré",
      desc: "Ourson d'artisan entièrement façonné de centaines de roses éternelles pastel au toucher velouté, présenté dans son luxueux écrin transparent à structure or."
    },

    // LUXURY GIFTS & HAMPERS
    {
      id: 'gift-deluxe-gourmet',
      name: "Coffret Prestige Macarons, Chocolats & Bougie",
      category: 'gifts',
      price: 780,
      img: 'assets/images/gift_set_deluxe.jpg',
      badge: "🎁 Coffret Gourmet",
      badgeType: "badge-gift",
      subtitle: "Chocolats Fins, Macarons, Bougie & Mini Bouquet",
      desc: "L'assortiment cadeau par excellence : coffret de chocolats artisanaux et macarons parisiens, bougie parfumée jasmin et santal, avec son vase fleuri de saison."
    },
    {
      id: 'gift-bougie-vase',
      name: "Duo Bougie Parfumée & Vase Artisanal Céramique",
      category: 'gifts',
      price: 380,
      img: 'assets/images/scenography_table.jpg',
      badge: "🎁 Duo Raffiné",
      badgeType: "badge-gift",
      subtitle: "Art de Vivre & Ambiance Maison L'Hmam",
      desc: "Bougie de cire végétale coulée à la main aux senteurs envoûtantes de fleur d'oranger du Nord et son vase artisanal beige mat prêt à accueillir vos fleurs."
    },

    // FLOWERS & FRESH BOUQUETS
    {
      id: 'bouquet-blanc-douceur',
      name: "Bouquet Douceur Impériale d'Alabâtre",
      category: 'bouquets',
      price: 790,
      img: 'assets/images/white_garden_bouquet.jpg',
      badge: "💐 Bouquet Frais",
      badgeType: "badge-flower",
      subtitle: "Roses de Jardin, Renoncules & Eucalyptus",
      desc: "Harmonie lumineuse de roses de jardin crème, renoncules blanches, lisianthus vaporeux et feuillage d'argent lié d'un ruban de soie sauvage."
    },
    {
      id: 'cotton-alabatre',
      name: "Le Coton Sauvage & Roses d'Alabâtre",
      category: 'bouquets',
      price: 950,
      img: 'assets/images/cotton_roses_bouquet.jpg',
      badge: "💐 Signature Coton",
      badgeType: "badge-flower",
      subtitle: "Capsules de Coton Brut & 25 Roses Blanches",
      desc: "Branches de coton immaculé, roses d'altitude d'Équateur et eucalyptus argenté. Notre création phare la plus plébiscitée à Tanger."
    },
    {
      id: 'imperial-100-roses',
      name: "L'Impérial 100 Roses Rouges d'Équateur",
      category: 'bouquets',
      price: 1200,
      img: 'assets/images/instagram/insta_roses_bouquet.jpg',
      badge: "💐 100 Roses Rouges",
      badgeType: "badge-flower",
      subtitle: "100 Tiges Sélectionnées Grand Format",
      desc: "Dôme floral monumental de 100 roses velours rouge carmin grand calibre, le cadeau d'amour et de passion absolu pour marquer les esprits."
    },
    {
      id: 'blush-peonies',
      name: "Élixir de Pivoines Blush & David Austin",
      category: 'bouquets',
      price: 1100,
      img: 'assets/images/blush_peonies.jpg',
      badge: "💐 Pivoines & Roses",
      badgeType: "badge-flower",
      subtitle: "Pivoines Françaises & Roses Pêche Parfumées",
      desc: "Pivoines charnues rose poudré, roses de jardin David Austin aux nuances abricot et eucalyptus dans son habillage soyeux."
    },
    {
      id: 'david-austin',
      name: "L'Impérial David Austin Anglaises",
      category: 'bouquets',
      price: 850,
      img: 'assets/images/bouquet_signature.jpg',
      badge: "💐 Bestseller",
      badgeType: "badge-flower",
      subtitle: "Roses Anglaises & Parfum Envoûtant",
      desc: "Roses anglaises David Austin aux nuances pêche et crème poudrée, feuillage de saison parfumé et finition ruban de satin doré."
    },
    {
      id: 'cap-spartel-wild',
      name: "Le Sauvage de Cap Spartel & Détroit",
      category: 'bouquets',
      price: 750,
      img: 'assets/images/cap_spartel_wild.jpg',
      badge: "💐 Terroir Tanger",
      badgeType: "badge-flower",
      subtitle: "Olivier du Rif, Coton & Lavande Parfumée",
      desc: "Composition champêtre inspirée de la Riviera de Cap Spartel : capsules de coton, lisianthus, brins de lavande bleue et feuillage d'olivier sauvage."
    },

    // HAT BOXES & VELVET
    {
      id: 'black-velvet-roses',
      name: "Boîte Chapeau Velours Noir Baccara",
      category: 'boxes',
      price: 1350,
      img: 'assets/images/black_velvet_roses.jpg',
      badge: "🌸 Boîte Velours",
      badgeType: "badge-box",
      subtitle: "Roses Sombres Baccara & Écrin Velours",
      desc: "Écrin cylindrique en velours noir nuit gaufré d'or abritant des roses sombres Black Baccara de haute tenue sur oasis hydratée."
    },
    {
      id: 'boite-velours',
      name: "Boîte Velours Alabâtre Impériale",
      category: 'boxes',
      price: 980,
      img: 'assets/images/luxury_box.jpg',
      badge: "🌸 Écrin Velours",
      badgeType: "badge-box",
      subtitle: "Roses Blanches d'Altitude & Dorure",
      desc: "Boîte ronde capitonnée de velours noir garnie de roses blanches d'altitude et touches végétales précieuses."
    }
  ];

  // =========================================================================
  // 2. STATE & FILTERING
  // =========================================================================
  const state = {
    search: '',
    category: 'all',
    filtered: [...EASY_PRODUCTS]
  };

  const gridEl = document.getElementById('easy-products-grid');
  const searchInput = document.getElementById('easy-search-input');
  const searchClear = document.getElementById('easy-search-clear');
  const filterPills = document.querySelectorAll('.easy-filter-pill');
  const floatingBar = document.getElementById('easy-floating-bar');
  const floatingCount = document.getElementById('floating-cart-count');
  const floatingTotal = document.getElementById('floating-cart-total');
  const btnFloatingView = document.getElementById('btn-floating-view');
  const btnFloatingWhatsapp = document.getElementById('btn-floating-whatsapp');

  // Quantities state per product card
  const productQuantities = {};
  EASY_PRODUCTS.forEach(p => { productQuantities[p.id] = 1; });

  // Render Product Cards
  function renderEasyProducts() {
    if (!gridEl) return;

    if (state.filtered.length === 0) {
      gridEl.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem;">
          <div style="font-size: 2.5rem; margin-bottom: 0.8rem;">🔍</div>
          <h3 style="font-family: var(--font-serif); font-size: 1.6rem; color: #1A1715; margin-bottom: 0.5rem;">Aucun article trouvé</h3>
          <p style="color: #7A6F66; font-size: 0.9rem;">Essayez un autre mot-clé (ex: ourson, chocolat, rose, pivoine...).</p>
        </div>
      `;
      return;
    }

    gridEl.innerHTML = state.filtered.map(product => {
      const qty = productQuantities[product.id] || 1;
      return `
        <article class="easy-product-card" data-id="${product.id}" data-category="${product.category}">
          <div class="easy-img-wrap">
            <span class="easy-badge ${product.badgeType}">${product.badge}</span>
            <img src="${product.img}" alt="${product.name}" class="easy-img" loading="lazy">
          </div>

          <div class="easy-card-body">
            <div class="easy-card-subtitle">${product.subtitle}</div>
            <h3 class="easy-card-title">${product.name}</h3>
            <p class="easy-card-desc">${product.desc}</p>

            <div class="easy-card-footer">
              <div class="easy-price-row">
                <span class="easy-price">${product.price.toLocaleString()} MAD</span>
                <span class="easy-delivery-tag">✓ Livraison Offerte Tanger</span>
              </div>

              <div class="easy-actions-row">
                <!-- Stepper -->
                <div class="easy-qty-stepper">
                  <button class="easy-qty-btn btn-step-down" data-id="${product.id}" aria-label="Diminuer">-</button>
                  <span class="easy-qty-num" id="qty-val-${product.id}">${qty}</span>
                  <button class="easy-qty-btn btn-step-up" data-id="${product.id}" aria-label="Augmenter">+</button>
                </div>

                <!-- Add to Cart -->
                <button class="btn-easy-add btn-card-add" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
                  <span>Ajouter</span>
                </button>

                <!-- Direct WhatsApp Order -->
                <button class="btn-easy-order-direct btn-card-express" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
                  <span>⚡ Commander</span>
                </button>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Filter Logic
  function applyEasyFilters() {
    let result = [...EASY_PRODUCTS];

    if (state.search.trim()) {
      const q = state.search.toLowerCase().trim();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.subtitle.toLowerCase().includes(q) || 
        p.desc.toLowerCase().includes(q)
      );
    }

    if (state.category !== 'all') {
      result = result.filter(p => p.category === state.category);
    }

    state.filtered = result;
    renderEasyProducts();
  }

  // Search input listeners
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value;
      if (searchClear) searchClear.style.display = state.search ? 'block' : 'none';
      applyEasyFilters();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        state.search = '';
        searchClear.style.display = 'none';
        searchInput.focus();
        applyEasyFilters();
      }
    });
  }

  // Category filter tabs
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.category = pill.dataset.category;
      applyEasyFilters();
    });
  });

  // Quantity stepper delegation
  document.addEventListener('click', (e) => {
    const btnDown = e.target.closest('.btn-step-down');
    if (btnDown) {
      const id = btnDown.dataset.id;
      if (productQuantities[id] > 1) {
        productQuantities[id]--;
        const valEl = document.getElementById(`qty-val-${id}`);
        if (valEl) valEl.textContent = productQuantities[id];
      }
      return;
    }

    const btnUp = e.target.closest('.btn-step-up');
    if (btnUp) {
      const id = btnUp.dataset.id;
      productQuantities[id] = (productQuantities[id] || 1) + 1;
      const valEl = document.getElementById(`qty-val-${id}`);
      if (valEl) valEl.textContent = productQuantities[id];
      return;
    }

    // Add to Cart
    const btnAdd = e.target.closest('.btn-card-add');
    if (btnAdd) {
      const id = btnAdd.dataset.id;
      const qty = productQuantities[id] || 1;
      const product = EASY_PRODUCTS.find(p => p.id === id);
      if (product && window.MaisonCart) {
        for (let i = 0; i < qty; i++) {
          window.MaisonCart.addToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img
          }, i === qty - 1);
        }
        updateFloatingBar();
      }
      return;
    }

    // Direct WhatsApp Express Order
    const btnExpress = e.target.closest('.btn-card-express');
    if (btnExpress) {
      const id = btnExpress.dataset.id;
      const qty = productQuantities[id] || 1;
      const product = EASY_PRODUCTS.find(p => p.id === id);
      if (product && window.MaisonCart) {
        window.MaisonCart.openOrderModal({
          id: product.id,
          name: product.name,
          price: product.price,
          img: product.img,
          quantity: qty
        });
      }
      return;
    }
  });

  // =========================================================================
  // 3. FLOATING BOTTOM CART SUMMARY BAR
  // =========================================================================
  function updateFloatingBar() {
    if (!floatingBar) return;
    let cart = [];
    try {
      const saved = localStorage.getItem('maison_lhmam_cart');
      if (saved) cart = JSON.parse(saved);
    } catch (e) {
      cart = [];
    }

    let totalCount = 0;
    let totalPrice = 0;
    cart.forEach(item => {
      totalCount += item.quantity;
      if (typeof item.price === 'number') totalPrice += item.price * item.quantity;
    });

    if (totalCount > 0) {
      floatingBar.classList.add('show');
      if (floatingCount) floatingCount.textContent = `${totalCount} article${totalCount > 1 ? 's' : ''}`;
      if (floatingTotal) floatingTotal.textContent = `${totalPrice.toLocaleString()} MAD`;
    } else {
      floatingBar.classList.remove('show');
    }
  }

  // Floating Bar Button Handlers
  if (btnFloatingView) {
    btnFloatingView.addEventListener('click', () => {
      if (window.MaisonCart) window.MaisonCart.openCart();
    });
  }

  if (btnFloatingWhatsapp) {
    btnFloatingWhatsapp.addEventListener('click', () => {
      if (window.MaisonCart) window.MaisonCart.openOrderModal(null);
    });
  }

  // Initial Sync
  renderEasyProducts();
  setTimeout(updateFloatingBar, 300);

  // Sync on local storage change (cross tabs / actions)
  window.addEventListener('storage', updateFloatingBar);
  document.addEventListener('click', () => setTimeout(updateFloatingBar, 200));
});
