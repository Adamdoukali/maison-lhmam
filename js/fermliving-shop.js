/**
 * MAISON L'HMAM FLEURISTE — BOUTIQUE FLORALE (FERM LIVING AESTHETIC)
 * Clean white shop engine with full trilingual support (FR / EN / ES).
 * Product grid, slide-out cart drawer, sorting, quick-view modal & structured WhatsApp order command.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Determine page language
  const PAGE_LANG = (document.documentElement.lang || 'fr').toLowerCase();

  // =========================================================================
  // UI DICTIONARY (FR / EN / ES)
  // =========================================================================
  const I18N = {
    fr: {
      addToCart: "+ Ajouter au Panier",
      added: "Ajouté !",
      addedToast: "Ajouté au panier : ",
      wishlistAdded: "Ajouté à vos favoris",
      wishlistRemoved: "Retiré des favoris",
      emptyTitle: "Votre panier est vide",
      emptySub: "Explorez notre collection florale et ajoutez vos créations préférées.",
      subtotal: "Sous-total",
      remove: "Supprimer",
      creationsCount: (n) => `(${n} créations d'exception)`,
      waOrderTitle: "🌸 *NOUVELLE COMMANDE — MAISON L'HMAM FLEURISTE TANGER*",
      waClient: "Client",
      waPhone: "Téléphone / WhatsApp",
      waRecipient: "Destinataire du cadeau",
      waAddress: "Adresse de livraison à Tanger",
      waDate: "Date & Créneau souhaité",
      waPayment: "Paiement",
      waCreations: "CRÉATIONS COMMANDÉES",
      waTotal: "TOTAL DE LA COMMANDE",
      waDelivery: "Livraison à Tanger : OFFERTE LE JOUR MÊME",
      waCardMessage: "MESSAGE POUR LA CARTE CALLIGRAPHIÉE OFFERTE",
      waFooter: "Validation instantanée par nos artisans fleuristes à Tanger."
    },
    en: {
      addToCart: "+ Add to Bag",
      added: "Added!",
      addedToast: "Added to bag: ",
      wishlistAdded: "Added to your wishlist",
      wishlistRemoved: "Removed from wishlist",
      emptyTitle: "Your bag is empty",
      emptySub: "Explore our botanical collection and select your favorite creations.",
      subtotal: "Subtotal",
      remove: "Remove",
      creationsCount: (n) => `(${n} bespoke botanical creations)`,
      waOrderTitle: "🌸 *NEW ORDER — MAISON L'HMAM FLORIST TANGIER*",
      waClient: "Customer",
      waPhone: "Phone / WhatsApp",
      waRecipient: "Gift Recipient",
      waAddress: "Delivery Address in Tangier",
      waDate: "Preferred Delivery Time",
      waPayment: "Payment Method",
      waCreations: "ORDERED CREATIONS",
      waTotal: "ORDER TOTAL",
      waDelivery: "Tangier Delivery: COMPLIMENTARY SAME-DAY",
      waCardMessage: "MESSAGE FOR THE CALLIGRAPHY GIFT CARD",
      waFooter: "Instant confirmation by our master florists in Tangier."
    },
    es: {
      addToCart: "+ Añadir a la Cesta",
      added: "¡Añadido!",
      addedToast: "Añadido a la cesta: ",
      wishlistAdded: "Añadido a tus favoritos",
      wishlistRemoved: "Eliminado de tus favoritos",
      emptyTitle: "Tu cesta está vacía",
      emptySub: "Explora nuestra colección floral y elige tus creaciones favoritas.",
      subtotal: "Subtotal",
      remove: "Eliminar",
      creationsCount: (n) => `(${n} creaciones florales exclusivas)`,
      waOrderTitle: "🌸 *NUEVO PEDIDO — MAISON L'HMAM FLORISTERÍA TÁNGER*",
      waClient: "Cliente",
      waPhone: "Teléfono / WhatsApp",
      waRecipient: "Destinatario del regalo",
      waAddress: "Dirección de entrega en Tánger",
      waDate: "Fecha y franja horaria",
      waPayment: "Método de Pago",
      waCreations: "CREACIONES PEDIDAS",
      waTotal: "TOTAL DEL PEDIDO",
      waDelivery: "Entrega en Tánger: GRATUITA EL MISMO DÍA",
      waCardMessage: "MENSAJE PARA LA TARJETA CALIGRAFIADA DE REGALO",
      waFooter: "Confirmación inmediata por nuestros maestros floristas en Tánger."
    }
  };

  const t = I18N[PAGE_LANG] || I18N.fr;

  // =========================================================================
  // MULTILINGUAL PRODUCTS CATALOG (14 BOTANICAL CREATIONS)
  // =========================================================================
  const PRODUCTS = [
    {
      id: 'cotton-alabatre',
      price: 950,
      priceSort: 950,
      img: '/assets/images/cotton_roses_bouquet.jpg',
      dots: ['#ffffff', '#2a2a2a', '#8ea18d'],
      badge: { fr: "Signature 1947", en: "1947 Signature", es: "Firma 1947" },
      name: {
        fr: "Le Coton Sauvage & Roses d'Alabâtre",
        en: "Wild Cotton & Alabaster Roses",
        es: "Algodón Salvaje & Rosas de Alabastro"
      },
      origin: {
        fr: "Coton Brut Naturel • Roses Blanches d'Équateur",
        en: "Raw Natural Cotton • Ecuadorian White Roses",
        es: "Algodón Puro Natural • Rosas Blancas de Ecuador"
      },
      desc: {
        fr: "Branches de coton immaculé, roses d'altitude et eucalyptus argenté dans son vase artisanal. Une création signature iconique de la Maison.",
        en: "Pristine natural cotton stems, high-altitude roses, and silver eucalyptus in an artisanal vase. An iconic signature creation of the House.",
        es: "Ramas de algodón inmaculado, rosas de gran altitud y eucalipto plateado en florero artesanal. Una creación firma icónica de la Casa."
      },
      specs: {
        varieties: {
          fr: "25 Roses Mondial d'Équateur, Capsules de Coton Pur, Eucalyptus",
          en: "25 Mondial Ecuadorian Roses, Pure Cotton Stems, Eucalyptus",
          es: "25 Rosas Mondial de Ecuador, Cápsulas de Algodón Puro, Eucalipto"
        },
        provenance: {
          fr: "Équateur & Hollande",
          en: "Ecuador & The Netherlands",
          es: "Ecuador y Holanda"
        },
        dimensions: "Ø ~48 cm • H ~55 cm",
        freshness: {
          fr: "Garantie 8 à 12 jours (coton éternel)",
          en: "Guaranteed 8 to 12 days (everlasting cotton)",
          es: "Garantía de 8 a 12 días (algodón eterno)"
        }
      }
    },
    {
      id: 'imperial-100-roses',
      price: 1200,
      priceSort: 1200,
      img: '/assets/images/instagram/insta_roses_bouquet.jpg',
      dots: ['#9b111e', '#111111'],
      badge: { fr: "100 Roses", en: "100 Roses", es: "100 Rosas" },
      name: {
        fr: "L'Impérial 100 Roses Rouges d'Équateur",
        en: "The Imperial 100 Ecuadorian Red Roses",
        es: "El Imperial 100 Rosas Rojas de Ecuador"
      },
      origin: {
        fr: "100 Tiges Sélectionnées • Volcans d'Équateur",
        en: "100 Hand-Selected Stems • Volcanoes of Ecuador",
        es: "100 Tallos Seleccionados • Volcanes de Ecuador"
      },
      desc: {
        fr: "Somptueux dôme floral monumental de 100 roses velours rouge carmin, symbole intemporel de passion et d'élégance absolue.",
        en: "Monumental dome of 100 crimson velvet roses, a timeless tribute to passion and uncompromising luxury.",
        es: "Suntuosa cúpula floral monumental de 100 rosas terciopelo rojo carmín, símbolo de pasión y elegancia absoluta."
      },
      specs: {
        varieties: {
          fr: "100 Roses rouges Explorer / Freedom catégorie premium",
          en: "100 Explorer / Freedom Red Roses, Premium Category",
          es: "100 Rosas rojas Explorer / Freedom, Categoría Premium"
        },
        provenance: { fr: "Volcans d'Équateur", en: "High Andes of Ecuador", es: "Volcanes de Ecuador" },
        dimensions: "Ø ~60 cm • H ~65 cm",
        freshness: { fr: "Garantie 7 à 10 jours", en: "Guaranteed 7 to 10 days", es: "Garantía 7 a 10 días" }
      }
    },
    {
      id: 'david-austin',
      price: 850,
      priceSort: 850,
      img: '/assets/images/bouquet_signature.jpg',
      dots: ['#f4c2c2', '#f5e6d3', '#708238'],
      badge: { fr: "Bestseller", en: "Bestseller", es: "Más Vendido" },
      name: {
        fr: "L'Impérial David Austin & Renoncules",
        en: "Imperial David Austin & Ranunculus",
        es: "El Imperial David Austin & Ranúnculos"
      },
      origin: {
        fr: "Roses Anglaises David Austin • Parfum Sublime",
        en: "English David Austin Roses • Exquisite Scent",
        es: "Rosas Inglesas David Austin • Aroma Sublime"
      },
      desc: {
        fr: "Pétales en chou délicats aux nuances pêche et crème poudrée, feuillage de saison parfumé et boutons de renoncules pastel.",
        en: "Delicate ruffled petals with peach and powder cream hues, seasonal fragrant foliage, and pastel ranunculus buds.",
        es: "Delicados pétalos rizados en tonos melocotón y crema empolvada, follaje perfumado de temporada y ranúnculos pastel."
      },
      specs: {
        varieties: {
          fr: "Roses David Austin Juliet & Edith, Renoncules Clooni",
          en: "Juliet & Edith David Austin Roses, Clooni Ranunculus",
          es: "Rosas David Austin Juliet & Edith, Ranúnculos Clooni"
        },
        provenance: { fr: "Angleterre & Hollande", en: "England & The Netherlands", es: "Inglaterra y Holanda" },
        dimensions: "Ø ~42 cm • H ~50 cm",
        freshness: { fr: "Garantie 7 à 9 jours", en: "Guaranteed 7 to 9 days", es: "Garantía 7 a 9 días" }
      }
    },
    {
      id: 'boite-velours',
      price: 980,
      priceSort: 980,
      img: '/assets/images/luxury_box.jpg',
      dots: ['#1a1a1a', '#ffffff', '#d4af37'],
      badge: { fr: "Écrin de Velours", en: "Velvet Hatbox", es: "Sombrerera de Terciopelo" },
      name: {
        fr: "Boîte Velours Alabâtre Impériale",
        en: "Imperial Alabaster Velvet Hatbox",
        es: "Caja Sombrerera de Terciopelo Imperial"
      },
      origin: {
        fr: "Boîte Chapeau Velours Noir & Dorure à Chaud",
        en: "Black Velvet Hatbox & Gold Hot Stamping",
        es: "Sombrerera de Terciopelo Negro & Estampado Dorado"
      },
      desc: {
        fr: "Écrin rond capitonné abritant des roses blanches d'altitude et touches végétales délicates disposées sur oasis florale hydratée.",
        en: "Padded cylindrical coffer containing high-altitude white roses and botanical foliage nestled into hydrated floral oasis.",
        es: "Sombrerera redonda acolchada con rosas blancas de gran altitud y toques botánicos en oasis hidratado."
      },
      specs: {
        varieties: {
          fr: "24 Roses Avalanche, Hortensia stabilisé, Mousse végétale",
          en: "24 Avalanche Roses, Preserved Hydrangea, Botanical Moss",
          es: "24 Rosas Avalanche, Hortensia preservada, Musgo vegetal"
        },
        provenance: { fr: "Hollande & Équateur", en: "The Netherlands & Ecuador", es: "Holanda y Ecuador" },
        dimensions: "Ø 26 cm • H 32 cm",
        freshness: { fr: "Oasis hydratée 6 à 8 jours", en: "Hydrated oasis 6 to 8 days", es: "Oasis hidratado 6 a 8 días" }
      }
    },
    {
      id: 'royal-orchids',
      price: 1450,
      priceSort: 1450,
      img: '/assets/images/royal_orchids.jpg',
      dots: ['#fdfbf7', '#8a9a5b'],
      badge: { fr: "Rare Botanique", en: "Rare Botanical", es: "Botánica Rara" },
      name: {
        fr: "Cascade d'Orchidées Royales d'Asie",
        en: "Cascade of Royal Asian Orchids",
        es: "Cascada de Orquídeas Reales de Asia"
      },
      origin: {
        fr: "Phalaenopsis Grandes Tiges & Bambou Naturel",
        en: "Grand Stem Phalaenopsis & Natural Bamboo",
        es: "Phalaenopsis de Gran Tallo & Bambú Natural"
      },
      desc: {
        fr: "Orchidées blanches impériales en cascade sculpturale montées sur branches naturelles dans leur poterie d'artisan céramiste.",
        en: "Sculptural waterfall of white imperial orchids styled over natural branches in an artisan ceramic vessel.",
        es: "Cascada escultural de orquídeas blancas imperiales montadas sobre ramas naturales en vasija de cerámica artesanal."
      },
      specs: {
        varieties: {
          fr: "Phalaenopsis Grandiflora 6 à 8 hampes fleuries",
          en: "Grandiflora Phalaenopsis, 6 to 8 blooming spikes",
          es: "Phalaenopsis Grandiflora, 6 a 8 varas florecidas"
        },
        provenance: { fr: "Asie & Serres Royales", en: "Asia & Royal Greenhouses", es: "Asia & Invernaderos Reales" },
        dimensions: "H ~75 cm",
        freshness: { fr: "Floraison 4 à 8 semaines", en: "Blooms 4 to 8 weeks", es: "Floración activa 4 a 8 semanas" }
      }
    },
    {
      id: 'blush-peonies',
      price: 1100,
      priceSort: 1100,
      img: '/assets/images/blush_peonies.jpg',
      dots: ['#ffc0cb', '#fdf6e2', '#a8c3bc'],
      badge: { fr: "Saison Éphémère", en: "Seasonal Release", es: "Temporada Efímera" },
      name: {
        fr: "Élixir de Pivoines Blush & Roses Pêche",
        en: "Blush Peonies & Peach Garden Roses",
        es: "Elixir de Peonías Blush & Rosas Melocotón"
      },
      origin: {
        fr: "Pivoines Sarah Bernhardt & Roses Poudrées",
        en: "Sarah Bernhardt Peonies & Powder Garden Roses",
        es: "Peonías Sarah Bernhardt & Rosas Empolvadas"
      },
      desc: {
        fr: "Pivoines opulentes rose dragée, roses de jardin champagne et eucalyptus vaporeux liées d'un ruban de soie sauvage.",
        en: "Opulent blush pink peonies, champagne garden roses, and airy eucalyptus tied with a raw silk ribbon.",
        es: "Opulentas peonías rosa pastel, rosas de jardín champán y eucalipto vaporoso atados con lazo de seda salvaje."
      },
      specs: {
        varieties: {
          fr: "Pivoines Sarah Bernhardt, Roses Playa Blanca",
          en: "Sarah Bernhardt Peonies, Playa Blanca Garden Roses",
          es: "Peonías Sarah Bernhardt, Rosas Playa Blanca"
        },
        provenance: { fr: "France & Hollande", en: "France & The Netherlands", es: "Francia y Holanda" },
        dimensions: "Ø ~45 cm • H ~50 cm",
        freshness: { fr: "Garantie 6 à 9 jours", en: "Guaranteed 6 to 9 days", es: "Garantía 6 a 9 días" }
      }
    },
    {
      id: 'cap-spartel',
      price: 680,
      priceSort: 680,
      img: '/assets/images/cap_spartel_wild.jpg',
      dots: ['#7a9a60', '#d9c5b2', '#e8a87c'],
      badge: { fr: "Tanger Sauvage", en: "Wild Tangier", es: "Tánger Salvaje" },
      name: {
        fr: "Symphonie Botanique du Cap Spartel",
        en: "Cape Spartel Botanical Symphony",
        es: "Sinfonía Botánica de Cabo Espartel"
      },
      origin: {
        fr: "Flore Côtière Méditerranéenne & Romarin",
        en: "Mediterranean Coastal Flora & Wild Rosemary",
        es: "Flora Costera Mediterránea & Romero Silvestre"
      },
      desc: {
        fr: "Composition d'herbes aromatiques côtières, immortelles, lavande maritime et roses champêtres inspirée de la falaise sparteline.",
        en: "Coastal aromatic botanicals, sea lavender, everlasting blooms, and rustic roses inspired by the cliffs of Spartel.",
        es: "Composición de hierbas aromáticas costeras, siemprevivas, lavanda marítima y rosas campestres inspiradas en Cabo Espartel."
      },
      specs: {
        varieties: {
          fr: "Chardons bleus, Limonium, Romarin sauvage, Roses blush",
          en: "Blue thistles, Limonium, Wild rosemary, Blush roses",
          es: "Cardos azules, Limonium, Romero salvaje, Rosas blush"
        },
        provenance: { fr: "Cap Spartel & Rif", en: "Cape Spartel & Rif Mountains", es: "Cabo Espartel & Cordillera del Rif" },
        dimensions: "Ø ~40 cm • H ~45 cm",
        freshness: { fr: "Garantie 10 à 14 jours", en: "Guaranteed 10 to 14 days", es: "Garantía 10 a 14 días" }
      }
    },
    {
      id: 'black-velvet',
      price: 1350,
      priceSort: 1350,
      img: '/assets/images/black_velvet_roses.jpg',
      dots: ['#2c000e', '#0f0f10'],
      badge: { fr: "Édition Prestige", en: "Prestige Edition", es: "Edición Prestigio" },
      name: {
        fr: "Écrin Mystique Roses Noires Baccara",
        en: "Mystic Black Baccara Roses Coffer",
        es: "Cofre Místico de Rosas Negras Baccara"
      },
      origin: {
        fr: "Roses Black Baccara d'Équateur • Velours Sombre",
        en: "Black Baccara Ecuadorian Roses • Deep Velvet",
        es: "Rosas Black Baccara de Ecuador • Terciopelo Oscuro"
      },
      desc: {
        fr: "Nuances bordeaux profondes presque noires aux reflets grenat, présentées dans un coffret de velours noir satiné frappé d'or.",
        en: "Deep burgundy hues bordering on black with garnet undertones, presented in a black satin velvet box with gold stamping.",
        es: "Tonos burdeos profundos casi negros con reflejos granate, presentados en caja de terciopelo negro satinado con sello dorado."
      },
      specs: {
        varieties: {
          fr: "Roses veloutées Black Baccara d'Équateur",
          en: "Velvety Black Baccara Roses of Ecuador",
          es: "Rosas aterciopeladas Black Baccara de Ecuador"
        },
        provenance: { fr: "Andes Équatoriennes", en: "Ecuadorian Andes", es: "Andes Ecuatorianos" },
        dimensions: "Ø 24 cm • H 28 cm",
        freshness: { fr: "Garantie 7 à 10 jours", en: "Guaranteed 7 to 10 days", es: "Garantía 7 a 10 días" }
      }
    },
    {
      id: 'teddy-couture-creme',
      price: 650,
      priceSort: 650,
      img: '/assets/images/teddy_bear_couture.jpg',
      dots: ['#eed9c4', '#ffffff', '#c5a059'],
      badge: { fr: "Peluche Couture", en: "Couture Plush", es: "Peluche Couture" },
      name: {
        fr: "Grand Ourson Peluche Royal & Roses Blanches",
        en: "Grand Royal Teddy Bear & White Roses",
        es: "Gran Oso de Peluche Real & Rosas Blancas"
      },
      origin: {
        fr: "Ourson Douceur Prestige & Mini Bouquet",
        en: "Prestige Soft Teddy & Fresh Flower Posy",
        es: "Oso de Peluche Extra Suave & Ramillete Fresco"
      },
      desc: {
        fr: "Grand ourson crème soyeux paré d'un nœud en satin champagne, accompagné d'un délicat bouquet de roses blanches d'altitude.",
        en: "Silky cream teddy bear adorned with a champagne satin ribbon, paired with a delicate bouquet of Ecuadorian white roses.",
        es: "Gran oso de peluche crema sedoso adornado con lazo de satén champán, acompañado de un delicado ramillete de rosas blancas."
      },
      specs: {
        varieties: {
          fr: "Ourson peluche 45 cm + Roses blanches fraîches",
          en: "45 cm Plush Teddy + Fresh White Roses",
          es: "Peluche de 45 cm + Rosas blancas frescas"
        },
        provenance: { fr: "Atelier Maison L'Hmam", en: "Maison L'Hmam Atelier", es: "Taller Maison L'Hmam" },
        dimensions: "H ~45 cm",
        freshness: { fr: "Peluche éternelle & fleurs fraîches", en: "Everlasting plush & fresh blooms", es: "Peluche duradero & flores frescas" }
      }
    },
    {
      id: 'teddy-roses-blush',
      price: 590,
      priceSort: 590,
      img: '/assets/images/rose_teddy_bear.jpg',
      dots: ['#f7cac9', '#ffffff'],
      badge: { fr: "Roses Éternelles", en: "Everlasting Roses", es: "Rosas Eternas" },
      name: {
        fr: "L'Ourson Éternel aux Roses Blush",
        en: "The Everlasting Blush Rose Bear",
        es: "El Oso Eterno de Rosas Blush"
      },
      origin: {
        fr: "Sculpté à la Main • Écrin Transparent Doré",
        en: "Hand-Sculpted • Transparent Gold Showcase",
        es: "Esculpido a Mano • Vitrina Dorada Transparente"
      },
      desc: {
        fr: "Ourson d'artisan entièrement façonné de centaines de roses éternelles pastel dans son luxueux écrin transparent à structure or.",
        en: "Handcrafted bear sculpted from hundreds of pastel eternal roses, showcased in a luxury gold-frame transparent case.",
        es: "Oso artesanal elaborado con cientos de rosas eternas pastel en su lujosa vitrina transparente con estructura dorada."
      },
      specs: {
        varieties: {
          fr: "Centaines de mini roses douces éternelles",
          en: "Hundreds of soft everlasting mini roses",
          es: "Cientos de mini rosas eternas aterciopeladas"
        },
        provenance: { fr: "Atelier Haute Décoration", en: "Haute Botanical Atelier", es: "Taller de Alta Decoración" },
        dimensions: "30 × 30 × 40 cm",
        freshness: { fr: "Conservation éternelle sans arrosage", en: "Everlasting without watering", es: "Conservación eterna sin agua" }
      }
    },
    {
      id: 'gift-deluxe-gourmet',
      price: 780,
      priceSort: 780,
      img: '/assets/images/gift_set_deluxe.jpg',
      dots: ['#5c4033', '#e5dcc3', '#d4af37'],
      badge: { fr: "Coffret Gourmet", en: "Gourmet Hamper", es: "Cofre Gourmet" },
      name: {
        fr: "Coffret Prestige Chocolats, Bougie & Fleurs",
        en: "Prestige Chocolates, Candle & Floral Hamper",
        es: "Cofre Prestige Chocolates, Vela & Flores"
      },
      origin: {
        fr: "Chocolats d'Artisan, Bougie & Mini Fleurs",
        en: "Artisan Chocolates, Scented Candle & Blooms",
        es: "Chocolates Finos, Vela Aromática & Flores"
      },
      desc: {
        fr: "L'assortiment de dégustation et senteur : boîte de chocolats fins et macarons, bougie végétale fleur d'oranger et mini vase fleuri.",
        en: "The quintessential luxury gift: fine chocolates and macarons, orange blossom botanical candle, and seasonal posy in vase.",
        es: "El regalo perfecto: chocolates finos y macarons, vela vegetal de azahar y ramillete de flores frescas en jarrón."
      },
      specs: {
        varieties: {
          fr: "Chocolats belges, bougie cire de soja, mini bouquet",
          en: "Belgian chocolates, soy wax candle, fresh posy",
          es: "Chocolates belgas, vela cera de soja, flores frescas"
        },
        provenance: { fr: "Artisans Tanger & Paris", en: "Tangier & Paris Artisans", es: "Artesanos de Tánger y París" },
        dimensions: "35 × 25 cm",
        freshness: { fr: "Livraison gourmande scellée", en: "Sealed fresh gift hamper", es: "Entrega gourmet sellada" }
      }
    },
    {
      id: 'bouquet-blanc-douceur',
      price: 790,
      priceSort: 790,
      img: '/assets/images/white_garden_bouquet.jpg',
      dots: ['#faf0e6', '#ffffff', '#93a29b'],
      badge: { fr: "Nouveauté", en: "New Arrival", es: "Novedad" },
      name: {
        fr: "Bouquet Douceur Impériale d'Alabâtre",
        en: "Imperial Alabaster Garden Bouquet",
        es: "Ramillete Dulzura Imperial de Alabastro"
      },
      origin: {
        fr: "Roses de Jardin, Renoncules & Eucalyptus",
        en: "Garden Roses, Ranunculus & Eucalyptus",
        es: "Rosas de Jardín, Ranúnculos & Eucalipto"
      },
      desc: {
        fr: "Harmonie lumineuse de roses de jardin crème, renoncules blanches, lisianthus vaporeux et feuillage d'argent lié d'un ruban de soie.",
        en: "Luminous harmony of cream garden roses, white ranunculus, lisianthus, and silver foliage tied with a raw silk ribbon.",
        es: "Armonía luminosa de rosas de jardín crema, ranúnculos blancos, lisianthus y follaje plateado atados con lazo de seda."
      },
      specs: {
        varieties: {
          fr: "Roses Avalanche, Renoncules blanches, Eucalyptus Cinerea",
          en: "Avalanche Roses, White Ranunculus, Silver Dollar Eucalyptus",
          es: "Rosas Avalanche, Ranúnculos blancos, Eucalipto Cinerea"
        },
        provenance: { fr: "Hollande & Équateur", en: "The Netherlands & Ecuador", es: "Holanda y Ecuador" },
        dimensions: "Ø ~42 cm • H ~50 cm",
        freshness: { fr: "Garantie 7 à 10 jours", en: "Guaranteed 7 to 10 days", es: "Garantía 7 a 10 días" }
      }
    },
    {
      id: 'wedding-arch',
      price: 5500,
      priceSort: 5500,
      img: '/assets/images/wedding_arch.jpg',
      dots: ['#ffffff', '#e6d7c3', '#708238'],
      badge: { fr: "Sur-Mesure", en: "Bespoke Royal", es: "A Medida" },
      name: {
        fr: "Arche Monumentale de Cérémonie",
        en: "Monumental Ceremony Floral Arch",
        es: "Arco Monumental de Ceremonia Real"
      },
      origin: {
        fr: "Scénographie Grand Format Tanger",
        en: "Grand Scale Tangier Scenography",
        es: "Escenografía Gran Formato en Tánger"
      },
      desc: {
        fr: "Arche florale sculpturale composée de milliers de tiges fraîches pour mariages princiers, fiançailles et réceptions au bord du détroit.",
        en: "Sculptural botanical arch created from thousands of fresh stems for royal weddings, engagements, and seaside celebrations.",
        es: "Arco floral escultural compuesto de miles de tallos frescos para bodas principescas y recepciones junto al estrecho."
      },
      specs: {
        varieties: {
          fr: "Roses blanches, Hortensias, Eucalyptus, Glycine",
          en: "White Roses, Hydrangeas, Eucalyptus, Wisteria",
          es: "Rosas blancas, Hortensias, Eucalipto, Glicinas"
        },
        provenance: { fr: "Installation sur place à Tanger", en: "On-site installation in Tangier", es: "Instalación presencial en Tánger" },
        dimensions: "2.5m à 4m",
        freshness: { fr: "Mise en place le jour de l'événement", en: "Assembled fresh on event day", es: "Montaje fresco el día del evento" }
      }
    },
    {
      id: 'sceno-table',
      price: 3800,
      priceSort: 3800,
      img: '/assets/images/scenography_table.jpg',
      dots: ['#3b5323', '#c5a059', '#f4f0ea'],
      badge: { fr: "Réceptions Royales", en: "Royal Receptions", es: "Recepciones Reales" },
      name: {
        fr: "Scénographie de Table d'Honneur Végétale",
        en: "Bespoke Royal Honor Table Scenography",
        es: "Escenografía de Mesa de Honor Botánica"
      },
      origin: {
        fr: "Chemins de Table & Vases Méditerranéens",
        en: "Botanical Runners & Mediterranean Glassware",
        es: "Caminos de Mesa & Cristalería Mediterránea"
      },
      desc: {
        fr: "Décor végétal continu avec chandeliers dorés, verrerie ciselée et fleurs fraîches du matin pour sublimer vos dîners d'exception.",
        en: "Seamless botanical table centerpiece with golden candelabras, cut crystal, and morning-picked blooms for banquets.",
        es: "Decoración vegetal continua con candelabros dorados, cristalería labrada y flores frescas para cenas exclusivas."
      },
      specs: {
        varieties: {
          fr: "Feuillages nobles, Roses parfumées, Chandeliers or",
          en: "Noble foliage, fragrant garden roses, golden candelabras",
          es: "Follajes nobles, rosas perfumadas, candelabros dorados"
        },
        provenance: { fr: "Tanger & Palais du Nord", en: "Tangier & Northern Palaces", es: "Tánger & Palacios del Norte" },
        dimensions: "10 à 30 convives",
        freshness: { fr: "Installation florale fraîche", en: "Fresh botanical setup", es: "Montaje floral fresco" }
      }
    }
  ];

  // =========================================================================
  // STATE MANAGEMENT (CART & WISHLIST)
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

  const cartToggleBtn = document.getElementById('cart-toggle-btn');
  const cartNavCount = document.getElementById('cart-nav-count');

  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartDrawerClose = document.getElementById('cart-drawer-close');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSubtotalEl = document.getElementById('cart-subtotal-price');
  const btnProceedCheckout = document.getElementById('btn-proceed-checkout');

  const orderModalOverlay = document.getElementById('order-modal-overlay');
  const orderModalClose = document.getElementById('order-modal-close');
  const orderForm = document.getElementById('order-checkout-form');
  const modalItemsSummary = document.getElementById('modal-items-summary');

  const qvModalOverlay = document.getElementById('qv-modal-overlay');
  const qvModalClose = document.getElementById('qv-modal-close');

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

  function getLocalized(obj) {
    if (typeof obj === 'string') return obj;
    if (!obj) return '';
    return obj[PAGE_LANG] || obj.fr || obj.en || '';
  }

  // =========================================================================
  // RENDER PRODUCT GRID
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
      countBadge.textContent = t.creationsCount(items.length);
    }

    let html = '';

    items.forEach((p, index) => {
      const isWishlisted = wishlist.includes(p.id);
      const name = getLocalized(p.name);
      const origin = getLocalized(p.origin);
      const badge = getLocalized(p.badge);

      html += `
        <article class="ferm-card" data-id="${p.id}">
          <div class="ferm-img-box" data-action="quickview" data-id="${p.id}">
            <span class="ferm-badge-tag">${badge}</span>
            <button class="ferm-wishlist-btn ${isWishlisted ? 'active' : ''}" data-action="wishlist" data-id="${p.id}" aria-label="Favoris">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
            <img src="${p.img}" alt="${name}" class="ferm-product-img" loading="lazy">
          </div>

          <div class="ferm-variant-dots">
            ${p.dots.map(d => `<span class="ferm-dot" style="background-color: ${d};"></span>`).join('')}
          </div>

          <div class="ferm-info">
            <h3 class="ferm-title" data-action="quickview" data-id="${p.id}">${name}</h3>
            <p class="ferm-sub-origin">${origin}</p>
            <div class="ferm-price">${p.price.toLocaleString('fr-FR')} MAD</div>
          </div>

          <button class="ferm-btn-action" data-action="add-cart" data-id="${p.id}">
            ${t.addToCart}
          </button>
        </article>
      `;

      // Insert Ferm Living Editorial Quote Card after 8th item
      if (index === 7) {
        const editorialQuotes = {
          fr: {
            eyebrow: "MAISON L'HMAM • DEPUIS 1947",
            quote: "L'art floral au confluent de la Méditerranée et de l'Atlantique",
            sub: "Chaque bouquet est une composition d'artisan, assemblée à la commande le matin même à Tanger.",
            link: "Découvrir l'Histoire (1947–2026) →",
            url: "/#histoire"
          },
          en: {
            eyebrow: "MAISON L'HMAM • SINCE 1947",
            quote: "Floral artistry where the Mediterranean meets the Atlantic",
            sub: "Each bouquet is an artisan creation, hand-crafted to order every morning in Tangier.",
            link: "Explore Our Heritage (1947–2026) →",
            url: "/en/#histoire"
          },
          es: {
            eyebrow: "MAISON L'HMAM • DESDE 1947",
            quote: "El arte floral en la confluencia del Mediterráneo y el Atlántico",
            sub: "Cada creación es una obra artesanal única, elaborada a mano cada mañana en Tánger.",
            link: "Descubrir la Historia (1947–2026) →",
            url: "/es/#histoire"
          }
        };
        const eq = editorialQuotes[PAGE_LANG] || editorialQuotes.fr;

        html += `
          <div class="ferm-editorial-card">
            <span class="editorial-eyebrow">${eq.eyebrow}</span>
            <h2 class="editorial-quote">${eq.quote}</h2>
            <p class="editorial-sub">${eq.sub}</p>
            <a href="${eq.url}" class="editorial-link">${eq.link}</a>
          </div>
        `;
      }
    });

    gridContainer.innerHTML = html;
  }

  // =========================================================================
  // CART DRAWER & STATE SYNC
  // =========================================================================
  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + (Number(item.qty) || 1), 0);
    const subtotal = cart.reduce((sum, item) => sum + ((Number(item.price) || 0) * (Number(item.qty) || 1)), 0);

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
          <h3 class="cart-empty-title">${t.emptyTitle}</h3>
          <p class="cart-empty-sub">${t.emptySub}</p>
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
              <button class="cart-remove-btn" data-action="remove-item" data-id="${item.id}">${t.remove}</button>
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

    const localizedName = getLocalized(product.name);
    const existing = cart.find(item => item.id === productId);

    if (existing) {
      existing.qty = (Number(existing.qty) || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        name: localizedName,
        price: Number(product.price) || 0,
        img: product.img,
        qty: 1
      });
    }

    updateCartUI();
    openCartDrawer();
    showToast(`${t.addedToast} ${localizedName}`);
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
  // QUICK-VIEW MODAL
  // =========================================================================
  function openQuickView(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product || !qvModalOverlay) return;

    const name = getLocalized(product.name);
    const badge = getLocalized(product.badge);
    const desc = getLocalized(product.desc);
    const variety = getLocalized(product.specs.varieties);
    const provenance = getLocalized(product.specs.provenance);
    const freshness = getLocalized(product.specs.freshness);

    document.getElementById('qv-badge').textContent = badge;
    document.getElementById('qv-title').textContent = name;
    document.getElementById('qv-price').textContent = `${product.price.toLocaleString('fr-FR')} MAD`;
    document.getElementById('qv-desc').textContent = desc;
    document.getElementById('qv-img').src = product.img;
    document.getElementById('qv-img').alt = name;

    document.getElementById('qv-variety').textContent = variety;
    document.getElementById('qv-origin').textContent = provenance;
    document.getElementById('qv-dimensions').textContent = product.specs.dimensions;
    document.getElementById('qv-freshness').textContent = freshness;

    const btnAdd = document.getElementById('qv-btn-add');
    if (btnAdd) {
      btnAdd.textContent = t.addToCart;
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
  // WHATSAPP ORDER COMMAND DISPATCH
  // =========================================================================
  function openOrderModal() {
    if (cart.length === 0) {
      showToast(t.emptyTitle);
      return;
    }

    closeCartDrawer();

    if (modalItemsSummary) {
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      modalItemsSummary.innerHTML = `
        <div style="background: #faf8f5; border: 1px solid #eae8e1; border-radius: 4px; padding: 1rem; margin-bottom: 1.25rem;">
          <div style="font-size: 0.76rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #ff5401; margin-bottom: 0.5rem;">${t.waCreations} (${cart.length}) :</div>
          <ul style="list-style: none; font-size: 0.85rem; color: #141416; display: flex; flex-direction: column; gap: 0.35rem;">
            ${cart.map(i => `<li>• <strong>${i.qty}x</strong> ${i.name} — <em>${(i.price * i.qty).toLocaleString('fr-FR')} MAD</em></li>`).join('')}
          </ul>
          <div style="margin-top: 0.75rem; border-top: 1px dashed #ddd; padding-top: 0.5rem; font-weight: 700; font-size: 0.95rem; display: flex; justify-content: space-between;">
            <span>Total :</span>
            <span>${subtotal.toLocaleString('fr-FR')} MAD</span>
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
      const paymentMethod = document.querySelector('input[name="payment-method"]:checked')?.value || 'Cash / TPE';

      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

      // Build WhatsApp message in current language
      let msg = `${t.waOrderTitle}\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `👤 *${t.waClient} :* ${name}\n`;
      msg += `📞 *${t.waPhone} :* ${phone}\n`;
      if (recipient) msg += `🎁 *${t.waRecipient} :* ${recipient}\n`;
      msg += `📍 *${t.waAddress} :* ${address}\n`;
      msg += `⏰ *${t.waDate} :* ${schedule}\n`;
      msg += `💳 *${t.waPayment} :* ${paymentMethod}\n\n`;

      msg += `💐 *${t.waCreations} :*\n`;
      cart.forEach((item, idx) => {
        msg += `${idx + 1}. ${item.name}\n   Qty : ${item.qty} | ${(item.price * item.qty).toLocaleString('fr-FR')} MAD\n`;
      });
      msg += `\n💰 *${t.waTotal} :* ${subtotal.toLocaleString('fr-FR')} MAD\n`;
      msg += `🚚 *${t.waDelivery}*\n\n`;

      if (message) {
        msg += `💌 *${t.waCardMessage} :*\n"${message}"\n\n`;
      }

      msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `✨ *${t.waFooter}*`;

      const encoded = encodeURIComponent(msg);
      const whatsappNumber = "212661000000";
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encoded}`;

      window.open(whatsappUrl, '_blank');

      closeOrderModal();
      showToast(PAGE_LANG === 'es' ? "¡Pedido preparado en WhatsApp!" : PAGE_LANG === 'en' ? "Order prepared in WhatsApp!" : "Commande préparée sur WhatsApp !");

      cart = [];
      updateCartUI();
    });
  }

  // =========================================================================
  // EVENT LISTENERS
  // =========================================================================
  if (gridContainer) {
    gridContainer.addEventListener('click', (e) => {
      const btnAdd = e.target.closest('[data-action="add-cart"]');
      if (btnAdd) {
        addToCart(btnAdd.dataset.id);
        return;
      }

      const btnWishlist = e.target.closest('[data-action="wishlist"]');
      if (btnWishlist) {
        const id = btnWishlist.dataset.id;
        if (wishlist.includes(id)) {
          wishlist = wishlist.filter(item => item !== id);
          btnWishlist.classList.remove('active');
          showToast(t.wishlistRemoved);
        } else {
          wishlist.push(id);
          btnWishlist.classList.add('active');
          showToast(t.wishlistAdded);
        }
        localStorage.setItem('maison_lhmam_wishlist', JSON.stringify(wishlist));
        return;
      }

      const quickviewTarget = e.target.closest('[data-action="quickview"]');
      if (quickviewTarget) {
        openQuickView(quickviewTarget.dataset.id);
        return;
      }
    });
  }

  if (cartItemsContainer) {
    cartItemsContainer.addEventListener('click', (e) => {
      const dec = e.target.closest('[data-action="decrease-qty"]');
      if (dec) {
        const item = cart.find(i => i.id === dec.dataset.id);
        if (item) {
          item.qty -= 1;
          if (item.qty <= 0) cart = cart.filter(i => i.id !== dec.dataset.id);
          updateCartUI();
        }
        return;
      }

      const inc = e.target.closest('[data-action="increase-qty"]');
      if (inc) {
        const item = cart.find(i => i.id === inc.dataset.id);
        if (item) {
          item.qty += 1;
          updateCartUI();
        }
        return;
      }

      const rem = e.target.closest('[data-action="remove-item"]');
      if (rem) {
        cart = cart.filter(i => i.id !== rem.dataset.id);
        updateCartUI();
        return;
      }
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  if (cartToggleBtn) cartToggleBtn.addEventListener('click', openCartDrawer);
  if (cartDrawerClose) cartDrawerClose.addEventListener('click', closeCartDrawer);
  if (cartDrawerOverlay) {
    cartDrawerOverlay.addEventListener('click', (e) => {
      if (e.target === cartDrawerOverlay) closeCartDrawer();
    });
  }

  if (btnProceedCheckout) btnProceedCheckout.addEventListener('click', openOrderModal);
  if (qvModalClose) qvModalClose.addEventListener('click', closeQuickView);
  if (qvModalOverlay) {
    qvModalOverlay.addEventListener('click', (e) => {
      if (e.target === qvModalOverlay) closeQuickView();
    });
  }

  if (orderModalClose) orderModalClose.addEventListener('click', closeOrderModal);
  if (orderModalOverlay) {
    orderModalOverlay.addEventListener('click', (e) => {
      if (e.target === orderModalOverlay) closeOrderModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeOrderModal();
    }
  });

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

  renderProducts();
  updateCartUI();
});
