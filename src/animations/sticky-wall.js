import { gsap } from 'src/index.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger-Plugin registrieren
gsap.registerPlugin(ScrollTrigger);

function initStickyWallAnimations() {
  // Alle relevanten Elemente selektieren
  const scrollContainer = document.querySelector('.sticky-wall_scroll-container');
  const scrollWindow = document.querySelector('.sticky-wall_scroll-window');
  const imageWraps = document.querySelectorAll('.sticky-wall_image-wrap');

  // Sicherstellen, dass die Elemente vorhanden sind
  if (!scrollContainer || !scrollWindow || imageWraps.length === 0) {
    return; // Falls ein Element fehlt, die Funktion beenden
  }

  // Initial nur das erste Element sichtbar machen
  gsap.set(imageWraps, { autoAlpha: 0, left: '4rem' });
  gsap.set('.sticky-wall_image-wrap.is-1', { autoAlpha: 1, left: '0rem' });

  // Alle sticky-wall_arrow-and-text Elemente initial unsichtbar machen
  gsap.set('.sticky-wall_arrow-and-text', { autoAlpha: 0 });

  // Animation für jedes Bild und das dazugehörige Arrow-Element definieren
  imageWraps.forEach((image, index) => {
    const startPercent = 15 * index; // Nach jeweils 15% Scrolltiefe erscheinen die Elemente
    const endPercent = startPercent + 15; // Die Animation dauert 15% Scrolltiefe

    const arrowAndText = image.querySelector('.sticky-wall_arrow-and-text'); // Zugehöriges Arrow-Element
    const stickyImage = image.querySelector('.sticky-wall_image'); // Innerhalb des image-wrap befindliches Bild

    // ScrollTrigger für das Image-wrap (außer für das erste, das nicht beim Hochscrollen ausgeblendet wird)
    ScrollTrigger.create({
      trigger: scrollContainer, // Scrolltiefe bezieht sich auf den Scroll-Container
      start: `${startPercent}% top`,
      end: `${endPercent}% top`,
      scrub: true,
      onEnter: () =>
        gsap.to(image, {
          autoAlpha: 1,
          left: '0rem',
          duration: 0.5, // Etwas langsamer für eine smoothere Animation
          ease: 'power2.out',
          force3D: true,
        }),
      // Nur für andere image-wraps als das erste: Beim Hochscrollen ausblenden
      onLeaveBack: () => {
        if (index !== 0) {
          gsap.to(image, {
            autoAlpha: 0,
            left: '4rem',
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          });
        }
      },
    });

    // ScrollTrigger für das Arrow-Element (falls vorhanden)
    if (arrowAndText) {
      // Arrow erscheint 5% nach dem Start des zugehörigen Image-wrap
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: `${startPercent + 5}% top`, // 5% nach dem Startpunkt des Image-wrap
        end: `${startPercent + 13}% top`, // 13% bevor das nächste Image-wrap erscheint
        scrub: true,
        onEnter: () =>
          gsap.to(arrowAndText, {
            autoAlpha: 1,
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          }),
        // Arrow verschwindet beim Hochscrollen, auch beim ersten Element
        onLeaveBack: () =>
          gsap.to(arrowAndText, {
            autoAlpha: 0,
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          }),
      });

      // Arrow-Element auf 50% Opacity reduzieren, bevor das nächste Image-wrap erscheint (außer beim letzten Element)
      if (index < imageWraps.length - 1) {
        ScrollTrigger.create({
          trigger: scrollContainer,
          start: `${startPercent + 13}% top`, // 2% bevor das nächste Image-wrap erscheint
          end: `${startPercent + 15}% top`, // Bei 15% erscheint das nächste Element
          scrub: true,
          onEnter: () =>
            gsap.to(arrowAndText, {
              autoAlpha: 0.5, // Auf 50% Opacity reduzieren
              duration: 0.5,
              ease: 'power2.out',
            }),
          onLeaveBack: () =>
            gsap.to(arrowAndText, {
              autoAlpha: 1, // Beim Hochscrollen wieder auf 100% setzen
              duration: 0.5,
              ease: 'power2.out',
            }),
        });
      }
    }

    // Animation für das sticky-wall_image
    if (stickyImage && index < imageWraps.length - 1) {
      // Das aktuelle sticky-wall_image auf Opacity 0 animieren, wenn das nächste Image-wrap erscheint
      ScrollTrigger.create({
        trigger: scrollContainer,
        start: `${endPercent}% top`, // Wenn das nächste Image-wrap erscheint
        end: `${endPercent + 5}% top`, // Kleine Spanne für die Animation
        scrub: true,
        onEnter: () =>
          gsap.to(stickyImage, {
            autoAlpha: 0, // Opacity auf 0 setzen
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          }),
        // Beim Hochscrollen Opacity wiederherstellen
        onLeaveBack: () =>
          gsap.to(stickyImage, {
            autoAlpha: 1, // Opacity auf 1 zurücksetzen
            duration: 0.5,
            ease: 'power2.out',
            force3D: true,
          }),
      });
    }
  });
}

function checkWindowSize() {
  if (window.innerWidth >= 768) {
    initStickyWallAnimations();
  }
}

// Check beim Laden der Seite
checkWindowSize();

// Event Listener, um bei Fenstergrößenänderung zu prüfen
window.addEventListener('resize', checkWindowSize);
