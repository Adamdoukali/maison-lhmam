/**
 * MAISON L'HMAM FLEURISTE — DEDICATED SHOP ENGINE (shop.js)
 * High-performance search, multi-faceted filtering, sorting,
 * quick-view modal with botanical specifications & cart/WhatsApp integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. COMPREHENSIVE FLORAL CATALOG DATA
  // =========================================================================
  const PRODUCTS = [
    {
      id: 'cotton-alabatre',
      name: "Le Coton Sauvage & Roses d'Alabâtre",
      category: 'cotton',
      price: 950,
      priceSort: 950,
      img: 'assets/images/cotton_roses_bouquet.jpg',
      tag: "Signature Coton • Tanger",
      tagType: 'gold',
      origin: "Coton Brut Naturel • Roses Blanches d'Équateur",
      desc: "Branches de coton immaculé, roses d'altitude et eucalyptus argenté dans son vase artisanal. Une création signature iconique de la Maison.",
      occasion: 'interieur',
      specs: {
        varieties: "Capsules de coton naturel pur, 25 Roses blanches Mondial d'Équateur, Eucalyptus Cinerea",
        originCountry: "Équateur & Hollande",
        dimensions: "Diamètre ~48 cm • Hauteur ~55 cm",
        freshness: "Garantie 8 à 12 jours en eau fraîche",
        packaging: "Papier de soie mat noir, ruban jacquard or, réserve d'eau fraîche"
      },
      care: "Couper les tiges de 2 cm en biseau tous les 2 jours et renouveler l'eau du vase. Garder les branches de coton au sec pour les conserver indéfiniment."
    },
    {
      id: 'imperial-100-roses',
      name: "L'Impérial 100 Roses Rouges",
      category: 'bouquets',
      price: 1200,
      priceSort: 1200,
      img: 'assets/images/instagram/insta_roses_bouquet.jpg',
      tag: "Signature @maisonlhmam",
      tagType: 'normal',
      origin: "100 Tiges Sélectionnées • Équateur",
      desc: "Somptueux dôme floral monumental de 100 roses velours rouge carmin, symbole intemporel de passion et d'élégance absolue.",
      occasion: 'amour',
      specs: {
        varieties: "100 Roses rouges Explorer / Freedom d'Équateur catégorie premium",
        originCountry: "Volcans d'Équateur",
        dimensions: "Diamètre dôme ~60 cm • Hauteur ~65 cm",
        freshness: "Garantie 7 à 10 jours",
        packaging: "Double habillage satin noir haute couture & sceau doré Maison L'Hmam"
      },
      care: "Vase profond nécessaire. Ajouter le sachet de nutriments fourni dans l'eau tiède et vaporiser légèrement les pétales à distance."
    },
    {
      id: 'david-austin',
      name: "L'Impérial David Austin & Renoncules",
      category: 'bouquets',
      price: 850,
      priceSort: 850,
      img: 'assets/images/bouquet_signature.jpg',
      tag: "Bestseller Maison",
      tagType: 'normal',
      origin: "Roses Anglaises David Austin • Parfum Sublime",
      desc: "Pétales en chou délicats aux nuances pêche et crème poudrée, feuillage de saison parfumé et boutons de renoncules pastel.",
      occasion: 'anniversaire',
      specs: {
        varieties: "Roses David Austin Juliet & Edith, Renoncules Clooni, Eucalyptus parvifolia",
        originCountry: "Angleterre & Hollande",
        dimensions: "Diamètre ~42 cm • Hauteur ~50 cm",
        freshness: "Garantie 7 à 9 jours",
        packaging: "Écrin floral luxe noir avec cordon de soie naturelle"
      },
      care: "Placer dans une pièce fraîche à l'abri des fruits mûrs (éthylène). Recouper les tiges biseautées quotidiennement."
    },
    {
      id: 'boite-velours',
      name: "Boîte Velours Alabâtre Impériale",
      category: 'boxes',
      price: 980,
      priceSort: 980,
      img: 'assets/images/luxury_box.jpg',
      tag: "Écrin de Luxe",
      tagType: 'normal',
      origin: "Boîte Chapeau Velours Noir & Dorure à Chaud",
      desc: "Écrin rond capitonné abritant des roses blanches d'altitude et touches végétales délicates disposées sur oasis florale hydratée.",
      occasion: 'anniversaire',
      specs: {
        varieties: "24 Roses blanches Avalanche, Hortensia blanc stabilisé, Mousse végétale",
        originCountry: "Hollande & Équateur",
        dimensions: "Boîte ronde Ø 26 cm • Hauteur composition 32 cm",
        freshness: "Hydratation intégrée autonome 6 à 8 jours",
        packaging: "Boîte chapeau rigide habillée de velours noir & blason or frappé à chaud"
      },
      care: "Verser un demi-verre d'eau au cœur de la mousse végétale tous les 2 jours en évitant de mouiller directement les pétales."
    },
    {
      id: 'royal-orchids',
      name: "Cascade d'Orchidées Royales d'Asie",
      category: 'cotton',
      price: 1450,
      priceSort: 1450,
      img: 'assets/images/royal_orchids.jpg',
      tag: "Nouveauté 2026 • Pièce Unique",
      tagType: 'gold',
      origin: "Phalaenopsis Grandes Fleurs • Vase Bronze Artisanal",
      desc: "Chute majestueuse d'orchidées Phalaenopsis blanches pures dans un vase artisanal texturé façon bronze patiné. Présence architecturale saisissante.",
      occasion: 'interieur',
      specs: {
        varieties: "6 Arches d'Orchidées Phalaenopsis Grandiflora blanches, mousse nordique, tuteurs en bambou noir",
        originCountry: "Serres royales de Hollande & Asie",
        dimensions: "Envergure ~65 cm • Hauteur ~80 cm",
        freshness: "Plante vivante florissante pendant 6 à 10 semaines",
        packaging: "Vase céramique texturé bronze lourd & ruban brodé Tanger"
      },
      care: "Lumière indirecte tamisée. Arroser par trempage des racines 1 fois par semaine dans de l'eau tiède non calcaire, puis bien égoutter."
    },
    {
      id: 'blush-peonies',
      name: "Élixir de Pivoines Blush & Roses de Jardin",
      category: 'bouquets',
      price: 1100,
      priceSort: 1100,
      img: 'assets/images/blush_peonies.jpg',
      tag: "Arrivage Frais de Saison",
      tagType: 'normal',
      origin: "Pivoines Françaises & Roses Pêche David Austin",
      desc: "Pivoines charnues rose poudré, roses de jardin parfumées abricot, eucalyptus cinerea et ruban de soie jacquard brodé.",
      occasion: 'fete',
      specs: {
        varieties: "15 Pivoines Sarah Bernhardt, 12 Roses David Austin, Salal & Eucalyptus",
        originCountry: "Provence (France) & Hollande",
        dimensions: "Diamètre ~50 cm • Hauteur ~52 cm",
        freshness: "Garantie 7 à 9 jours",
        packaging: "Papier de soie anthracite & nœud double face doré"
      },
      care: "Les pivoines s'épanouissent à la chaleur douce. Si vous souhaitez ralentir l'ouverture, ajoutez quelques glaçons dans l'eau du vase."
    },
    {
      id: 'cap-spartel-wild',
      name: "Le Sauvage de Cap Spartel & Détroit",
      category: 'dried',
      price: 750,
      priceSort: 750,
      img: 'assets/images/cap_spartel_wild.jpg',
      tag: "Terroir du Détroit",
      tagType: 'normal',
      origin: "Lisianthus Blanc, Coton Sauvage, Lavande & Olivier",
      desc: "Composition champêtre inspirée des falaises sauvages de Cap Spartel. Branches d'olivier du Nord, coton brut, brins de lavande et lisianthus.",
      occasion: 'interieur',
      specs: {
        varieties: "Branches d'olivier sauvage du Rif, Coton brut, Lavande bleue séchée, Lisianthus blanc",
        originCountry: "Tanger & Région du Nord (Maroc)",
        dimensions: "Diamètre ~44 cm • Hauteur ~58 cm",
        freshness: "Fleurs fraîches 8 jours • Éléments séchés éternels",
        packaging: "Cordon de lin brut naturel et papier kraft satiné noir"
      },
      care: "Après fanaison des lisianthus, conservez les branches d'olivier, le coton et la lavande en bouquet sec sans eau pendant des mois."
    },
    {
      id: 'black-velvet-roses',
      name: "Boîte Chapeau Velours Noir Baccara",
      category: 'boxes',
      price: 1350,
      priceSort: 1350,
      img: 'assets/images/black_velvet_roses.jpg',
      tag: "Édition Privée Tanger",
      tagType: 'gold',
      origin: "Roses Noires Baccara & Velours Soir",
      desc: "Écrin cylindrique en velours noir nuit gaufré or, garni de roses sombres Black Baccara d'altitude au toucher de velours soyeux.",
      occasion: 'amour',
      specs: {
        varieties: "30 Roses sombres Black Baccara & Red Naomi, baies d'hypericum noir",
        originCountry: "Hautes terres d'Équateur",
        dimensions: "Boîte velours Ø 28 cm • Hauteur totale 38 cm",
        freshness: "Hydratation interne 7 à 10 jours",
        packaging: "Boîte collector en velours brodé or 'Maison L'Hmam Est. 1947'"
      },
      care: "Humidifier légèrement la mousse centrale tous les 2 jours. Ne pas exposer directement sous la climatisation."
    },
    {
      id: 'arche-celeste',
      name: "Arche Cérémonie Céleste & Trône",
      category: 'weddings',
      price: "Sur Devis",
      priceSort: 99999,
      img: 'assets/images/wedding_arch.jpg',
      tag: "Scénographie Royale",
      tagType: 'normal',
      origin: "Grand Palais & Domaines Privés de Tanger",
      desc: "Structure monumentale sur-mesure ornée de milliers de roses Avalanche, hortensias blancs et cascade végétale tombante pour mariages princiers.",
      occasion: 'mariage',
      specs: {
        varieties: "Roses Avalanche, Hortensias blancs géants, Lierre anglais, Glycines & feuillage d'argent",
        originCountry: "Sélection mondiale sur-mesure",
        dimensions: "Hauteur 2,80 m • Envergure 3,40 m (adaptable selon lieu)",
        freshness: "Installation fraîche le matin de la cérémonie avec équipe de scénographes",
        packaging: "Montage complet, démontage et livraison technique inclus partout à Tanger"
      },
      care: "Notre équipe de maîtres fleuristes assure la mise en eau, l'installation sur site et la permanence florale pendant l'événement."
    },
    {
      id: 'chemin-floral',
      name: "Chemin Floral & Plafond Végétal Suspendu",
      category: 'weddings',
      price: "Sur Devis",
      priceSort: 99998,
      img: 'assets/images/scenography_table.jpg',
      tag: "Banquets & Galas",
      tagType: 'normal',
      origin: "Banquets & Salons Privés Tanger",
      desc: "Canopée végétale aérienne suspendue et chemins de table vivants illuminés à la bougie pour banquets de prestige et dîners de gala.",
      occasion: 'mariage',
      specs: {
        varieties: "Feuillages d'eucalyptus suspendus, roses d'altitude, bougies en verreries de cristal",
        originCountry: "Atelier Tanger",
        dimensions: "Sur-mesure linéaire (de 10 à 80 mètres)",
        freshness: "Conception fraîche du jour",
        packaging: "Scénographie complète avec bougies et art de la table"
      },
      care: "Service scénographique clé en main avec supervision sur place."
    },
    {
      id: 'trone-nuptial',
      name: "Trône Nuptial & Pavillon Floral Tanger",
      category: 'weddings',
      price: "Sur Devis",
      priceSort: 99997,
      img: 'assets/images/instagram/insta_wedding_stage.jpg',
      tag: "Scène Royale Marocaine",
      tagType: 'gold',
      origin: "Salons d'Honneur & Cérémonies Marocaines",
      desc: "Scénographie nuptiale marocaine d'exception avec mur végétal royal, sofa capitonné d'apparat et dômes d'arums et d'orchidées immaculées.",
      occasion: 'mariage',
      specs: {
        varieties: "Mur dense de roses blanches, orchidées cascade, palmiers nains et arums",
        originCountry: "Atelier Haute Scénographie Tanger",
        dimensions: "Scène de 4m à 8m d'ouverture",
        freshness: "Fleurs d'exception fraîches du jour",
        packaging: "Transport spécialisé, régie lumière florale et installation express"
      },
      care: "Prestation personnalisée avec rendez-vous préalable dans notre atelier ou sur le lieu de réception."
    }
  ];

  // =========================================================================
  // 2. STATE & FILTER CONTROLLER
  // =========================================================================
  const state = {
    search: '',
    category: 'all',
    occasion: 'all',
    sort: 'featured',
    filteredProducts: [...PRODUCTS]
  };

  // DOM Elements
  const productsGrid = document.getElementById('shop-products-grid');
  const searchInput = document.getElementById('shop-search-input');
  const searchClear = document.getElementById('shop-search-clear');
  const sortSelect = document.getElementById('shop-sort-select');
  const categoryPills = document.querySelectorAll('.shop-filter-pill');
  const occasionChips = document.querySelectorAll('.occasion-chip');
  const resultsCountEl = document.getElementById('shop-results-count');
  const emptyStateEl = document.getElementById('shop-empty-state');
  const resetBtn = document.getElementById('shop-reset-filters');

  // Quick View Modal Elements
  const quickviewModal = document.getElementById('quickview-modal');
  const quickviewClose = document.getElementById('quickview-close-btn');
  const qvImg = document.getElementById('qv-img');
  const qvTag = document.getElementById('qv-tag');
  const qvOrigin = document.getElementById('qv-origin');
  const qvTitle = document.getElementById('qv-title');
  const qvPrice = document.getElementById('qv-price');
  const qvDesc = document.getElementById('qv-desc');
  const qvVarieties = document.getElementById('qv-varieties');
  const qvCountry = document.getElementById('qv-country');
  const qvDimensions = document.getElementById('qv-dimensions');
  const qvFreshness = document.getElementById('qv-freshness');
  const qvPackaging = document.getElementById('qv-packaging');
  const qvCare = document.getElementById('qv-care');
  const qvQtyValue = document.getElementById('qv-qty-value');
  const qvQtyMinus = document.getElementById('qv-qty-minus');
  const qvQtyPlus = document.getElementById('qv-qty-plus');
  const qvBtnAdd = document.getElementById('qv-btn-add');
  const qvBtnOrder = document.getElementById('qv-btn-order');

  let currentModalProduct = null;
  let modalQuantity = 1;

  // =========================================================================
  // 3. RENDER FUNCTION
  // =========================================================================
  function renderProducts() {
    if (!productsGrid) return;

    if (state.filteredProducts.length === 0) {
      productsGrid.style.display = 'none';
      if (emptyStateEl) emptyStateEl.style.display = 'block';
    } else {
      productsGrid.style.display = 'grid';
      if (emptyStateEl) emptyStateEl.style.display = 'none';

      productsGrid.innerHTML = state.filteredProducts.map(product => {
        const isQuote = product.price === 'Sur Devis';
        const displayPrice = isQuote ? 'Sur Devis' : `${product.price.toLocaleString()} MAD`;
        const tagClass = product.tagType === 'gold' ? 'product-tag product-tag-gold' : 'product-tag';
        const orderBtnText = isQuote ? 'Demande Devis' : 'Commander';

        return `
          <article class="product-card" data-id="${product.id}" data-category="${product.category}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
            <div class="product-img-wrap">
              <span class="${tagClass}">${product.tag}</span>
              <img src="${product.img}" alt="${product.name}" class="product-img" loading="lazy">
              
              <!-- Quick View Trigger Overlay -->
              <button class="btn-quick-view-overlay" data-id="${product.id}" aria-label="Aperçu rapide de ${product.name}">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
                <span>Aperçu Rapide</span>
              </button>

              <!-- Quick Add + Icon Button -->
              <button class="quick-add-btn btn-add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}" title="Ajouter directement au Panier">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg>
              </button>
            </div>

            <div class="product-body">
              <div class="product-origin">${product.origin}</div>
              <h3 class="product-title">${product.name}</h3>
              <p class="product-desc">${product.desc}</p>
              
              <div class="product-footer">
                <span class="product-price">${displayPrice}</span>
                <div class="product-actions-group">
                  <button class="btn-product-cart btn-add-to-cart" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
                    + Panier
                  </button>
                  <button class="btn-product-direct-order" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}" data-img="${product.img}">
                    ${orderBtnText}
                  </button>
                </div>
              </div>
            </div>
          </article>
        `;
      }).join('');
    }

    // Update Result Counter
    if (resultsCountEl) {
      const count = state.filteredProducts.length;
      resultsCountEl.textContent = `${count} création${count > 1 ? 's' : ''} disponible${count > 1 ? 's' : ''}`;
    }

    // Toggle Reset Button visibility
    const isFiltered = state.search !== '' || state.category !== 'all' || state.occasion !== 'all';
    if (resetBtn) {
      resetBtn.style.display = isFiltered ? 'inline-block' : 'none';
    }
  }

  // =========================================================================
  // 4. FILTERING & SORTING LOGIC
  // =========================================================================
  function applyFilters() {
    let result = [...PRODUCTS];

    // 1. Search Query
    if (state.search.trim()) {
      const q = state.search.toLowerCase().trim();
      result = result.filter(p => {
        return (
          p.name.toLowerCase().includes(q) ||
          p.desc.toLowerCase().includes(q) ||
          p.origin.toLowerCase().includes(q) ||
          p.specs.varieties.toLowerCase().includes(q)
        );
      });
    }

    // 2. Category
    if (state.category !== 'all') {
      result = result.filter(p => p.category === state.category);
    }

    // 3. Occasion
    if (state.occasion !== 'all') {
      result = result.filter(p => p.occasion === state.occasion);
    }

    // 4. Sorting
    if (state.sort === 'price-asc') {
      result.sort((a, b) => {
        if (a.price === 'Sur Devis') return 1;
        if (b.price === 'Sur Devis') return -1;
        return a.price - b.price;
      });
    } else if (state.sort === 'price-desc') {
      result.sort((a, b) => {
        if (a.price === 'Sur Devis') return 1;
        if (b.price === 'Sur Devis') return -1;
        return b.price - a.price;
      });
    } else if (state.sort === 'newest') {
      // Prioritize 2026 tags
      result.sort((a, b) => (b.tag.includes('2026') ? 1 : 0) - (a.tag.includes('2026') ? 1 : 0));
    }

    state.filteredProducts = result;
    renderProducts();
  }

  // =========================================================================
  // 5. EVENT LISTENERS: SEARCH, TABS, OCCASIONS & SORT
  // =========================================================================
  // Search Input
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.search = e.target.value;
      if (searchClear) searchClear.style.display = state.search ? 'block' : 'none';
      applyFilters();
    });
  }

  if (searchClear) {
    searchClear.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        state.search = '';
        searchClear.style.display = 'none';
        searchInput.focus();
        applyFilters();
      }
    });
  }

  // Category Filter Pills
  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.category = pill.dataset.category;
      applyFilters();
    });
  });

  // Occasion Chips
  occasionChips.forEach(chip => {
    chip.addEventListener('click', () => {
      occasionChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      state.occasion = chip.dataset.occasion;
      applyFilters();
    });
  });

  // Sort Dropdown
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      applyFilters();
    });
  }

  // Reset Filters
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state.search = '';
      state.category = 'all';
      state.occasion = 'all';
      state.sort = 'featured';

      if (searchInput) searchInput.value = '';
      if (searchClear) searchClear.style.display = 'none';
      if (sortSelect) sortSelect.value = 'featured';

      categoryPills.forEach(p => p.classList.toggle('active', p.dataset.category === 'all'));
      occasionChips.forEach(c => c.classList.toggle('active', c.dataset.occasion === 'all'));

      applyFilters();
    });
  }

  // =========================================================================
  // 6. QUICK VIEW / PRODUCT DETAIL MODAL
  // =========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !quickviewModal) return;

    currentModalProduct = product;
    modalQuantity = 1;

    // Populate Data
    if (qvImg) {
      qvImg.src = product.img;
      qvImg.alt = product.name;
    }
    if (qvTag) qvTag.textContent = product.tag;
    if (qvOrigin) qvOrigin.textContent = product.origin;
    if (qvTitle) qvTitle.textContent = product.name;
    if (qvPrice) {
      qvPrice.textContent = product.price === 'Sur Devis' ? 'Sur Devis' : `${product.price.toLocaleString()} MAD`;
    }
    if (qvDesc) qvDesc.textContent = product.desc;
    if (qvVarieties) qvVarieties.textContent = product.specs.varieties;
    if (qvCountry) qvCountry.textContent = product.specs.originCountry;
    if (qvDimensions) qvDimensions.textContent = product.specs.dimensions;
    if (qvFreshness) qvFreshness.textContent = product.specs.freshness;
    if (qvPackaging) qvPackaging.textContent = product.specs.packaging;
    if (qvCare) qvCare.textContent = product.care;

    if (qvQtyValue) qvQtyValue.textContent = modalQuantity;

    // Toggle button text if quote
    if (qvBtnOrder) {
      qvBtnOrder.textContent = product.price === 'Sur Devis' ? 'Demande de Devis sur-Mesure' : 'Commander via WhatsApp';
    }

    quickviewModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    if (!quickviewModal) return;
    quickviewModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Delegate Quick View open trigger
  document.addEventListener('click', (e) => {
    const qvTrigger = e.target.closest('.btn-quick-view-overlay');
    if (qvTrigger) {
      e.preventDefault();
      e.stopPropagation();
      openQuickView(qvTrigger.dataset.id);
    }
  });

  if (quickviewClose) quickviewClose.addEventListener('click', closeQuickView);
  if (quickviewModal) {
    quickviewModal.addEventListener('click', (e) => {
      if (e.target === quickviewModal) closeQuickView();
    });
  }

  // Keyboard Escape to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });

  // Modal Quantity Stepper
  if (qvQtyMinus) {
    qvQtyMinus.addEventListener('click', () => {
      if (modalQuantity > 1) {
        modalQuantity--;
        if (qvQtyValue) qvQtyValue.textContent = modalQuantity;
      }
    });
  }

  if (qvQtyPlus) {
    qvQtyPlus.addEventListener('click', () => {
      modalQuantity++;
      if (qvQtyValue) qvQtyValue.textContent = modalQuantity;
    });
  }

  // Modal Add to Cart
  if (qvBtnAdd) {
    qvBtnAdd.addEventListener('click', () => {
      if (!currentModalProduct) return;
      if (window.MaisonCart) {
        for (let i = 0; i < modalQuantity; i++) {
          window.MaisonCart.addToCart({
            id: currentModalProduct.id,
            name: currentModalProduct.name,
            price: currentModalProduct.price,
            img: currentModalProduct.img
          }, i === modalQuantity - 1);
        }
      }
      closeQuickView();
    });
  }

  // Modal Direct WhatsApp Order
  if (qvBtnOrder) {
    qvBtnOrder.addEventListener('click', () => {
      if (!currentModalProduct) return;
      closeQuickView();
      if (window.MaisonCart) {
        window.MaisonCart.openOrderModal({
          id: currentModalProduct.id,
          name: currentModalProduct.name,
          price: currentModalProduct.price,
          img: currentModalProduct.img,
          quantity: modalQuantity
        });
      }
    });
  }

  // =========================================================================
  // 7. URL QUERY PARAMETER HANDLING (e.g. ?category=cotton or ?q=roses)
  // =========================================================================
  const urlParams = new URLSearchParams(window.location.search);
  const initialCat = urlParams.get('category');
  const initialQuery = urlParams.get('q');

  if (initialCat) {
    const matchingPill = Array.from(categoryPills).find(p => p.dataset.category === initialCat);
    if (matchingPill) {
      categoryPills.forEach(p => p.classList.remove('active'));
      matchingPill.classList.add('active');
      state.category = initialCat;
    }
  }

  if (initialQuery) {
    state.search = initialQuery;
    if (searchInput) searchInput.value = initialQuery;
    if (searchClear) searchClear.style.display = 'block';
  }

  // Initial Render
  renderProducts();
});
