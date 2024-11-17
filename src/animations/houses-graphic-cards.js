import { gsap } from 'src/index.js';

function initAnimation() {
  const components = document.querySelectorAll('.buildings-graphic_component');
  if (!components.length) return;

  // Setze den initialen Zustand für die Karten und roten Punkte
  gsap.set('.buildings-graphic_card', { autoAlpha: 0, inset: 'auto auto 3rem' });
  gsap.set('.buildings-graphic_red-dot', {
    opacity: 0,
    pointerEvents: 'none',
    ariaExpanded: 'false',
  });

  components.forEach((component) => {
    const card = component.querySelector('.buildings-graphic_card');
    const redDot = component.querySelector('.buildings-graphic_red-dot');
    if (!card || !redDot) return;

    const showCardAndRedDot = () => {
      // Animation für die Karte (Anzeige und Position)
      gsap.to(card, {
        autoAlpha: 1, // Die Karte wird eingeblendet
        inset: 'auto auto 2rem',
        duration: 0.3,
      });

      // Animation für den roten Punkt (Anzeige, Skalierung)
      gsap.to(redDot, {
        opacity: 1, // Der Punkt wird eingeblendet und bleibt sichtbar
        pointerEvents: 'all',
        duration: 0.3,
        scale: 1.8,
      });

      redDot.setAttribute('aria-expanded', 'true');
    };

    const hideCardAndResetRedDotScale = () => {
      // Animation zum Ausblenden der Karte
      gsap.to(card, {
        autoAlpha: 0, // Die Karte wird ausgeblendet
        inset: 'auto auto 3rem',
        duration: 0.3,
      });

      // Nur die Skalierung des roten Punktes zurücksetzen, Opacity bleibt
      gsap.to(redDot, {
        duration: 0.3,
        scale: 1,
      });
    };

    // Funktion, um zu prüfen, ob pointer-events bereits 'all' sind
    const canInteract = () => {
      const pointerEvents = window.getComputedStyle(redDot).pointerEvents;
      return pointerEvents === 'all';
    };

    // Event-Listener für focusin (immer Animation abspielen)
    component.addEventListener('focusin', showCardAndRedDot);

    // Event-Listener für mouseenter und click (nur Animation abspielen, wenn pointer-events 'all' ist)
    ['mouseenter', 'click'].forEach((event) =>
      component.addEventListener(event, () => {
        if (canInteract()) {
          showCardAndRedDot();
        }
      })
    );

    // Event-Listener für focusout und mouseleave (Karte ausblenden, Skalierung zurücksetzen)
    ['focusout', 'mouseleave'].forEach((event) =>
      component.addEventListener(event, hideCardAndResetRedDotScale)
    );
  });
}

initAnimation();
