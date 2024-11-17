import { gsap } from 'src/index.js';

function animateGraphicButtons() {
  // Selektiere die Buttons und das Bild
  const button = document.querySelector('[buildings-graphic="button"]');
  const image = document.querySelector('[buildings-graphic="image"]');
  const buttonBack = document.querySelector('[buildings-graphic="button-back"]'); // Selektiere den Button-back

  // Überprüfe, ob die erforderlichen Elemente im DOM vorhanden sind
  if (button && image && buttonBack) {
    // Click-Event für den ersten Button
    button.addEventListener('click', () => {
      // Animation für das Bild und die Buttons
      gsap.to(image, {
        x: '-50%',
        duration: 0.3,
        ease: 'power2.inOut',
      });

      gsap.to(button, {
        autoAlpha: 0, // Ersten Button ausblenden
        duration: 0.3,
        ease: 'power2.inOut',
      });

      gsap.to(buttonBack, {
        autoAlpha: 1, // Button-back einblenden
        duration: 0.3,
        ease: 'power2.inOut',
        delay: 0.3, // Startet nach dem Ausblenden des ersten Buttons
      });
    });

    // Click-Event für den Button-back
    buttonBack.addEventListener('click', () => {
      // Rückwärts-Animation für das Bild und die Buttons
      gsap.to(image, {
        x: '0%', // Rückwärtsbewegung des Bildes
        duration: 0.3,
        ease: 'power2.inOut',
      });

      gsap.to(buttonBack, {
        autoAlpha: 0, // Button-back ausblenden
        duration: 0.3,
        ease: 'power2.inOut',
      });

      gsap.to(button, {
        autoAlpha: 1, // Ersten Button wieder einblenden
        duration: 0.3,
        ease: 'power2.inOut',
        delay: 0.3, // Startet nach dem Ausblenden von Button-back
      });
    });
  }
}

// Funktion direkt aufrufen, ohne auf das Load-Event zu warten
animateGraphicButtons();
