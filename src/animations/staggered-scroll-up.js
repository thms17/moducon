import { gsap, ScrollTrigger } from 'src/index.js';

// ScrollTrigger Plugin registrieren
gsap.registerPlugin(ScrollTrigger);

const staggerValue = 0.2; // Zeitverzögerung zwischen den Animationen in Sekunden

// Sammle die verschiedenen Gruppen basierend auf dem Attribut animation-group
const groups = {
  1: gsap.utils.toArray('[gsap-animation="staggered-scroll-up"]:not([animation-group])'), // Standardgruppe ohne `animation-group`-Attribut
  2: gsap.utils.toArray('[animation-group="2"]'),
  3: gsap.utils.toArray('[animation-group="3"]'),
  4: gsap.utils.toArray('[animation-group="4"]'),
  5: gsap.utils.toArray('[animation-group="5"]'),
  6: gsap.utils.toArray('[animation-group="6"]'),
};

// Funktion zur Erstellung der Animation für jede Gruppe
const animateGroup = (groupElements) => {
  if (groupElements.length > 0) {
    const isMobile = window.innerWidth <= 767; // Prüfe, ob die Breite <= 767px ist

    if (isMobile) {
      // Bei mobilen Ansichten jedes Element einzeln animieren
      groupElements.forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: element, // Jedes Element einzeln als Trigger verwenden
              start: 'top bottom-=10%', // Startet, wenn das Element 10% im Viewport ist
              toggleActions: 'play none none none',
            },
          }
        );
      });
    } else {
      // Für größere Bildschirme die Gruppe mit Stagger animieren
      gsap.fromTo(
        groupElements,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
          stagger: staggerValue, // Stagger für die Gruppe
          scrollTrigger: {
            trigger: groupElements[0], // Verwende das erste Element der Gruppe als Trigger
            start: 'top bottom-=20%', // Startet, wenn das erste Element 20% im Viewport ist
            toggleActions: 'play none none none',
          },
        }
      );
    }
  }
};

// Animationsaufruf für jede Gruppe
animateGroup(groups[1]); // Gruppe ohne Attribut
animateGroup(groups[2]); // Gruppe mit Attribut "animation-group=2"
animateGroup(groups[3]); // Gruppe mit Attribut "animation-group=3"
animateGroup(groups[4]); // Gruppe mit Attribut "animation-group=4"
animateGroup(groups[5]); // Gruppe mit Attribut "animation-group=5"
animateGroup(groups[6]); // Gruppe mit Attribut "animation-group=6"

// Event Listener für Fenstergrößenänderungen, um die Animation neu zu initialisieren
window.addEventListener('resize', () => {
  ScrollTrigger.refresh(); // ScrollTrigger bei Größenänderung aktualisieren
});
