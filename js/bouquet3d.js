/**
 * MAISON L'HMAM FLEURISTE - 3D LUXURY BOUQUET SIMULATION (Three.js)
 * Procedural Botanical Architecture: Ecuadorian Roses, Royal Peonies,
 * Calla Lilies, Eucalyptus greens, Silk Ribbon Wrap & Ambient Petal Physics.
 */

class MaisonBouquet3D {
  constructor(canvasId, options = {}) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) {
      console.warn(`Canvas with id "${canvasId}" not found.`);
      return;
    }

    this.options = Object.assign({
      isInteractive: true,
      autoRotate: true,
      initialTheme: 'champagne',
      initialBloom: 0.85, // 0 = tight bud, 1 = lavish full bloom
      cameraDist: 6.2,
      onReady: null
    }, options);

    this.currentTheme = this.options.initialTheme;
    this.bloomLevel = this.options.initialBloom;
    this.targetBloom = this.options.initialBloom;
    this.isBlooming = false;
    this.autoRotate = this.options.autoRotate;

    // Palettes
    this.palettes = {
      champagne: {
        name: "Champagne Royale",
        petalOuter: 0xF3E6D7,
        petalInner: 0xE8CAAB,
        petalCore: 0xD8B18A,
        ribbon: 0xC4A98E,
        stem: 0x3E4E38,
        leaf: 0x586E53,
        ambientColor: 0xF7EFE6,
        keyLight: 0xFFF7EB,
        rimLight: 0xE8BE88
      },
      blanche: {
        name: "Blanche Pureté",
        petalOuter: 0xFFFFFF,
        petalInner: 0xF8F4EB,
        petalCore: 0xEEE5D2,
        ribbon: 0xEFEAE3,
        stem: 0x43543D,
        leaf: 0x62775E,
        ambientColor: 0xF6F5F2,
        keyLight: 0xFFFFFF,
        rimLight: 0xE2ECE8
      },
      rose_velours: {
        name: "Rose Velours",
        petalOuter: 0xF3D5CE,
        petalInner: 0xE4ADA2,
        petalCore: 0xD3897B,
        ribbon: 0xDBACA1,
        stem: 0x3B4638,
        leaf: 0x566B57,
        ambientColor: 0xFCF2F0,
        keyLight: 0xFFF0EC,
        rimLight: 0xFFAFA0
      },
      noir_or: {
        name: "Noir & Or Mystique",
        petalOuter: 0x3A2B32,
        petalInner: 0x541F2B,
        petalCore: 0xD4AF37,
        ribbon: 0x221D20,
        stem: 0x2E362B,
        leaf: 0x4A5847,
        ambientColor: 0x2D2529,
        keyLight: 0xFFF2DC,
        rimLight: 0xD4AF37
      }
    };

    // Internal arrays
    this.flowers = [];
    this.foliage = [];
    this.floatingPetals = [];
    this.materials = {};

    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    this.init();
  }

  init() {
    // 1. Scene & Camera
    this.scene = new THREE.Scene();
    
    const aspect = this.canvas.clientWidth / this.canvas.clientHeight;
    this.camera = new THREE.PerspectiveCamera(38, aspect, 0.1, 100);
    this.camera.position.set(0, 1.2, this.options.cameraDist);

    // 2. Renderer
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 3. OrbitControls
    if (typeof THREE.OrbitControls !== 'undefined') {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.enablePan = false;
      this.controls.minDistance = 3.5;
      this.controls.maxDistance = 9.5;
      this.controls.maxPolarAngle = Math.PI / 1.75;
      this.controls.minPolarAngle = Math.PI / 6;
      this.controls.target.set(0, 0.4, 0);
    }

    // 4. Lights
    this.setupLighting();

    // 5. Materials
    this.initMaterials();

    // 6. Build 3D Bouquet Model
    this.bouquetGroup = new THREE.Group();
    this.scene.add(this.bouquetGroup);
    this.buildBouquet();

    // 7. Ambient Floating Petals
    this.buildFloatingPetals();

    // 8. Event Listeners
    window.addEventListener('resize', this.onResize.bind(this));
    this.canvas.addEventListener('mousemove', this.onMouseMove.bind(this));

    // 9. Start Loop
    this.clock = new THREE.Clock();
    this.animate();

    if (typeof this.options.onReady === 'function') {
      this.options.onReady(this);
    }
  }

  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0xFFF6ED, 0.95);
    this.scene.add(this.ambientLight);

    // Key Light (warm studio chandelier)
    this.keyLight = new THREE.DirectionalLight(0xFFF7EB, 1.8);
    this.keyLight.position.set(4, 7, 5);
    this.keyLight.castShadow = true;
    this.keyLight.shadow.mapSize.width = 1024;
    this.keyLight.shadow.mapSize.height = 1024;
    this.keyLight.shadow.bias = -0.001;
    this.scene.add(this.keyLight);

    // Fill Light (subtle soft bounce)
    this.fillLight = new THREE.DirectionalLight(0xD8C2B0, 0.85);
    this.fillLight.position.set(-5, 3, -2);
    this.scene.add(this.fillLight);

    // Rim / Back Light (dramatic glowing golden halo around petals for dark background)
    this.rimLight = new THREE.PointLight(0xF5D79B, 3.2, 16);
    this.rimLight.position.set(0, 3, -3.5);
    this.scene.add(this.rimLight);

    // Subtle ground bounce
    this.groundLight = new THREE.HemisphereLight(0xFDF8F3, 0x1A1614, 0.5);
    this.scene.add(this.groundLight);
  }

  initMaterials() {
    const pal = this.palettes[this.currentTheme];

    // High quality velvety physical materials
    this.materials.petalOuter = new THREE.MeshStandardMaterial({
      color: pal.petalOuter,
      roughness: 0.55,
      metalness: 0.05,
      side: THREE.DoubleSide
    });

    this.materials.petalInner = new THREE.MeshStandardMaterial({
      color: pal.petalInner,
      roughness: 0.45,
      metalness: 0.08,
      side: THREE.DoubleSide
    });

    this.materials.petalCore = new THREE.MeshStandardMaterial({
      color: pal.petalCore,
      roughness: 0.35,
      metalness: 0.15,
      side: THREE.DoubleSide
    });

    this.materials.stem = new THREE.MeshStandardMaterial({
      color: pal.stem,
      roughness: 0.65,
      metalness: 0.02
    });

    this.materials.leaf = new THREE.MeshStandardMaterial({
      color: pal.leaf,
      roughness: 0.4,
      metalness: 0.04,
      side: THREE.DoubleSide
    });

    this.materials.ribbon = new THREE.MeshStandardMaterial({
      color: pal.ribbon,
      roughness: 0.28,
      metalness: 0.3,
      side: THREE.DoubleSide
    });

    this.materials.goldAccent = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      roughness: 0.22,
      metalness: 0.85
    });

    this.materials.stamen = new THREE.MeshStandardMaterial({
      color: 0xDFBA73,
      roughness: 0.3,
      metalness: 0.4
    });
  }

  /* ----------------------------------------------------
     BOTANICAL PROCEDURAL GENERATION
     ---------------------------------------------------- */

  // Helper to create a realistic curved organic petal mesh
  createPetalGeometry(width = 0.55, height = 0.75, curvature = 0.25) {
    const geom = new THREE.PlaneGeometry(width, height, 8, 8);
    const pos = geom.attributes.position;

    // Cup the petal: curve edges up and inward, taper top
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Normalized vertical height from base (-0.5 to +0.5)
      const ny = (y / height) + 0.5;
      
      // Curvature depth (Z-displacement creates spoon cup)
      const zCurv = Math.sin(ny * Math.PI) * curvature * (1 - Math.abs(x / width));
      // Rim ruffle wave
      const ruffle = Math.sin(x * 12) * 0.025 * ny;
      
      pos.setZ(i, zCurv + ruffle);

      // Taper at base and round top
      const taper = Math.sin(ny * Math.PI * 0.85) + 0.15;
      pos.setX(i, x * taper);
    }
    geom.computeVertexNormals();
    return geom;
  }

  // Create an Ecuadorian Garden Rose / Royal Peony
  createRose(scale = 1.0, isPeony = false) {
    const flowerGroup = new THREE.Group();
    flowerGroup.scale.set(scale, scale, scale);

    const petalLayers = [];
    const layersCount = isPeony ? 5 : 4;
    const baseWhorls = isPeony ? [4, 6, 8, 10, 12] : [3, 5, 7, 9];

    // Flower Stem & Calyx
    const calyxGeom = new THREE.ConeGeometry(0.22, 0.3, 5);
    const calyx = new THREE.Mesh(calyxGeom, this.materials.stem);
    calyx.position.y = -0.15;
    calyx.rotation.x = Math.PI;
    flowerGroup.add(calyx);

    // Stamen center
    const stamenCluster = new THREE.Group();
    const stamenGeom = new THREE.CylinderGeometry(0.01, 0.01, 0.12, 4);
    const tipGeom = new THREE.SphereGeometry(0.022, 4, 4);
    
    for (let s = 0; s < 18; s++) {
      const stamen = new THREE.Group();
      const stemM = new THREE.Mesh(stamenGeom, this.materials.stamen);
      const tipM = new THREE.Mesh(tipGeom, this.materials.petalCore);
      tipM.position.y = 0.06;
      stamen.add(stemM);
      stamen.add(tipM);
      
      const rad = Math.random() * 0.08;
      const ang = Math.random() * Math.PI * 2;
      stamen.position.set(Math.cos(ang) * rad, 0.05, Math.sin(ang) * rad);
      stamen.rotation.x = (Math.random() - 0.5) * 0.4;
      stamen.rotation.z = (Math.random() - 0.5) * 0.4;
      stamenCluster.add(stamen);
    }
    flowerGroup.add(stamenCluster);

    // Build Petal Whorls from inside out
    baseWhorls.forEach((count, layerIndex) => {
      const radius = 0.08 + (layerIndex * 0.11);
      const petalW = 0.35 + (layerIndex * 0.12);
      const petalH = 0.45 + (layerIndex * 0.14);
      const curv = 0.38 - (layerIndex * 0.05);

      const petalGeom = this.createPetalGeometry(petalW, petalH, curv);

      let mat = this.materials.petalCore;
      if (layerIndex === 1 || layerIndex === 2) mat = this.materials.petalInner;
      if (layerIndex >= 3) mat = this.materials.petalOuter;

      for (let p = 0; p < count; p++) {
        const angle = (p / count) * Math.PI * 2 + (layerIndex * 0.65);
        const petalMesh = new THREE.Mesh(petalGeom, mat);
        petalMesh.castShadow = true;
        petalMesh.receiveShadow = true;

        // Position on whorl ring
        petalMesh.position.x = Math.cos(angle) * radius;
        petalMesh.position.z = Math.sin(angle) * radius;
        petalMesh.position.y = 0.05 + (layerIndex * 0.04);

        // Rotation: face outward with tilt
        petalMesh.rotation.y = -angle - Math.PI / 2;
        
        // Base tilt
        const baseTilt = 0.2 + (layerIndex * 0.18);
        petalMesh.rotation.x = baseTilt;

        // Save initial and bloom transforms
        petalLayers.push({
          mesh: petalMesh,
          baseTilt: baseTilt,
          bloomTilt: baseTilt + 0.48 + (layerIndex * 0.08),
          baseScale: 0.75,
          bloomScale: 1.05 + (layerIndex * 0.06),
          layer: layerIndex
        });

        flowerGroup.add(petalMesh);
      }
    });

    return {
      group: flowerGroup,
      petalLayers: petalLayers,
      type: isPeony ? 'peony' : 'rose'
    };
  }

  // Create White Hydrangea Floret Mounds
  createHydrangeaCluster(scale = 0.8) {
    const cluster = new THREE.Group();
    cluster.scale.set(scale, scale, scale);

    const floretGeom = new THREE.PlaneGeometry(0.12, 0.12);
    const count = 35;
    const sphereRadius = 0.45;

    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = sphereRadius * Math.sin(phi) * Math.cos(theta);
      const y = sphereRadius * Math.abs(Math.sin(phi) * Math.sin(theta)) * 0.65 + 0.1;
      const z = sphereRadius * Math.cos(phi);

      const floret = new THREE.Group();
      floret.position.set(x, y, z);
      floret.lookAt(x * 2, y * 2, z * 2);

      // 4 tiny petals for hydrangea floret
      for (let p = 0; p < 4; p++) {
        const pMesh = new THREE.Mesh(floretGeom, this.materials.petalOuter);
        pMesh.rotation.z = (p * Math.PI) / 2;
        floret.add(pMesh);
      }

      cluster.add(floret);
    }

    return cluster;
  }

  // Create Silver Dollar Eucalyptus Branch
  createEucalyptusBranch(length = 2.2, leafCount = 12) {
    const branch = new THREE.Group();
    
    // Curved branch stem
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.15, length * 0.4, 0.05),
      new THREE.Vector3(0.35, length * 0.75, 0.2),
      new THREE.Vector3(0.45, length, 0.35)
    ]);
    const stemGeom = new THREE.TubeGeometry(curve, 16, 0.022, 6, false);
    const stemMesh = new THREE.Mesh(stemGeom, this.materials.stem);
    branch.add(stemMesh);

    // Circular eucalyptus leaves along curve
    const leafGeom = new THREE.CircleGeometry(0.18, 12);
    for (let i = 1; i <= leafCount; i++) {
      const t = i / (leafCount + 1);
      const pt = curve.getPoint(t);
      const tangent = curve.getTangent(t);

      const leafL = new THREE.Mesh(leafGeom, this.materials.leaf);
      leafL.position.copy(pt);
      leafL.position.x += 0.05;
      leafL.scale.set(1, 0.85, 1);
      leafL.rotation.y = Math.PI / 3;
      leafL.rotation.z = (Math.random() - 0.5) * 0.6;
      branch.add(leafL);

      const leafR = new THREE.Mesh(leafGeom, this.materials.leaf);
      leafR.position.copy(pt);
      leafR.position.x -= 0.05;
      leafR.scale.set(0.9, 0.8, 1);
      leafR.rotation.y = -Math.PI / 3;
      leafR.rotation.z = (Math.random() - 0.5) * 0.6;
      branch.add(leafR);
    }

    return branch;
  }

  // Create Silk Ribbon Wrap & Cascading Bow Tails
  createRibbonWrap() {
    const ribbonGroup = new THREE.Group();

    // Central wrap band
    const bandGeom = new THREE.CylinderGeometry(0.38, 0.34, 0.85, 24, 1, true);
    const band = new THREE.Mesh(bandGeom, this.materials.ribbon);
    band.position.y = -0.55;
    ribbonGroup.add(band);

    // Luxury Bow knot
    const knotGeom = new THREE.SphereGeometry(0.16, 12, 12);
    knotGeom.scale(1.2, 0.9, 0.8);
    const knot = new THREE.Mesh(knotGeom, this.materials.ribbon);
    knot.position.set(0, -0.45, 0.4);
    ribbonGroup.add(knot);

    // Bow Loops (Left & Right)
    const loopGeom = new THREE.TorusGeometry(0.24, 0.07, 12, 24, Math.PI * 1.6);
    const loopL = new THREE.Mesh(loopGeom, this.materials.ribbon);
    loopL.position.set(-0.25, -0.4, 0.42);
    loopL.rotation.set(0.2, 0.4, 0.8);
    ribbonGroup.add(loopL);

    const loopR = new THREE.Mesh(loopGeom, this.materials.ribbon);
    loopR.position.set(0.25, -0.4, 0.42);
    loopR.rotation.set(0.2, -0.4, -0.8);
    ribbonGroup.add(loopR);

    // Flowing Draped Silk Tails
    const createTail = (startX, curveOffset) => {
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(startX, -0.5, 0.4),
        new THREE.Vector3(startX * 1.4, -1.1, 0.42 + curveOffset),
        new THREE.Vector3(startX * 0.8, -1.8, 0.35),
        new THREE.Vector3(startX * 1.2, -2.5, 0.28)
      ]);
      const geom = new THREE.TubeGeometry(curve, 24, 0.065, 8, false);
      return new THREE.Mesh(geom, this.materials.ribbon);
    };

    const tail1 = createTail(-0.12, 0.05);
    const tail2 = createTail(0.14, -0.04);
    ribbonGroup.add(tail1);
    ribbonGroup.add(tail2);

    return ribbonGroup;
  }

  // Create Stem Cluster Handle
  createStemsBundle(count = 16) {
    const bundle = new THREE.Group();
    const stemGeom = new THREE.CylinderGeometry(0.045, 0.04, 2.2, 8);

    for (let i = 0; i < count; i++) {
      const stem = new THREE.Mesh(stemGeom, this.materials.stem);
      const angle = (i / count) * Math.PI * 2;
      const radius = 0.16 + (Math.random() * 0.08);

      stem.position.set(Math.cos(angle) * radius, -0.85, Math.sin(angle) * radius);
      stem.rotation.z = (Math.random() - 0.5) * 0.12;
      stem.rotation.x = (Math.random() - 0.5) * 0.12;
      bundle.add(stem);
    }
    return bundle;
  }

  /* ----------------------------------------------------
     ASSEMBLE COMPLETE LUXURY BOUQUET
     ---------------------------------------------------- */
  buildBouquet() {
    this.flowers = [];

    // 1. Stems and Ribbon Handle
    const stems = this.createStemsBundle(18);
    this.bouquetGroup.add(stems);

    this.ribbon = this.createRibbonWrap();
    this.bouquetGroup.add(this.ribbon);

    // 2. Crown Centerpiece: Giant Royal Peony
    const centerPeony = this.createRose(1.25, true);
    centerPeony.group.position.set(0, 0.95, 0.1);
    centerPeony.group.rotation.set(0.15, 0, 0);
    this.bouquetGroup.add(centerPeony.group);
    this.flowers.push(centerPeony);

    // 3. Surrounding Ring 1: 5 Ecuadorian Garden Roses
    const ring1Radius = 0.72;
    for (let i = 0; i < 5; i++) {
      const angle = (i / 5) * Math.PI * 2 + 0.3;
      const rose = this.createRose(1.05, i % 2 === 0);
      
      const x = Math.cos(angle) * ring1Radius;
      const z = Math.sin(angle) * ring1Radius;
      const y = 0.75 - (Math.random() * 0.08);

      rose.group.position.set(x, y, z);
      
      // Orient rose outward with natural dome tilt
      rose.group.lookAt(x * 2.2, y + 1.2, z * 2.2);
      
      this.bouquetGroup.add(rose.group);
      this.flowers.push(rose);
    }

    // 4. Outer Ring 2: 7 Accent Roses & Hydrangea florets
    const ring2Radius = 1.35;
    for (let j = 0; j < 7; j++) {
      const angle = (j / 7) * Math.PI * 2 + 0.6;
      const isHydrangea = (j % 3 === 0);

      const x = Math.cos(angle) * ring2Radius;
      const z = Math.sin(angle) * ring2Radius;
      const y = 0.38 - (Math.random() * 0.12);

      if (isHydrangea) {
        const hyd = this.createHydrangeaCluster(0.9);
        hyd.position.set(x, y, z);
        hyd.lookAt(x * 2, y + 0.8, z * 2);
        this.bouquetGroup.add(hyd);
      } else {
        const rose = this.createRose(0.92, false);
        rose.group.position.set(x, y, z);
        rose.group.lookAt(x * 2.5, y + 0.9, z * 2.5);
        this.bouquetGroup.add(rose.group);
        this.flowers.push(rose);
      }
    }

    // 5. Eucalyptus Foliage sprigs branching out
    for (let e = 0; e < 5; e++) {
      const angle = (e / 5) * Math.PI * 2 + 0.2;
      const euca = this.createEucalyptusBranch(1.8, 8);
      euca.position.set(Math.cos(angle) * 0.6, 0.1, Math.sin(angle) * 0.6);
      euca.rotation.set(0.6, angle, -0.4);
      this.bouquetGroup.add(euca);
    }

    // Position whole bouquet slightly lower so center of mass is balanced
    this.bouquetGroup.position.set(0, -0.2, 0);

    // Apply initial bloom level
    this.updateBloom(this.bloomLevel);
  }

  /* ----------------------------------------------------
     FLOATING PETALS PARTICLE SIMULATION
     ---------------------------------------------------- */
  buildFloatingPetals(count = 35) {
    const petalGeom = this.createPetalGeometry(0.28, 0.38, 0.3);

    for (let i = 0; i < count; i++) {
      const mesh = new THREE.Mesh(petalGeom, this.materials.petalOuter);
      
      mesh.position.set(
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 + 1.5,
        (Math.random() - 0.5) * 6
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      mesh.userData = {
        speedY: 0.006 + Math.random() * 0.012,
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        rotSpeedZ: (Math.random() - 0.5) * 0.02,
        wobbleSpeed: 1 + Math.random() * 2,
        wobbleOffset: Math.random() * Math.PI * 2
      };

      this.scene.add(mesh);
      this.floatingPetals.push(mesh);
    }
  }

  /* ----------------------------------------------------
     INTERACTIONS & CUSTOMIZATION
     ---------------------------------------------------- */

  // Switch Color Palette dynamically
  setPalette(themeKey) {
    if (!this.palettes[themeKey]) return;
    this.currentTheme = themeKey;
    const pal = this.palettes[themeKey];

    // Smoothly transition material colors
    this.materials.petalOuter.color.setHex(pal.petalOuter);
    this.materials.petalInner.color.setHex(pal.petalInner);
    this.materials.petalCore.color.setHex(pal.petalCore);
    this.materials.ribbon.color.setHex(pal.ribbon);
    this.materials.stem.color.setHex(pal.stem);
    this.materials.leaf.color.setHex(pal.leaf);

    this.ambientLight.color.setHex(pal.ambientColor);
    this.keyLight.color.setHex(pal.keyLight);
    this.rimLight.color.setHex(pal.rimLight);
  }

  // Toggle or Set Bloom state (0.0 to 1.0)
  setBloom(level) {
    this.targetBloom = Math.max(0, Math.min(1, level));
  }

  toggleBloom() {
    this.targetBloom = this.targetBloom > 0.5 ? 0.15 : 0.95;
  }

  // Update Petal transforms according to bloom level
  updateBloom(progress) {
    this.flowers.forEach(flower => {
      flower.petalLayers.forEach(layer => {
        // Interpolate tilt and scale
        const currentTilt = THREE.MathUtils.lerp(layer.baseTilt, layer.bloomTilt, progress);
        const currentScale = THREE.MathUtils.lerp(layer.baseScale, layer.bloomScale, progress);

        layer.mesh.rotation.x = currentTilt;
        layer.mesh.scale.set(currentScale, currentScale, currentScale);
      });
    });
  }

  // Lighting Ambiance presets
  setLightingPreset(mode) {
    switch (mode) {
      case 'golden_hour':
        this.keyLight.color.setHex(0xFFA259);
        this.keyLight.intensity = 2.0;
        this.rimLight.color.setHex(0xFF6B35);
        this.rimLight.intensity = 2.4;
        this.ambientLight.color.setHex(0x5A3525);
        this.ambientLight.intensity = 0.9;
        this.renderer.toneMappingExposure = 1.25;
        break;
      case 'candlelight':
        this.keyLight.color.setHex(0xFFB066);
        this.keyLight.intensity = 1.4;
        this.rimLight.color.setHex(0xFF8000);
        this.rimLight.intensity = 2.6;
        this.ambientLight.color.setHex(0x281B15);
        this.ambientLight.intensity = 0.7;
        this.renderer.toneMappingExposure = 1.05;
        break;
      case 'studio':
      default:
        const pal = this.palettes[this.currentTheme];
        this.keyLight.color.setHex(pal.keyLight);
        this.keyLight.intensity = 1.6;
        this.rimLight.color.setHex(pal.rimLight);
        this.rimLight.intensity = 1.8;
        this.ambientLight.color.setHex(pal.ambientColor);
        this.ambientLight.intensity = 1.2;
        this.renderer.toneMappingExposure = 1.15;
        break;
    }
  }

  onMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
  }

  onResize() {
    if (!this.canvas) return;
    const width = this.canvas.clientWidth;
    const height = this.canvas.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  /* ----------------------------------------------------
     ANIMATION LOOP
     ---------------------------------------------------- */
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // 1. Smooth bloom level interpolation
    if (Math.abs(this.bloomLevel - this.targetBloom) > 0.001) {
      this.bloomLevel = THREE.MathUtils.lerp(this.bloomLevel, this.targetBloom, delta * 3.5);
      this.updateBloom(this.bloomLevel);
    }

    // 2. Mouse follow easing
    this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
    this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

    // 3. Bouquet gentle breathing and auto-rotation
    if (this.bouquetGroup) {
      if (this.autoRotate && (!this.controls || !this.controls.state || this.controls.state === -1)) {
        this.bouquetGroup.rotation.y += delta * 0.28;
      }
      // Organic vertical breathing
      this.bouquetGroup.position.y = -0.2 + Math.sin(elapsedTime * 1.4) * 0.04;
      // Gentle reaction to cursor tilt
      this.bouquetGroup.rotation.x = this.mouse.y * 0.12;
      this.bouquetGroup.rotation.z = -this.mouse.x * 0.08;
    }

    // 4. Animate Ambient Floating Petals
    this.floatingPetals.forEach(petal => {
      const u = petal.userData;
      petal.position.y -= u.speedY;
      petal.position.x += Math.sin(elapsedTime * u.wobbleSpeed + u.wobbleOffset) * 0.004;

      petal.rotation.x += u.rotSpeedX;
      petal.rotation.y += u.rotSpeedY;
      petal.rotation.z += u.rotSpeedZ;

      // Wrap around when falling below viewport
      if (petal.position.y < -3.5) {
        petal.position.y = 4.5;
        petal.position.x = (Math.random() - 0.5) * 8;
        petal.position.z = (Math.random() - 0.5) * 6;
      }
    });

    // 5. Controls update
    if (this.controls) {
      this.controls.update();
    }

    // 6. Render
    this.renderer.render(this.scene, this.camera);
  }
}

// Attach globally for browser usage
window.MaisonBouquet3D = MaisonBouquet3D;
