import { gsap } from 'src/index.js';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ScrollTrigger-Plugin registrieren
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  // Überprüfen, ob die Bildschirmbreite größer als 768px ist
  if (window.innerWidth <= 768) return;

  // Alle Textboxen und Komponenten selektieren
  const textBoxes = document.querySelectorAll('.buildings-graphic_text-box');
  const graphicComponents = document.querySelectorAll('.buildings-graphic_component');
  const stickyContainer = document.querySelector('.buildings_sticky-container');

  // Sicherstellen, dass die Textboxen, Komponenten und der Sticky Container gefunden werden
  if (!stickyContainer || textBoxes.length === 0 || graphicComponents.length === 0) {
    return; // Falls ein Element fehlt, die Funktion beenden
  }

  // Zuerst sicherstellen, dass die Textboxen initial versteckt und verschoben sind
  gsap.set(textBoxes, { autoAlpha: 0, y: '-1rem' });
  // Initialer Zustand des roten Punkts: Opacity 0 und keine Pointer-Events
  gsap.set('.buildings-graphic_red-dot', { opacity: 0, pointerEvents: 'none' });

  // Animation für jede Textbox definieren
  textBoxes.forEach((textBox, index) => {
    const startPercent = 5 + index * 7; // Start bei 5%, dann 12%, 19%, usw.
    const endPercent = startPercent + 5; // Endet bei 10%, 17%, 24%, usw.

    ScrollTrigger.create({
      trigger: stickyContainer, // Orientiere die Scrollhöhe am Sticky Container
      start: () => `${startPercent}% top`,
      end: () => `${endPercent}% top`,
      scrub: true,
      onEnter: () =>
        gsap.to(textBox, { autoAlpha: 1, y: '0rem', duration: 0.3, ease: 'power2.out' }),
      onLeave: () =>
        gsap.to(textBox, { autoAlpha: 0, y: '-1rem', duration: 0.3, ease: 'power2.out' }),
      onEnterBack: () =>
        gsap.to(textBox, { autoAlpha: 1, y: '0rem', duration: 0.3, ease: 'power2.out' }),
      onLeaveBack: () =>
        gsap.to(textBox, { autoAlpha: 0, y: '-1rem', duration: 0.3, ease: 'power2.out' }),
    });
  });

  // Animation für die buildings-graphic_component und den roten Punkt (red-dot) definieren
  graphicComponents.forEach((component, index) => {
    const redDot = component.querySelector('.buildings-graphic_red-dot');
    if (!redDot) return;

    const startPercent = 30 + index * 5; // Start bei 30%, dann 35%, 40%, usw.
    const endPercent = startPercent + 4; // Endet bei 34%, 39%, 44%, usw.

    ScrollTrigger.create({
      trigger: stickyContainer,
      start: () => `${startPercent}% top`,
      end: () => `${endPercent}% top`,
      scrub: true,
      onEnter: () =>
        gsap.to(redDot, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.3,
          ease: 'power2.out',
        }), // Punkt erscheint
      onEnterBack: () =>
        gsap.to(redDot, {
          opacity: 1,
          pointerEvents: 'all',
          duration: 0.3,
          ease: 'power2.out',
        }), // Auch beim Rückwärts-Scrollen sichtbar
      onLeaveBack: () =>
        gsap.to(redDot, {
          opacity: 0,
          pointerEvents: 'none',
          duration: 0.3,
          ease: 'power2.out',
        }), // Beim Rückwärts-Scrollen ausblenden
    });
  });
}

initAnimations();

// Optional: Event Listener für Fenstergröße (falls du eine Änderung der Breite erkennen möchtest)
window.addEventListener('resize', () => {
  ScrollTrigger.refresh(); // Aktualisiert die ScrollTrigger nach der Größenänderung des Fensters
});
