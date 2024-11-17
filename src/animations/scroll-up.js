import { gsap, ScrollTrigger } from 'src/index.js';

// ScrollTrigger Plugin registrieren
gsap.registerPlugin(ScrollTrigger);

// Führe die Animation aus, sobald das Skript geladen ist
gsap.utils.toArray('[gsap-animation="scroll-up"]').forEach(function (element, index) {
  gsap.fromTo(
    element,
    { opacity: 0, y: 50 },
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom-=5%', // Animation startet, sobald das Element den unteren Rand des Viewports erreicht
        toggleActions: 'play none none none', // Animation spielt nur beim ersten Mal, wenn das Element in den Viewport kommt
        delay: index * 0.8, // Anpassen, um den zeitlichen Abstand zu erhöhen/verringern
      },
    }
  );
});
