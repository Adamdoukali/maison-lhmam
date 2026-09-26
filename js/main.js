/**
 * MAISON L'HMAM FLEURISTE - HAUTE CRÉATION FLORALE TANGER
 * E-Commerce Engine: Shopping Cart Drawer, WhatsApp Order Command Dispatch,
 * Milestone Timeline, and Ambient Floating Cotton & Petals Canvas.
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. AMBIENT FLOATING COTTON PUFFS & FLORAL PETALS CANVAS
  // =========================================================================
  const canvas = document.getElementById('floral-petals-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const PARTICLES_COUNT = 32;
    const particles = [];

    // Particle types: 'cotton', 'petal', 'gold_dust'
    for (let i = 0; i < PARTICLES_COUNT; i++) {
      const typeRand = Math.random();
      let type = 'petal';
      if (typeRand < 0.35) type = 'cotton';
      else if (typeRand > 0.8) type = 'gold_dust';

      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        type: type,
        size: type === 'cotton' ? Math.random() * 8 + 6 : type === 'petal' ? Math.random() * 6 + 4 : Math.random() * 2 + 1,
        speedY: Math.random() * 0.45 + 0.2,
        speedX: Math.random() * 0.3 - 0.15,
        angle: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 0.015,
        opacity: Math.random() * 0.35 + 0.25,
        swayPhase: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.015 + 0.005
      });
    }

    let animFrameId;
    let isTabActive = true;

    document.addEventListener('visibilitychange', () => {
      isTabActive = !document.hidden;
      if (isTabActive) render();
    });

    function drawCotton(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);
      ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity * 0.85})`;
      ctx.shadowColor = 'rgba(255, 255, 255, 0.4)';
      ctx.shadowBlur = 8;

      // Draw soft cloud-like floret with 3 overlapping circles
      const r = p.size;
      ctx.beginPath();
      ctx.arc(0, -r * 0.25, r * 0.65, 0, Math.PI * 2);
      ctx.arc(-r * 0.35, r * 0.25, r * 0.55, 0, Math.PI * 2);
      ctx.arc(r * 0.35, r * 0.25, r * 0.55, 0, Math.PI * 2);
      ctx.fill();

      // Tiny natural calyx charcoal fleck in center
      ctx.fillStyle = `rgba(40, 40, 40, ${p.opacity * 0.7})`;
      ctx.beginPath();
      ctx.arc(0, r * 0.2, r * 0.18, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawPetal(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.angle);

      // Warm champagne sand & cognac brown botanical petal gradient
      const grad = ctx.createRadialGradient(0, -p.size * 0.3, p.size * 0.1, 0, 0, p.size);
      grad.addColorStop(0, `rgba(223, 202, 192, ${p.opacity * 0.95})`);
      grad.addColorStop(0.5, `rgba(178, 147, 125, ${p.opacity * 0.85})`);
      grad.addColorStop(1, `rgba(140, 98, 70, ${p.opacity * 0.8})`);

      ctx.fillStyle = grad;
      ctx.shadowColor = 'rgba(178, 147, 125, 0.4)';
      ctx.shadowBlur = 8;

      // Teardrop / organic rose petal curve
      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.75, -p.size * 0.45, p.size * 0.7, p.size * 0.55, 0, p.size);
      ctx.bezierCurveTo(-p.size * 0.7, p.size * 0.55, -p.size * 0.75, -p.size * 0.45, 0, -p.size);
      ctx.fill();

      ctx.restore();
    }

    function drawGoldDust(ctx, p) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = `rgba(203, 180, 162, ${p.opacity * 0.95})`;
      ctx.shadowColor = '#CBB4A2';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    function render() {
      if (!isTabActive) return;
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.swayPhase += p.swaySpeed;
        p.x += Math.sin(p.swayPhase) * 0.6 + p.speedX;
        p.y += p.speedY;
        p.angle += p.spin;

        if (p.type === 'cotton') {
          drawCotton(ctx, p);
        } else if (p.type === 'petal') {
          drawPetal(ctx, p);
        } else {
          drawGoldDust(ctx, p);
        }

        // Wrap around borders
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 30;
        if (p.x > width + 30) p.x = -30;
      }

      animFrameId = requestAnimationFrame(render);
    }

    render();
  }

  // =========================================================================
  // 2. STICKY HEADER & SMOOTH SCROLL
  // =========================================================================
  const header = document.querySelector('.main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // =========================================================================
  // 3. SCROLL-ANIMATED HISTORIC LANDMARKS (1947 -> 2026)
  // =========================================================================
  const landmarkCards = document.querySelectorAll('.landmark-campaign-card');
  const yearPills = document.querySelectorAll('.year-pill');
  const waypointDots = document.querySelectorAll('.timeline-waypoint-dot');

  if ('IntersectionObserver' in window && landmarkCards.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          const cardYear = entry.target.dataset.year;
          yearPills.forEach(pill => {
            if (pill.dataset.targetYear === cardYear) {
              pill.classList.add('active');
            } else {
              pill.classList.remove('active');
            }
          });

          waypointDots.forEach(dot => {
            if (dot.dataset.year === cardYear) {
              dot.classList.add('active-dot');
            } else {
              dot.classList.remove('active-dot');
            }
          });
        }
      });
    }, {
      threshold: 0.35,
      rootMargin: '-50px 0px -50px 0px'
    });

    landmarkCards.forEach(card => observer.observe(card));
  } else {
    landmarkCards.forEach(card => card.classList.add('in-view'));
  }

  function scrollToMilestone(year) {
    const targetCard = document.querySelector(`.landmark-campaign-card[data-year="${year}"]`);
    if (targetCard) {
      const headerHeight = header ? header.offsetHeight : 0;
      const targetPos = targetCard.getBoundingClientRect().top + window.pageYOffset - headerHeight - 40;
      window.scrollTo({
        top: targetPos,
        behavior: 'smooth'
      });
    }
  }

  yearPills.forEach(pill => {
    pill.addEventListener('click', () => scrollToMilestone(pill.dataset.targetYear));
  });

  waypointDots.forEach(dot => {
    dot.addEventListener('click', () => scrollToMilestone(dot.dataset.year));
  });

  // =========================================================================
  // 4. CATALOG FILTER TABS
  // =========================================================================
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      productCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // =========================================================================
  // 5. LUXURY E-COMMERCE CART ENGINE
  // =========================================================================
  let cart = [];
  try {
    const savedCart = localStorage.getItem('maison_lhmam_cart');
    if (savedCart) cart = JSON.parse(savedCart);
  } catch (err) {
    console.warn('Cart storage init error:', err);
    cart = [];
  }

  // DOM Elements
  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartFooterBtn = document.querySelector('.btn-open-cart-footer');
  const cartCloseBtn = document.getElementById('cart-close-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-drawer-overlay');
  const cartBadgeCount = document.getElementById('cart-badge-count');
  const footerCartCount = document.querySelector('.footer-cart-count');
  const sidebarCartBadge = document.querySelector('.sidebar-cart-badge');
  const cartItemCountText = document.getElementById('cart-item-count-text');
  const cartEmptyView = document.getElementById('cart-empty-view');
  const cartItemsList = document.getElementById('cart-items-list');
  const cartUpsellsWrap = document.getElementById('cart-upsells-wrap');
  const cartFooter = document.getElementById('cart-footer');
  const cartSubtotalPrice = document.getElementById('cart-subtotal-price');
  const cartTotalPrice = document.getElementById('cart-total-price');
  const upsellRibbon = document.getElementById('upsell-ribbon');
  const upsellVase = document.getElementById('upsell-vase');
  const toastEl = document.getElementById('luxury-toast');

  // Navigation Side Bar Elements
  const mobileSidebarToggle = document.getElementById('mobile-sidebar-toggle');
  const navSidebar = document.getElementById('nav-sidebar');
  const navSidebarClose = document.getElementById('nav-sidebar-close');
  const navSidebarOverlay = document.getElementById('nav-sidebar-overlay');
  const btnSidebarOpenCart = document.querySelector('.btn-sidebar-open-cart');
  const btnSidebarCloseNav = document.querySelector('.btn-sidebar-close-nav');

  function openNavSidebar() {
    if (navSidebar) navSidebar.classList.add('open');
    if (navSidebarOverlay) navSidebarOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeNavSidebar() {
    if (navSidebar) navSidebar.classList.remove('open');
    if (navSidebarOverlay) navSidebarOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileSidebarToggle) mobileSidebarToggle.addEventListener('click', openNavSidebar);
  if (navSidebarClose) navSidebarClose.addEventListener('click', closeNavSidebar);
  if (navSidebarOverlay) navSidebarOverlay.addEventListener('click', closeNavSidebar);
  if (btnSidebarCloseNav) btnSidebarCloseNav.addEventListener('click', closeNavSidebar);

  if (btnSidebarOpenCart) {
    btnSidebarOpenCart.addEventListener('click', () => {
      closeNavSidebar();
      setTimeout(openCart, 250);
    });
  }

  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', closeNavSidebar);
  });

  // Save Cart
  function saveCart() {
    try {
      localStorage.setItem('maison_lhmam_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Error saving cart:', e);
    }
  }

  // Toast Notification
  let toastTimer = null;
  function showToast(message, icon = '✦') {
    if (!toastEl) return;
    toastEl.innerHTML = `<span style="color: var(--color-rose-bright);">${icon}</span> <span>${message}</span>`;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove('show');
    }, 3200);
  }

  // Open / Close Cart Drawer
  function openCart() {
    closeNavSidebar();
    renderCart();
    cartDrawer.classList.add('open');
    cartOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('open');
    cartOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCart);
  if (cartFooterBtn) cartFooterBtn.addEventListener('click', openCart);
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  document.querySelectorAll('.btn-close-cart-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      closeCart();
    });
  });

  // Calculate totals
  function calculateCartTotals() {
    let subtotal = 0;
    let totalItems = 0;

    cart.forEach(item => {
      const priceNum = typeof item.price === 'number' ? item.price : parseInt(item.price, 10) || 0;
      subtotal += priceNum * item.quantity;
      totalItems += item.quantity;
    });

    let upsellTotal = 0;
    if (upsellRibbon && upsellRibbon.checked) upsellTotal += 50;
    if (upsellVase && upsellVase.checked) upsellTotal += 180;

    const grandTotal = subtotal + upsellTotal;
    return { subtotal, upsellTotal, grandTotal, totalItems };
  }

  // Render Cart UI
  function renderCart() {
    const { subtotal, grandTotal, totalItems } = calculateCartTotals();

    // Update Badges
    if (cartBadgeCount) {
      cartBadgeCount.textContent = totalItems;
      cartBadgeCount.classList.add('bump');
      setTimeout(() => cartBadgeCount.classList.remove('bump'), 300);
    }
    if (footerCartCount) footerCartCount.textContent = totalItems;
    if (sidebarCartBadge) sidebarCartBadge.textContent = totalItems;
    if (cartItemCountText) {
      cartItemCountText.textContent = `${totalItems} création${totalItems > 1 ? 's' : ''}`;
    }

    if (cart.length === 0) {
      if (cartEmptyView) cartEmptyView.style.display = 'block';
      if (cartItemsList) cartItemsList.style.display = 'none';
      if (cartUpsellsWrap) cartUpsellsWrap.style.display = 'none';
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    if (cartEmptyView) cartEmptyView.style.display = 'none';
    if (cartItemsList) cartItemsList.style.display = 'flex';
    if (cartUpsellsWrap) cartUpsellsWrap.style.display = 'block';
    if (cartFooter) cartFooter.style.display = 'block';

    // Populate items
    cartItemsList.innerHTML = '';
    cart.forEach(item => {
      const itemRow = document.createElement('div');
      itemRow.className = 'cart-item-row';
      const isQuote = item.price === 'Sur Devis';
      const displayPrice = isQuote ? 'Sur Devis' : `${(item.price * item.quantity).toLocaleString()} MAD`;

      itemRow.innerHTML = `
        <img src="${item.img}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-info">
          <div class="cart-item-header">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">${displayPrice}</div>
          </div>
          <div class="cart-item-controls">
            <div class="qty-stepper">
              <button class="qty-step-btn btn-qty-minus" data-id="${item.id}">-</button>
              <span class="qty-display">${item.quantity}</span>
              <button class="qty-step-btn btn-qty-plus" data-id="${item.id}">+</button>
            </div>
            <button class="btn-remove-item" data-id="${item.id}">Supprimer</button>
          </div>
        </div>
      `;
      cartItemsList.appendChild(itemRow);
    });

    // Subtotal & Total
    if (cartSubtotalPrice) cartSubtotalPrice.textContent = `${subtotal.toLocaleString()} MAD`;
    if (cartTotalPrice) cartTotalPrice.textContent = `${grandTotal.toLocaleString()} MAD`;
  }

  // Quantity and Remove Handlers
  if (cartItemsList) {
    cartItemsList.addEventListener('click', (e) => {
      const target = e.target;
      const itemId = target.dataset.id;
      if (!itemId) return;

      if (target.classList.contains('btn-qty-plus')) {
        const item = cart.find(it => it.id === itemId);
        if (item) {
          item.quantity += 1;
          saveCart();
          renderCart();
        }
      } else if (target.classList.contains('btn-qty-minus')) {
        const itemIndex = cart.findIndex(it => it.id === itemId);
        if (itemIndex > -1) {
          if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
          } else {
            cart.splice(itemIndex, 1);
          }
          saveCart();
          renderCart();
        }
      } else if (target.classList.contains('btn-remove-item')) {
        cart = cart.filter(it => it.id !== itemId);
        saveCart();
        renderCart();
        showToast('Article retiré du panier');
      }
    });
  }

  // Upsell Checkboxes recalculate totals
  [upsellRibbon, upsellVase].forEach(cb => {
    if (cb) {
      cb.addEventListener('change', () => {
        const { grandTotal } = calculateCartTotals();
        if (cartTotalPrice) cartTotalPrice.textContent = `${grandTotal.toLocaleString()} MAD`;
      });
    }
  });

  // Add To Cart Method
  function addToCart(productData, openDrawer = true) {
    const existing = cart.find(it => it.id === productData.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: productData.id,
        name: productData.name,
        price: productData.price === 'Sur Devis' ? 'Sur Devis' : parseInt(productData.price, 10),
        img: productData.img,
        quantity: 1
      });
    }

    saveCart();
    renderCart();
    showToast(`Ajouté au panier : ${productData.name}`);

    if (openDrawer) {
      setTimeout(() => openCart(), 200);
    }
  }

  // Bind Product Card Add Buttons
  document.querySelectorAll('.btn-add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const card = btn.closest('.product-card') || btn;
      const productData = {
        id: btn.dataset.id || card.dataset.id,
        name: btn.dataset.name || card.dataset.name,
        price: btn.dataset.price || card.dataset.price,
        img: btn.dataset.img || card.dataset.img
      };
      addToCart(productData, true);
    });
  });

  // Initial cart badge sync
  renderCart();

  // =========================================================================
  // 6. THE WHATSAPP COMMAND ORDER MODAL (CHECKOUT FLOW)
  // =========================================================================
  const orderModalOverlay = document.getElementById('order-modal-overlay');
  const orderModalClose = document.getElementById('order-modal-close');
  const btnProceedWhatsappOrder = document.getElementById('btn-proceed-whatsapp-order');
  const orderItemsPreview = document.getElementById('order-items-preview');
  const orderCommandForm = document.getElementById('order-command-form');

  let directOrderItem = null; // Used when ordering single item directly

  function openOrderModal(directItem = null) {
    directOrderItem = directItem;
    closeCart();

    // Populate order preview
    if (orderItemsPreview) {
      orderItemsPreview.innerHTML = '';
      const itemsToOrder = directOrderItem ? [directOrderItem] : cart;

      if (itemsToOrder.length === 0) {
        orderItemsPreview.innerHTML = '<div style="color: #FFFFFF; font-size: 0.85rem;">Aucun article sélectionné.</div>';
      } else {
        let previewSubtotal = 0;
        itemsToOrder.forEach(item => {
          const itemTotal = typeof item.price === 'number' ? item.price * item.quantity : 0;
          previewSubtotal += itemTotal;
          const displayPrice = item.price === 'Sur Devis' ? 'Sur Devis' : `${itemTotal.toLocaleString()} MAD`;
          
          const row = document.createElement('div');
          row.className = 'preview-row';
          row.innerHTML = `
            <span>${item.quantity}x ${item.name}</span>
            <span>${displayPrice}</span>
          `;
          orderItemsPreview.appendChild(row);
        });

        // Add upsells if from cart
        if (!directOrderItem) {
          if (upsellRibbon && upsellRibbon.checked) {
            previewSubtotal += 50;
            const rRow = document.createElement('div');
            rRow.className = 'preview-row';
            rRow.innerHTML = `<span>1x Ruban de Soie Brodé Maison L'Hmam</span><span>50 MAD</span>`;
            orderItemsPreview.appendChild(rRow);
          }
          if (upsellVase && upsellVase.checked) {
            previewSubtotal += 180;
            const vRow = document.createElement('div');
            vRow.className = 'preview-row';
            vRow.innerHTML = `<span>1x Vase Artisanal Beige Mat</span><span>180 MAD</span>`;
            orderItemsPreview.appendChild(vRow);
          }
        }

        const totalRow = document.createElement('div');
        totalRow.className = 'preview-row preview-total';
        totalRow.innerHTML = `
          <span>Total de la Commande :</span>
          <span>${previewSubtotal > 0 ? previewSubtotal.toLocaleString() + ' MAD' : 'Sur Devis'}</span>
        `;
        orderItemsPreview.appendChild(totalRow);
      }
    }

    if (orderModalOverlay) {
      orderModalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeOrderModal() {
    if (orderModalOverlay) {
      orderModalOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (orderModalClose) orderModalClose.addEventListener('click', closeOrderModal);
  if (orderModalOverlay) {
    orderModalOverlay.addEventListener('click', (e) => {
      if (e.target === orderModalOverlay) closeOrderModal();
    });
  }

  // Open from Cart Drawer
  if (btnProceedWhatsappOrder) {
    btnProceedWhatsappOrder.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Votre panier est vide');
        return;
      }
      openOrderModal(null);
    });
  }

  // Direct Order button on product cards ("Commander")
  document.querySelectorAll('.btn-product-direct-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productData = {
        id: btn.dataset.id,
        name: btn.dataset.name,
        price: btn.dataset.price === 'Sur Devis' ? 'Sur Devis' : parseInt(btn.dataset.price, 10),
        img: btn.dataset.img,
        quantity: 1
      };
      openOrderModal(productData);
    });
  });

  // Handle Form Submission -> Builds WhatsApp Message Command
  if (orderCommandForm) {
    orderCommandForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const clientName = document.getElementById('client-name').value.trim();
      const clientPhone = document.getElementById('client-phone').value.trim();
      const recipientName = document.getElementById('recipient-name').value.trim();
      const deliveryDate = document.getElementById('delivery-date').value.trim();
      const deliveryAddress = document.getElementById('delivery-address').value.trim();
      const cardMessage = document.getElementById('card-message').value.trim();
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || "À la livraison";

      const itemsToOrder = directOrderItem ? [directOrderItem] : cart;

      if (itemsToOrder.length === 0) {
        showToast('Veuillez sélectionner au moins un article');
        return;
      }

      // Format Items list
      let itemsSummary = '';
      let orderTotal = 0;
      let hasQuote = false;

      itemsToOrder.forEach(item => {
        if (item.price === 'Sur Devis') {
          hasQuote = true;
          itemsSummary += `• ${item.quantity}x ${item.name} (Sur Devis)\n`;
        } else {
          const itemTotal = item.price * item.quantity;
          orderTotal += itemTotal;
          itemsSummary += `• ${item.quantity}x ${item.name} (${itemTotal.toLocaleString()} MAD)\n`;
        }
      });

      if (!directOrderItem) {
        if (upsellRibbon && upsellRibbon.checked) {
          orderTotal += 50;
          itemsSummary += `• 1x Ruban de Soie Brodé Doré (+50 MAD)\n`;
        }
        if (upsellVase && upsellVase.checked) {
          orderTotal += 180;
          itemsSummary += `• 1x Vase Artisanal Céramique (+180 MAD)\n`;
        }
      }

      const totalFormatted = hasQuote && orderTotal === 0 
        ? "Sur Devis" 
        : `${orderTotal.toLocaleString()} MAD (Livraison Tanger Incluse)`;

      // Structured High-Converting WhatsApp Command Format
      const whatsappText = 
`🌿 *COMMANDE MAISON L'HMAM FLEURISTE TANGER* 🌿
━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Client :* ${clientName}
📞 *Téléphone :* ${clientPhone}
📍 *Adresse à Tanger :* ${deliveryAddress}
${recipientName ? `🎁 *Destinataire :* ${recipientName}\n` : ''}📅 *Date & Créneau Souhaité :* ${deliveryDate}

💐 *CRÉATION(S) CHOISIE(S) :*
${itemsSummary}
💌 *Carte de Vœux Manuscrite :*
${cardMessage ? `"${cardMessage}"` : "Aucun message demandé"}

💰 *TOTAL COMMANDE :* ${totalFormatted}
💳 *Mode de Paiement :* ${paymentMethod}
━━━━━━━━━━━━━━━━━━━━━━━━━━
_Envoyé depuis la boutique officielle Maison L'Hmam Tanger_`;

      const encodedMsg = encodeURIComponent(whatsappText);
      const whatsappNumber = "212600000000"; // Replace with boutique official phone number
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMsg}`;

      // Open WhatsApp
      window.open(whatsappUrl, '_blank');

      // Success feedback
      showToast('Votre commande WhatsApp a été préparée avec succès !', '✓');
      closeOrderModal();

      // Clear cart if whole cart was ordered
      if (!directOrderItem) {
        cart = [];
        saveCart();
        renderCart();
      }
    });
  }
});
