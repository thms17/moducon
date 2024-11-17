import { gsap } from 'src/index.js';

function heroHeadingStagger() {
  const slogan = document.querySelector('.heading-style-h2.is-slogan');

  if (slogan) {
    // Text in Wörter aufteilen und in span-Tags verpacken
    slogan.innerHTML = slogan.textContent
      .split(' ')
      .map((word) => {
        const letters = word
          .split('')
          .map((letter) => `<span style="opacity: 0; display: inline-block;">${letter}</span>`)
          .join('');
        return `<span style="white-space: nowrap;">${letters}</span> `;
      })
      .join('');

    // Erst die gesamte Opacity des Containers animieren
    gsap.to(slogan, {
      opacity: 1, // Container sichtbar machen
      duration: 0.3, // Dauer der Container-Opacity-Animation
      onComplete: () => {
        // Nach der Container-Opacity-Animation die Buchstaben animieren
        gsap.fromTo(
          slogan.querySelectorAll('span span'),
          { x: -2, autoAlpha: 0 }, // Startzustand (von links, unsichtbar)
          {
            x: 0, // Bewegung nach rechts
            autoAlpha: 1, // Sichtbar
            duration: 0.45, // 450 ms Dauer pro Buchstabe
            stagger: 0.02, // 20 ms Verzögerung zwischen den Buchstaben
            ease: 'power2.out',
            delay: 0.3, // 300ms nach der Opacity-Animation des Containers
          }
        );
      },
    });
  }
}

heroHeadingStagger();
