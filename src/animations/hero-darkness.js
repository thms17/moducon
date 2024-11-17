import { gsap, ScrollTrigger } from 'src/index.js';

// ScrollTrigger Plugin registrieren
gsap.registerPlugin(ScrollTrigger);

// Animationslogik
ScrollTrigger.create({
  trigger: '.background-circle-white', // Das Element, das gescrollt wird
  start: 'top 70%', // Startet, wenn das obere Ende des Kreises 70% des Viewports erreicht
  end: 'top 15%', // Endet, wenn das obere Ende des Kreises fast das obere Ende des Viewports erreicht hat
  onUpdate: (self) => {
    const progress = self.progress; // Scrollfortschritt zwischen 0 und 1
    const opacity = progress * 0.3; // Bestimme die Opacity (bis zu 30%)
    gsap.to('.dark-overlay', {
      opacity: opacity, // Setzt die Opacity auf einen Wert zwischen 0 und 0.3
      ease: 'none', // Keine Ease für lineare Änderung
      overwrite: 'auto', // Überschreibt die Animation, falls nötig
    });
  },
  onLeaveBack: () => {
    // Setzt die Opacity zurück auf 0, wenn zurückgescrollt wird
    gsap.to('.dark-overlay', {
      opacity: 0,
      ease: 'none',
      overwrite: 'auto',
    });
  },
});
