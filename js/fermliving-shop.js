/**
 * MAISON L'HMAM FLEURISTE — BOUTIQUE FLORALE (FERM LIVING AESTHETIC)
 * Clean white shop engine: Product grid, slide-out cart drawer,
 * sorting, quick-view modal & structured WhatsApp order command.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. PRODUCTS DATA (ALL 14 EXQUISITE PRODUCTS)
  // =========================================================================
  const PRODUCTS = [
    {
      id: 'cotton-alabatre',
      name: "Le Coton Sauvage & Roses d'Alabâtre",
      price: 950,
      priceSort: 950,
      img: 'assets/images/cotton_roses_bouquet.jpg',
      badge: "Signature 1947",
      origin: "Coton Brut Naturel • Roses Blanches d'Équateur",
      desc: "Branches de coton immaculé, roses d'altitude et eucalyptus argenté dans son vase artisanal. Une création signature iconique de la Maison.",
      dots: ['#ffffff', '#2a2a2a', '#8ea18d'],
      specs: {
        varieties: "25 Roses Mondial d'Équateur, Capsules de Coton Pur, Eucalyptus",
        provenance: "Équateur & Hollande",
        dimensions: "Ø ~48 cm • Hauteur ~55 cm",
        freshness: "Garantie 8 à 12 jours (coton éternel)"
      }
    },
    {
      id: 'imperial-100-roses',
      name: "L'Impérial 100 Roses Rouges d'Équateur",
      price: 1200,
      priceSort: 1200,
      img: 'assets/images/instagram/insta_roses_bouquet.jpg',
      badge: "100 Roses",
      origin: "100 Tiges Sélectionnées • Volcans d'Équateur",
      desc: "Somptueux dôme floral monumental de 100 roses velours rouge carmin, symbole intemporel de passion et d'élégance absolue.",
      dots: ['#9b111e', '#111111'],
      specs: {
        varieties: "100 Roses rouges Explorer / Freedom catégorie premium",
        provenance: "Volcans d'Équateur",
        dimensions: "Ø dôme ~60 cm • Hauteur ~65 cm",
        freshness: "Garantie 7 à 10 jours"
      }
    },
    {
      id: 'david-austin',
      name: "L'Impérial David Austin & Renoncules",
      price: 850,
      priceSort: 850,
      img: 'assets/images/bouquet_signature.jpg',
      badge: "Bestseller",
      origin: "Roses Anglaises David Austin • Parfum Sublime",
      desc: "Pétales en chou délicats aux nuances pêche et crème poudrée, feuillage de saison parfumé et boutons de renoncules pastel.",
      dots: ['#f4c2c2', '#f5e6d3', '#708238'],
      specs: {
        varieties: "Roses David Austin Juliet & Edith, Renoncules Clooni",
        provenance: "Angleterre & Hollande",
        dimensions: "Ø ~42 cm • Hauteur ~50 cm",
        freshness: "Garantie 7 à 9 jours"
      }
    },
    {
      id: 'boite-velours',
      name: "Boîte Velours Alabâtre Impériale",
      price: 980,
      priceSort: 980,
      img: 'assets/images/luxury_box.jpg',
      badge: "Écrin de Velours",
      origin: "Boîte Chapeau Velours Noir & Dorure à Chaud",
      desc: "Écrin rond capitonné abritant des roses blanches d'altitude et touches végétales délicates disposées sur oasis florale hydratée.",
      dots: ['#1a1a1a', '#ffffff', '#d4af37'],
      specs: {
        varieties: "24 Roses Avalanche, Hortensia stabilisé, Mousse végétale",
        provenance: "Hollande & Équateur",
        dimensions: "Boîte Ø 26 cm • Hauteur 32 cm",
        freshness: "Oasis hydratée 6 à 8 jours"
      }
    },
    {
      id: 'royal-orchids',
      name: "Cascade d'Orchidées Royales d'Asie",
      price: 1450,
      priceSort: 1450,
      img: 'assets/images/royal_orchids.jpg',
      badge: "Rare Botanique",
      origin: "Phalaenopsis Grandes Tiges & Bambou Naturel",
      desc: "Orchidées blanches impériales en cascade sculpturale montées sur branches naturelles dans leur poterie d'artisan céramiste.",
      dots: ['#fdfbf7', '#8a9a5b'],
      specs: {
        varieties: "Phalaenopsis Grandiflora 6 à 8 hampes fleuries",
        provenance: "Asie & Serres Royales Hollande",
        dimensions: "Hauteur ~75 cm",
        freshness: "Floraison active 4 à 8 semaines"
      }
    },
    {
      id: 'blush-peonies',
      name: "Élixir de Pivoines Blush & Roses Pêche",
      price: 1100,
      priceSort: 1100,
      img: 'assets/images/blush_peonies.jpg',
      badge: "Saison Éphémère",
      origin: "Pivoines Sarah Bernhardt & Roses Poudrées",
      desc: "Pivoines opulentes rose dragée, roses de jardin champagne et eucalyptus vaporeux liées d'un ruban de soie sauvage.",
      dots: ['#ffc0cb', '#fdf6e2', '#a8c3bc'],
      specs: {
        varieties: "Pivoines Sarah Bernhardt, Roses de jardin Playa Blanca",
        provenance: "France & Hollande",
        dimensions: "Ø ~45 cm • Hauteur ~50 cm",
        freshness: "Garantie 6 à 9 jours"
      }
    },
    {
      id: 'cap-spartel',
      name: "Symphonie Botanique du Cap Spartel",
      price: 680,
      priceSort: 680,
      img: 'assets/images/cap_spartel_wild.jpg',
      badge: "Tanger Sauvage",
      origin: "Flore Côtière Méditerranéenne & Romarin",
      desc: "Composition d'herbes aromatiques côtières, immortelles, lavande maritime et roses champêtres inspirée de la falaise sparteline.",
      dots: ['#7a9a60', '#d9c5b2', '#e8a87c'],
      specs: {
        varieties: "Chardons bleus, Limonium, Romarin sauvage, Roses blush",
        provenance: "Cap Spartel & Rif Marocain",
        dimensions: "Ø ~40 cm • Hauteur ~45 cm",
        freshness: "Garantie 10 à 14 jours (séchage naturel)"
      }
    },
    {
      id: 'black-velvet',
      name: "Écrin Mystique Roses Noires Baccara",
      price: 1350,
      priceSort: 1350,
      img: 'assets/images/black_velvet_roses.jpg',
      badge: "Édition Prestige",
      origin: "Roses Black Baccara d'Équateur • Velours Sombre",
      desc: "Nuances bordeaux profondes presque noires aux reflets grenat, présentées dans un coffret de velours noir satiné frappé d'or.",
      dots: ['#2c000e', '#0f0f10'],
      specs: {
        varieties: "Roses veloutées Black Baccara d'Équateur",
        provenance: "Andes Équatoriennes",
        dimensions: "Boîte ronde Ø 24 cm • Hauteur 28 cm",
        freshness: "Garantie 7 à 10 jours"
      }
    },
    {
      id: 'teddy-couture-creme',
      name: "Grand Ourson Peluche Royal & Roses Blanches",
      price: 650,
      priceSort: 650,
      img: 'assets/images/teddy_bear_couture.jpg',
      badge: "Peluche Couture",
      origin: "Ourson Douceur Prestige & Mini Bouquet",
      desc: "Grand ourson crème soyeux paré d'un nœud en satin champagne, accompagné d'un délicat bouquet de roses blanches d'altitude.",
      dots: ['#eed9c4', '#ffffff', '#c5a059'],
      specs: {
        varieties: "Ourson peluche hypoallergénique 45 cm + Roses blanches",
        provenance: "Création Atelier Tanger",
        dimensions: "Hauteur peluche ~45 cm",
        freshness: "Peluche durable & fleurs fraîches"
      }
    },
    {
      id: 'teddy-roses-blush',
      name: "L'Ourson Éternel aux Roses Blush",
      price: 590,
      priceSort: 590,
      img: 'assets/images/rose_teddy_bear.jpg',
      badge: "Roses Éternelles",
      origin: "Sculpté à la Main • Écrin Transparent Doré",
      desc: "Ourson d'artisan entièrement façonné de centaines de roses éternelles pastel dans son luxueux écrin transparent à structure or.",
      dots: ['#f7cac9', '#ffffff'],
      specs: {
        varieties: "Centaines de mini roses douces éternelles façonnées main",
        provenance: "Atelier Haute Décoration",
        dimensions: "Écrin vitrine 30 × 30 × 40 cm",
        freshness: "Conservation éternelle garantie sans arrosage"
      }
    },
    {
      id: 'gift-deluxe-gourmet',
      name: "Coffret Prestige Chocolats, Bougie & Fleurs",
      price: 780,
      priceSort: 780,
      img: 'assets/images/gift_set_deluxe.jpg',
      badge: "Coffret Gourmet",
      origin: "Chocolats d'Artisan, Bougie & Mini Fleurs",
      desc: "L'assortiment de dégustation et senteur : boîte de chocolats fins et macarons, bougie végétale fleur d'oranger et mini vase fleuri.",
      dots: ['#5c4033', '#e5dcc3', '#d4af37'],
      specs: {
        varieties: "Chocolats belges, bougie cire de soja, mini bouquet frais",
        provenance: "Artisans Tanger & Paris",
        dimensions: "Coffret rigide luxe 35 × 25 cm",
        freshness: "Livraison gourmande sous film scellé"
      }
    },
    {
      id: 'bouquet-blanc-douceur',
      name: "Bouquet Douceur Impériale d'Alabâtre",
      price: 790,
      priceSort: 790,
      img: 'assets/images/white_garden_bouquet.jpg',
      badge: "Nouveauté",
      origin: "Roses de Jardin, Renoncules & Eucalyptus",
      desc: "Harmonie lumineuse de roses de jardin crème, renoncules blanches, lisianthus vaporeux et feuillage d'argent lié d'un ruban de soie.",
      dots: ['#faf0e6', '#ffffff', '#93a29b'],
      specs: {
        varieties: "Roses Avalanche, Renoncules blanches, Eucalyptus Cinerea",
        provenance: "Hollande & Équateur",
        dimensions: "Ø ~42 cm • Hauteur ~50 cm",
        freshness: "Garantie 7 à 10 jours"
      }
    },
    {
      id: 'wedding-arch',
      name: "Arche Monumentale de Cérémonie",
      price: 5500,
      priceSort: 5500,
      img: 'assets/images/wedding_arch.jpg',
      badge: "Sur-Mesure",
      origin: "Scénographie Grand Format Tanger",
      desc: "Arche florale sculpturale composée de milliers de tiges fraîches pour mariages princiers, fiançailles et réceptions au bord du détroit.",
      dots: ['#ffffff', '#e6d7c3', '#708238'],
      specs: {
        varieties: "Roses blanches, Hortensias, Eucalyptus, Glycine",
        provenance: "Installation sur place par nos fleuristes à Tanger",
        dimensions: "Sur-mesure (2.5m à 4m)",
        freshness: "Mise en place le jour de l'événement"
      }
    },
    {
      id: 'sceno-table',
      name: "Scénographie de Table d'Honneur Végétale",
      price: 3800,
      priceSort: 3800,
      img: 'assets/images/scenography_table.jpg',
      badge: "Réceptions Royales",
      origin: "Chemins de Table & Vases Méditerranéens",
      desc: "Décor végétal continu avec chandeliers dorés, verrerie ciselée et fleurs fraîches du matin pour sublimer vos dîners d'exception.",
      dots: ['#3b5323', '#c5a059', '#f4f0ea'],
      specs: {
        varieties: "Feuillages nobles, Roses parfumées, Chandeliers or",
        provenance: "Tanger & Palais du Nord",
        dimensions: "Modulable par table de 10 à 30 convives",
        freshness: "Installation florale fraîche"
      }
    }
  ];

  // =========================================================================
  // 2. STATE MANAGEMENT (CART & WISHLIST)
  // =========================================================================
  let rawCart = [];
  try {
    rawCart = JSON.parse(localStorage.getItem('maison_lhmam_cart') || '[]');
  } catch (e) {
    rawCart = [];
  }
  let cart = Array.isArray(rawCart) ? rawCart.map(item => ({
    id: item.id || '',
    name: item.name || '',
    price: Number(item.price) || 0,
    img: item.img || '',
    qty: Math.max(1, Number(item.qty || item.quantity || 1))
  })).filter(item => item.id && item.name) : [];

  let wishlist = JSON.parse(localStorage.getItem('maison_lhmam_wishlist') || '[]');
  let currentSort = 'default';

  const gridContainer = document.getElementById('ferm-product-grid');
  const countBadge = document.getElementById('shop-product-count');
  const sortSelect = document.getElementById('shop-sort-select');

  // Nav Cart Elements
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartNavCount = document.getElementById('cart-nav-count');

  // Cart Drawer Elements
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawerClose = document.getElementById('cart-drawer-close');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal-price');
  const btnProceedCheckout = document.getElementById('btn-proceed-checkout');

  // WhatsApp Order Modal Elements
  const orderModalOverlay = document.getElementById('order-modal-overlay');
  const orderModalClose = document.getElementById('order-modal-close');
  const orderForm = document.getElementById('order-checkout-form');
  const modalItemsSummary = document.getElementById('modal-items-summary');

  // Quick View Modal Elements
  const qvModalOverlay = document.getElementById('qv-modal-overlay');
  const qvModalClose = document.getElementById('qv-modal-close');

  // Toast
  const toast = document.getElementById('luxury-toast');
  const toastText = document.getElementById('toast-text');

  function showToast(message) {
    if (!toast) return;
    toastText.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  // =========================================================================
  // 3. RENDER PRODUCT GRID (FERM LIVING 4-COL LAYOUT)
  // =========================================================================
  function renderProducts() {
    if (!gridContainer) return;

    let items = [...PRODUCTS];

    if (currentSort === 'price-asc') {
      items.sort((a, b) => a.priceSort - b.priceSort);
    } else if (currentSort === 'price-desc') {
      items.sort((a, b) => b.priceSort - a.priceSort);
    }

    if (countBadge) {
      countBadge.textContent = `(${items.length} créations d'exception)`;
    }

    let html = '';

    items.forEach((p, index) => {
      const isWishlisted = wishlist.includes(p.id);

      // Render the product card
      html += `
        <article class="ferm-card" data-id="${p.id}">
          <div class="ferm-img-box" data-action="quickview" data-id="${p.id}">
            <span class="ferm-badge-tag">${p.badge}</span>
            <button class="ferm-wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${p.id}" aria-label="Ajouter aux favoris">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${p.img}" alt="${p.name}" class="ferm-product-img" loading="lazy">
          </div>

          <div class="ferm-variant-dots">
            ${p.dots.map(d => `<span class="ferm-dot" style="background-color: ${d};"></span>`).join('')}
          </div>

          <div class="ferm-info">
            <h3 class="ferm-title" data-action="quickview" data-id="${p.id}">${p.name}</h3>
            <p class="ferm-sub-origin">${p.origin}</p>
            <div class="ferm-price">${p.price.toLocaleString('fr-FR')} MAD</div>
          </div>

          <button class="ferm-btn-action" data-action="add-cart" data-id="${p.id}">
            + Ajouter au Panier
          </button>
        </article>
      `;

      // Insert Ferm Living Editorial Quote Card after 8th item (Row 3, item 1)
      if (index === 7) {
        html += `
          <div class="ferm-editorial-card">
            <span class="editorial-eyebrow">MAISON L'HMAM • DEPUIS 1947</span>
            <h2 class="editorial-quote">L'art floral au confluent de la Méditerranée et de l'Atlantique</h2>
            <p class="editorial-sub">Chaque bouquet est une composition d'artisan, assemblée à la commande le matin même à Tanger.</p>
            <a href="index.html#histoire" class="editorial-link">Découvrir l'Histoire (1947–2026) →</a>
          </div>
        `;
      }
    });

    gridContainer.innerHTML = html;
  }

  // =========================================================================
  // 4. CART DRAWER & STATE SYNC
  // =========================================================================
  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
    const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.qty) || 1)), 0);

    // Update nav counter
    if (cartNavCount) {
      cartNavCount.textContent = totalCount;
    }

    if (cartSubtotalEl) {
      cartSubtotalEl.textContent = `${subtotal.toLocaleString('fr-FR')} MAD`;
    }

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" stroke-width="1.2">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <h3 class="cart-empty-title">Votre panier est vide</h3>
          <p class="cart-empty-sub">Explorez notre collection florale et ajoutez vos créations préférées.</p>
        </div>
      `;
      if (btnProceedCheckout) btnProceedCheckout.disabled = true;
    } else {
      if (btnProceedCheckout) btnProceedCheckout.disabled = false;
      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item-row" data-id="${item.id}">
          <div class="cart-item-thumb">
            <img src="${item.img}" alt="${item.name}">
          </div>
          <div class="cart-item-details">
            <h4 class="cart-item-title">${item.name}</h4>
            <div class="cart-item-price">${(Number(item.price) || 0).toLocaleString('fr-FR')} MAD</div>
            <div class="cart-item-controls">
              <div class="cart-qty-stepper">
                <button class="cart-qty-btn" data-action="decrease-qty" data-id="${item.id}">-</button>
                <span class="cart-qty-number">${Number(item.qty) || 1}</span>
                <button class="cart-qty-btn" data-action="increase-qty" data-id="${item.id}">+</button>
              </div>
              <button class="cart-remove-btn" data-action="remove-item" data-id="${item.id}">Supprimer</button>
            </div>
          </div>
        </div>
      `).join('');
    }

    localStorage.setItem('maison_lhmam_cart', JSON.stringify(cart));
  }

  function addToCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty = (Number(existing.qty) || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: Number(product.price) || 0,
        img: product.img,
        qty: 1
      });
    }

    updateCartUI();
    openCartDrawer();
    showToast(`Ajouté au panier : ${product.name}`);
  }

  function openCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCartDrawer() {
    if (cartDrawerOverlay) cartDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // =========================================================================
  // 5. QUICK-VIEW MODAL
  // =========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !qvModalOverlay) return;

    document.getElementById('qv-badge').textContent = product.badge;
    document.getElementById('qv-title').textContent = product.name;
    document.getElementById('qv-price').textContent = `${product.price.toLocaleString('fr-FR')} MAD`;
    document.getElementById('qv-desc').textContent = product.desc;
    document.getElementById('qv-img').src = product.img;
    document.getElementById('qv-img').alt = product.name;

    document.getElementById('qv-variety').textContent = product.specs.varieties;
    document.getElementById('qv-origin').textContent = product.specs.provenance;
    document.getElementById('qv-dimensions').textContent = product.specs.dimensions;
    document.getElementById('qv-freshness').textContent = product.specs.freshness;

    const btnAdd = document.getElementById('qv-btn-add');
    if (btnAdd) {
      btnAdd.onclick = () => {
        addToCart(product.id);
        closeQuickView();
      };
    }

    qvModalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (qvModalOverlay) qvModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  // =========================================================================
  // 6. WHATSAPP ORDER COMMAND DISPATCH
  // =========================================================================
  function openOrderModal() {
    if (cart.length === 0) {
      showToast("Votre panier est vide");
      return;
    }

    closeCartDrawer();

    if (modalItemsSummary) {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      modalItemsSummary.innerHTML = `
        <div style="background: #faf8f5; border: 1px solid #eae8e1; border-radius: 4px; padding: 1rem; margin-bottom: 1.25rem;">
          <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #ff5401; margin-bottom: 0.5rem;">Récapitulatif de votre sélection (${cart.length} créations) :</div>
          <ul style="list-style: none; font-size: 0.85rem; color: #141416; display: flex; flex-direction: column; gap: 0.35rem;">
            ${cart.map(i => `<li>• <strong>${i.qty}x</strong> ${i.name} — <em>${(i.price * i.qty).toLocaleString('fr-FR')} MAD</em></li>`).join('')}
          </ul>
          <div style="margin-top: 0.75rem; border-top: 1px dashed #ddd; padding-top: 0.5rem; font-weight: 700; font-size: 0.95rem; display: flex; justify-content: space-between;">
            <span>Total :</span>
            <span>${subtotal.toLocaleString('fr-FR')} MAD (Livraison Tanger Offerte)</span>
          </div>
        </div>
      `;
    }

    if (orderModalOverlay) {
      orderModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeOrderModal() {
    if (orderModalOverlay) orderModalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('client-name').value.trim();
      const phone = document.getElementById('client-phone').value.trim();
      const recipient = document.getElementById('recipient-name').value.trim();
      const address = document.getElementById('delivery-address').value.trim();
      const schedule = document.getElementById('delivery-date').value.trim();
      const message = document.getElementById('card-message').value.trim();
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'À la livraison (Cash/TPE)';

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

      // Build WhatsApp Message
      let msg = `🌸 *NOUVELLE COMMANDE — MAISON L'HMAM FLEURISTE TANGER*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `👤 *Client :* ${name}\n`;
      msg += `📞 *Téléphone / WhatsApp :* ${phone}\n`;
      if (recipient) msg += `🎁 *Destinataire du cadeau :* ${recipient}\n`;
      msg += `📍 *Adresse de livraison à Tanger :* ${address}\n`;
      msg += `⏰ *Date & Créneau souhaité :* ${schedule}\n`;
      msg += `💳 *Paiement :* ${paymentMethod}\n\n`;

      msg += `💐 *CRÉATIONS COMMANDÉES :*\n`;
      cart.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.name}\n   Quantité : ${item.qty} | Prix : ${(item.price * item.qty).toLocaleString('fr-FR')} MAD\n`;
      });
      msg += `\n💰 *TOTAL DE LA COMMANDE :* ${subtotal.toLocaleString('fr-FR')} MAD\n`;
      msg += `🚚 *Livraison à Tanger :* OFFERTE LE JOUR MÊME\n\n`;

      if (message) {
        msg += `💌 *MESSAGE POUR LA CARTE CALLIGRAPHIÉE OFFERTE :*\n"${message}"\n\n`;
      }

      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `✨ *Validation instantanée par nos artisans fleuristes à Tanger.*`;

      const encoded = encodeURIComponent(msg);
      const whatsappNumber = "212661000000"; // Maison L'Hmam concierge
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

      window.open(whatsappUrl, '_blank');

      closeOrderModal();
      showToast("Votre commande a été préparée sur WhatsApp !");

      // Clear cart
      cart = [];
      updateCartUI();
    });
  }

  // =========================================================================
  // 7. EVENT LISTENERS
  // =========================================================================
  // Grid click delegation
  if (gridContainer) {
    gridContainer.addEventListener('click', (e) => {
      const btnAdd = e.target.closest('[data-action="add-cart"]');
      if (btnAdd) {
        const id = btnAdd.dataset.id;
        addToCart(id);
        return;
      }

      const btnWishlist = e.target.closest('[data-action="wishlist"]');
      if (btnWishlist) {
        const id = btnWishlist.dataset.id;
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter(item => item !== id);
          btnWishlist.classList.remove('active');
          showToast("Retiré des favoris");
        } else {
          wishlist.push(id);
          btnWishlist.classList.add('active');
          showToast("Ajouté à vos favoris");
        }
        localStorage.setItem('maison_lhmam_wishlist', JSON.stringify(wishlist));
        return;
      }

      const quickviewTarget = e.target.closest('[data-action="quickview"]');
      if (quickviewTarget) {
        const id = quickviewTarget.dataset.id;
        openQuickView(id);
        return;
      }
    });
  }

  // Cart controls delegation
  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const dec = e.target.closest('[data-action="decrease-qty"]');
      if (dec) {
        const id = dec.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) {
            cart = cart.filter(i => i.id !== id);
          }
          updateCartUI();
        }
        return;
      }

      const inc = e.target.closest('[data-action="increase-qty"]');
      if (inc) {
        const id = inc.dataset.id;
        const item = cart.find(i => i.id === id);
        if (item) {
          item.qty += 1;
          updateCartUI();
        }
        return;
      }

      const rem = e.target.closest('[data-action="remove-item"]');
      if (rem) {
        const id = rem.dataset.id;
        cart = cart.filter(i => i.id !== id);
        updateCartUI();
        return;
      }
    });
  }

  // Sort change
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // Open/Close Cart
  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCartDrawer();
    });
  }

  // Checkout button
  if (btnProceedCheckout) {
    btnProceedCheckout.addEventListener('click', openOrderModal);
  }

  // Quickview Close
  if (qvModalClose) qvModalClose.addEventListener('click', closeQuickView);
  if (qvModalOverlay) {
    qvModalOverlay.addEventListener('click', (e) => {
      if (e.target === qvModalOverlay) closeQuickView();
    });
  }

  // Order Modal Close
  if (orderModalClose) orderModalClose.addEventListener('click', closeOrderModal);
  if (orderModalOverlay) {
    orderModalOverlay.addEventListener('click', (e) => {
      if (e.target === orderModalOverlay) closeOrderModal();
    });
  }

  // Keyboard Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeOrderModal();
    }
  });

  // Mobile drawer toggle
  const mobileBtn = document.getElementById('mobile-menu-toggle');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (mobileBtn && mobileOverlay && mobileClose) {
    mobileBtn.addEventListener('click', () => {
      mobileOverlay.style.display = 'flex';
    });
    mobileClose.addEventListener('click', () => {
      mobileOverlay.style.display = 'none';
    });
  }

  // INITIAL LOAD
  renderProducts();
  updateCartUI();
});
