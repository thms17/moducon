import { gsap } from 'src/index.js';

const OPEN = 'open';
const CLOSED = 'closed';
const NAV_MOBILE_OPEN = 'nav-mobile-open';

function initNavbar() {
  const component = document.querySelector('[navbar="component"]');
  const navOpenButton = document.querySelector('.nav_open-button');
  const navbarInner = document.querySelector('[navbar="inner"]');
  const navbarBrandLink = document.querySelector('.navbar_brand-link');
  const navListItems = document.querySelectorAll('.navbar_nav-list-item-link'); // Alle Links
  const mobileTrigger = document.querySelector('[navbar="dropdown-trigger"]');
  const dropdownPanel = component.querySelector('[navbar="dropdown-panel"]');
  const navButtonCloseImage = mobileTrigger.querySelector('.nav_button-close-image');
  const staggerItems = document.querySelectorAll('[navbar="stagger"]');

  if (
    !component ||
    !navOpenButton ||
    !navbarInner ||
    !navbarBrandLink ||
    navListItems.length === 0 ||
    !mobileTrigger ||
    !navButtonCloseImage ||
    staggerItems.length === 0
  ) {
    return;
  }

  const mm = gsap.matchMedia();
  const breakpoint = 768;

  mm.add(
    {
      isDesktop: `(min-width: ${breakpoint}px)`,
      isMobile: `(max-width: ${breakpoint - 1}px)`,
    },
    (context) => {
      const { isMobile, isDesktop } = context.conditions;

      if (isDesktop) {
        // Desktop-Animation
        const tl = gsap.timeline({ paused: true, reversed: true });

        tl.to(navbarInner, {
          duration: 0.35,
          autoAlpha: 1,
          ease: 'power2.inOut',
        }).to(
          ['.navbar_brand-link', '.navbar_nav-list-item-link'],
          {
            duration: 0.3,
            autoAlpha: 1,
            x: 0,
            stagger: 0.1,
            ease: 'power2.inOut',
          },
          '-=0.1'
        );

        navOpenButton.addEventListener('click', () => {
          const newState = tl.reversed() ? OPEN : CLOSED;
          tl.reversed() ? tl.play() : tl.reverse();
          setNavbarState(navOpenButton, component, newState, isMobile);
        });
      }

      if (isMobile) {
        // Mobile-Animation
        const navMobileOpenAnim = gsap.timeline({
          paused: true,
          reversed: true,
          onStart: () => {
            navbarInner.style.display = 'block';
          },
          onReverseComplete: () => {
            navbarInner.style.display = 'none';
          },
        });

        navMobileOpenAnim.to(dropdownPanel, {
          visibility: 'visible',
          height: 'auto',
          duration: 0.7,
          ease: 'power3.inOut',
        });

        navMobileOpenAnim.to(
          mobileTrigger,
          {
            borderWidth: '0px',
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<'
        );

        navMobileOpenAnim.to(
          navButtonCloseImage,
          {
            autoAlpha: 1,
            duration: 0.3,
            ease: 'power2.inOut',
          },
          '<0.1'
        );

        navMobileOpenAnim.fromTo(
          staggerItems,
          {
            autoAlpha: 0,
            y: '1rem',
          },
          {
            autoAlpha: 1,
            y: '0rem',
            duration: 0.3,
            ease: 'power3.out',
            stagger: 0.1,
          },
          '<'
        );

        function handleTriggerAction() {
          const newState = navMobileOpenAnim.reversed() ? OPEN : CLOSED;
          navMobileOpenAnim[newState === OPEN ? 'play' : 'reverse']();
          setNavbarState(mobileTrigger, component, newState, isMobile);
        }

        mobileTrigger.addEventListener('click', handleTriggerAction);

        mobileTrigger.addEventListener('keydown', function (event) {
          if (event.key === 'Enter' || event.key === 'Space') {
            event.preventDefault();
            handleTriggerAction();
          }
        });

        // Links in der mobilen Navigation schließen die Navigation bei Klick
        navListItems.forEach((item) => {
          item.addEventListener('click', () => {
            navMobileOpenAnim.reverse(); // Schließe die Navigation
            setNavbarState(mobileTrigger, component, CLOSED, isMobile); // Setze den Zustand auf geschlossen
          });
        });
      }
    }
  );

  function setNavbarState(button, component, state, isMobile) {
    const isOpen = state === OPEN;
    button.setAttribute('aria-expanded', isOpen);
    button.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    component.classList[isOpen ? 'add' : 'remove'](NAV_MOBILE_OPEN);

    // Scroll only disabled for Mobile
    if (isMobile) {
      document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    }
  }
}

initNavbar();
