/**
 * Maison L'Hmam Fleuriste — GSAP ScrollTrigger Interactive Animations
 * Inspired by Duyvenvoorde.nl
 * 1. Parallax text reveal on scroll
 * 2. SVG path drawing animations tracing lines to floral elements
 * 3. Staggered blooming & continuous organic floating for rotating flowers
 */

document.addEventListener('DOMContentLoaded', () => {
  // Check GSAP and ScrollTrigger availability
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
    console.warn('GSAP or ScrollTrigger not loaded.');
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* =========================================================================
     1. HERO PARALLAX & SVG LINE DRAWING ANIMATIONS
     ========================================================================= */
  
  // Hero Video & Content Parallax
  const heroVideo = document.querySelector('.hero-video-element');
  const heroTitle = document.querySelector('.hero-display-title');
  const heroLines = document.querySelector('.hero-title-wrap');

  if (heroVideo && heroTitle) {
    gsap.to(heroVideo, {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-duyven',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });

    gsap.to(heroTitle, {
      yPercent: -25,
      opacity: 0.3,
      scale: 0.96,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-duyven',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  // Hero Right Curved SVG Line Drawing
  const heroCurvePath = document.getElementById('hero-curve-path');
  if (heroCurvePath) {
    const curveLen = heroCurvePath.getTotalLength();
    gsap.set(heroCurvePath, {
      strokeDasharray: curveLen,
      strokeDashoffset: curveLen
    });

    gsap.to(heroCurvePath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-duyven',
        start: 'top top',
        end: 'bottom 20%',
        scrub: 1
      }
    });
  }

  // Top vertical line & left horizontal line initial entrance
  const heroTopLine = document.querySelector('.hero-line-vertical-top');
  const heroLeftLine = document.querySelector('.hero-line-horizontal-left');
  if (heroTopLine && heroLeftLine) {
    gsap.from(heroTopLine, {
      scaleY: 0,
      transformOrigin: 'top center',
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.2
    });
    gsap.from(heroLeftLine, {
      scaleX: 0,
      transformOrigin: 'right center',
      duration: 1.4,
      ease: 'power3.out',
      delay: 0.4
    });
  }

  // Floating Corner Flowers in Hero (staggered entrance + floating loop)
  const heroCornerFlowers = [
    document.querySelector('.hero-float-flower-1'),
    document.querySelector('.hero-float-flower-2')
  ].filter(Boolean);

  if (heroCornerFlowers.length) {
    gsap.from(heroCornerFlowers, {
      scale: 0,
      opacity: 0,
      rotation: -45,
      duration: 1.2,
      stagger: 0.25,
      ease: 'back.out(1.8)',
      delay: 0.6
    });

    heroCornerFlowers.forEach((flower, i) => {
      gsap.to(flower, {
        y: i % 2 === 0 ? '-=22' : '+=22',
        rotation: i % 2 === 0 ? '+=14' : '-=14',
        duration: 4.5 + i,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: i * 0.5
      });
    });
  }

  /* =========================================================================
     2. SECTION 2: HANGING FLOWER SPECIMEN SVG PATH TRACING & PARALLAX TEXT
     ========================================================================= */

  const hangingPath = document.getElementById('hanging-stem-path');
  const hangingNode = document.getElementById('hanging-stem-node');
  const hangingFlower = document.getElementById('hanging-flower');

  if (hangingPath && hangingFlower) {
    const pathLen = hangingPath.getTotalLength();
    gsap.set(hangingPath, {
      strokeDasharray: pathLen,
      strokeDashoffset: pathLen
    });
    gsap.set(hangingNode, { scale: 0, transformOrigin: 'center center' });
    gsap.set(hangingFlower, { scale: 0, opacity: 0, transformOrigin: 'top center' });

    // Timeline to draw the line down to the flower and drop the flower
    const hangingTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.hanging-section',
        start: 'top 75%',
        end: 'top 20%',
        scrub: 1.2
      }
    });

    hangingTl
      .to(hangingPath, { strokeDashoffset: 0, ease: 'none' })
      .to(hangingNode, { scale: 1, duration: 0.1 }, '-=0.1')
      .to(hangingFlower, {
        scale: 1,
        opacity: 1,
        y: 0,
        ease: 'back.out(2)',
        duration: 0.3
      }, '-=0.05');

    // Continuous subtle pendulum sway once revealed
    gsap.to(hangingFlower, {
      rotation: 6,
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut',
      transformOrigin: 'top center',
      delay: 1
    });
  }

  // Parallax Text Reveal on the Editorial Statement Lines
  const revealLines = document.querySelectorAll('.reveal-line-inner');
  if (revealLines.length) {
    gsap.fromTo(revealLines, 
      { yPercent: 110, opacity: 0 },
      {
        yPercent: 0,
        opacity: 1,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.hanging-statement',
          start: 'top 80%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }

  /* =========================================================================
     3. SECTION 3: MARQUEE SCROLL SPEED PARALLAX & ROTATING FLOWER
     ========================================================================= */
  const marqueeInner = document.querySelector('.marquee-inner');
  const marqueeFlower = document.querySelector('.marquee-flower-layer');

  if (marqueeFlower) {
    // Continuous gentle float
    gsap.to(marqueeFlower, {
      y: '+=18',
      duration: 3.8,
      yoyo: true,
      repeat: -1,
      ease: 'sine.inOut'
    });

    // Parallax Rotation Scrubbed by Scroll
    gsap.to(marqueeFlower, {
      rotation: 360,
      ease: 'none',
      scrollTrigger: {
        trigger: '.marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  if (marqueeInner) {
    // Parallax velocity shift on scroll
    gsap.to(marqueeInner, {
      xPercent: -15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.marquee-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }

  /* =========================================================================
     4. SECTION 4: STORY CARDS PARALLAX & STAGGERED REVEAL
     ========================================================================= */
  const storyCards = document.querySelectorAll('.story-card');
  if (storyCards.length) {
    gsap.from(storyCards, {
      y: 60,
      opacity: 0,
      duration: 1.1,
      stagger: 0.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.story-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });

    // Subtle Parallax on Story Background Image
    const storyBgImg = document.querySelector('.story-card-bg-img');
    if (storyBgImg) {
      gsap.to(storyBgImg, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '.story-visual-card',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }
  }

  /* =========================================================================
     5. SECTION 5: MANDALA CONSTELLATION SVG RAYS TRACING & ROTATING FLOWERS
     ========================================================================= */
  const mandalaRays = document.querySelectorAll('.mandala-ray');
  const mandalaFlowers = document.querySelectorAll('.flower-orbit-item');
  const mandalaHeading = document.querySelector('.mandala-heading');

  // Parallax Text Reveal on "LIVRAISON EXPRESS 7J / 7"
  if (mandalaHeading) {
    gsap.from(mandalaHeading, {
      scale: 0.88,
      opacity: 0,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.mandala-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  // SVG Rays Drawing Outwards & Staggered Flower Bloom
  if (mandalaRays.length && mandalaFlowers.length) {
    // Prepare each ray with its path length
    mandalaRays.forEach(ray => {
      const len = ray.getTotalLength();
      gsap.set(ray, { strokeDasharray: len, strokeDashoffset: len });
    });

    // Set initial state of flowers: scaled to 0, rotated, transparent
    gsap.set(mandalaFlowers, {
      scale: 0,
      opacity: 0,
      rotation: (i) => (i % 2 === 0 ? -90 : 90),
      transformOrigin: 'center center'
    });

    // Master Timeline for Section 5
    const mandalaTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.mandala-section',
        start: 'top 65%',
        toggleActions: 'play none none reverse'
      }
    });

    // 1. Draw SVG rays outwards with stagger
    mandalaTl.to(mandalaRays, {
      strokeDashoffset: 0,
      duration: 1,
      stagger: 0.05,
      ease: 'power2.out'
    });

    // 2. Flowers bloom in with staggered elastic bounce
    mandalaTl.to(mandalaFlowers, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.1,
      stagger: {
        each: 0.07,
        from: 'random'
      },
      ease: 'back.out(1.8)'
    }, '-=0.5');

    // 3. Continuous Organic Floating & Rotating for each Flower
    mandalaFlowers.forEach((flower, idx) => {
      // Floating Sine Wave with unique offset
      const floatDist = 12 + (idx % 4) * 4;
      const floatDuration = 3.2 + (idx % 5) * 0.45;
      const rotAngle = (idx % 2 === 0 ? 1 : -1) * (10 + (idx % 3) * 5);

      gsap.to(flower, {
        y: `+=${floatDist}`,
        rotation: `+=${rotAngle}`,
        duration: floatDuration,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: idx * 0.12
      });

      // Additional Scroll-Triggered Parallax Rotation Scrub
      gsap.to(flower, {
        rotation: `+=${(idx % 2 === 0 ? 70 : -70)}`,
        ease: 'none',
        scrollTrigger: {
          trigger: '.mandala-section',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });

    // Interactive Mousemove Tilt for the Constellation
    const mandalaSection = document.querySelector('.mandala-section');
    if (mandalaSection) {
      mandalaSection.addEventListener('mousemove', (e) => {
        const rect = mandalaSection.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;

        mandalaFlowers.forEach((flower, i) => {
          const depth = (i % 3 + 1) * 16;
          gsap.to(flower, {
            x: mouseX * depth,
            y: mouseY * depth,
            duration: 0.8,
            ease: 'power1.out',
            overwrite: 'auto'
          });
        });
      });

      mandalaSection.addEventListener('mouseleave', () => {
        mandalaFlowers.forEach(flower => {
          gsap.to(flower, {
            x: 0,
            y: 0,
            duration: 1,
            ease: 'power2.out',
            overwrite: 'auto'
          });
        });
      });
    }
  }

  /* =========================================================================
     6. SECTION 6: SCÉNOGRAPHIE & IMAGES PARALLAX REVEAL
     ========================================================================= */
  const scenoCards = document.querySelectorAll('.sceno-card');
  if (scenoCards.length) {
    gsap.from(scenoCards, {
      y: 70,
      opacity: 0,
      stagger: 0.25,
      duration: 1.2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.scenography-section',
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    });

    // Parallax on scenography images
    scenoCards.forEach((card, idx) => {
      const img = card.querySelector('.sceno-img');
      if (img) {
        gsap.to(img, {
          yPercent: idx === 0 ? -12 : 12,
          ease: 'none',
          scrollTrigger: {
            trigger: card,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        });
      }
    });
  }

  /* =========================================================================
     7. SECTION 7 & 8: NUMBERS & TIMELINE STAGGERED REVEAL
     ========================================================================= */
  const statBoxes = document.querySelectorAll('.stat-item-box');
  if (statBoxes.length) {
    gsap.from(statBoxes, {
      scale: 0.92,
      opacity: 0,
      y: 30,
      stagger: 0.1,
      duration: 0.9,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: '.stats-section',
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  const timelineBoxes = document.querySelectorAll('.timeline-box');
  if (timelineBoxes.length) {
    gsap.from(timelineBoxes, {
      y: 40,
      opacity: 0,
      stagger: 0.12,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.timeline-section',
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    });
  }

  console.log('Maison L\'Hmam GSAP ScrollTrigger animations initialized successfully.');
});
