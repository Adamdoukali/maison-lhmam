/**
 * MAISON L'HMAM FLEURISTE - ATELIER SUR-MESURE & 3D CUSTOMIZER
 * Real-time bouquet configuration, pricing engine, and WhatsApp concierge integration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Customizer State
  const customizerState = {
    style: {
      id: 'haute_ronde',
      name: 'Haute Ronde Classique',
      price: 650
    },
    palette: {
      id: 'champagne',
      name: 'Champagne Royale (David Austin & Pivoines)',
      price: 200,
      themeKey: 'champagne'
    },
    foliage: {
      id: 'eucalyptus_gold',
      name: 'Eucalyptus & Touche Dorée',
      price: 100
    },
    packaging: {
      id: 'velvet_box',
      name: 'Boîte Chapeau Velours Alabâtre',
      price: 150
    },
    cardMessage: "Avec toute mon affection.",
    recipientName: "",
    deliveryDate: "",
    deliveryCity: "Tanger"
  };

  // Base Phone for WhatsApp (Maison L'Hmam Tangier)
  const WHATSAPP_PHONE = "212600000000"; // Can be adjusted anytime

  // Initialize Customizer 3D Instance
  let customizer3D = null;
  const customizerCanvas = document.getElementById('customizer-3d-canvas');
  if (customizerCanvas && typeof MaisonBouquet3D !== 'undefined') {
    customizer3D = new MaisonBouquet3D('customizer-3d-canvas', {
      initialTheme: 'champagne',
      autoRotate: true,
      cameraDist: 5.8
    });
  }

  // Update UI & Price Calculation
  function updateSummary() {
    const totalPrice = customizerState.style.price +
                       customizerState.palette.price +
                       customizerState.foliage.price +
                       customizerState.packaging.price;

    const priceDisplay = document.getElementById('customizer-total-price');
    if (priceDisplay) {
      priceDisplay.innerHTML = `${totalPrice} <span>MAD</span>`;
    }

    const summaryList = document.getElementById('customizer-selection-summary');
    if (summaryList) {
      summaryList.innerHTML = `
        <li><strong>Style :</strong> ${customizerState.style.name}</li>
        <li><strong>Nuance Florale :</strong> ${customizerState.palette.name}</li>
        <li><strong>Feuillage :</strong> ${customizerState.foliage.name}</li>
        <li><strong>Écrin :</strong> ${customizerState.packaging.name}</li>
      `;
    }
  }

  // Bind Option Selection
  function bindOptionGroup(selector, stateKey, onSelectCallback) {
    const cards = document.querySelectorAll(selector);
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const id = card.dataset.id;
        const name = card.dataset.name;
        const price = parseInt(card.dataset.price || '0', 10);
        const theme = card.dataset.theme;

        customizerState[stateKey] = { id, name, price, themeKey: theme };

        if (typeof onSelectCallback === 'function') {
          onSelectCallback(customizerState[stateKey]);
        }

        updateSummary();
      });
    });
  }

  // Bind Styles
  bindOptionGroup('.style-option-card', 'style', (val) => {
    // Modify scale or zoom
    if (customizer3D) {
      customizer3D.toggleBloom();
    }
  });

  // Bind Palettes & link to 3D Scene
  bindOptionGroup('.palette-option-card', 'palette', (val) => {
    if (customizer3D && val.themeKey) {
      customizer3D.setPalette(val.themeKey);
    }
  });

  // Bind Foliage
  bindOptionGroup('.foliage-option-card', 'foliage');

  // Bind Packaging
  bindOptionGroup('.packaging-option-card', 'packaging');

  // Bind Card Message
  const cardInput = document.getElementById('card-message-input');
  if (cardInput) {
    cardInput.addEventListener('input', (e) => {
      customizerState.cardMessage = e.target.value;
    });
  }

  // WhatsApp Order Link Generator
  const orderBtn = document.getElementById('btn-order-custom-whatsapp');
  if (orderBtn) {
    orderBtn.addEventListener('click', () => {
      const totalPrice = customizerState.style.price +
                         customizerState.palette.price +
                         customizerState.foliage.price +
                         customizerState.packaging.price;

      const messageText = 
`🌸 *COMMANDE SUR-MESURE - MAISON L'HMAM FLEURISTE* 🌸

Bonjour Maison L'Hmam,
J'ai personnalisé mon bouquet d'exception via votre Atelier 3D en ligne :

✨ *Style :* ${customizerState.style.name}
🌹 *Composition & Nuance :* ${customizerState.palette.name}
🌿 *Végétation :* ${customizerState.foliage.name}
🎀 *Écrin :* ${customizerState.packaging.name}
💌 *Message pour la carte de vœux :*
"${customizerState.cardMessage || 'Sans message'}"

💎 *Montant estimé :* ${totalPrice} MAD
📍 *Ville de livraison :* Tanger / Maroc

Merci de me confirmer la disponibilité des fleurs et l'horaire de livraison.`;

      const encoded = encodeURIComponent(messageText);
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`;
      window.open(url, '_blank');
    });
  }

  // Initialize summary
  updateSummary();
});
