/**
 * MindFlow AI - Animações com GSAP
 * Inclui animações de entrada, scroll triggers e transições suaves
 */

// Aguardar o carregamento do GSAP
function initAnimations() {
  // Verificar se GSAP está disponível
  if (typeof gsap === 'undefined') {
    console.warn('GSAP não foi carregado');
    return;
  }

  // Registrar ScrollTrigger plugin
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  /**
   * 1. ANIMAÇÕES DE ENTRADA - Hero Section
   */
  const heroTl = gsap.timeline({ defaults: { duration: 0.8, ease: 'power2.out' } });
  
  heroTl
    .from('.eyebrow', { autoAlpha: 0, y: 20 }, 0)
    .from('h1', { autoAlpha: 0, y: 30 }, 0.1)
    .from('.hero__lead', { autoAlpha: 0, y: 30 }, 0.2)
    .from('.hero__actions', { autoAlpha: 0, y: 30 }, 0.3)
    .from('.hero__stats', { autoAlpha: 0, y: 20 }, 0.4);

  // Animação de entrada do study-panel
  gsap.from('.study-panel', {
    autoAlpha: 0,
    x: 40,
    duration: 0.8,
    ease: 'power2.out',
    delay: 0.5
  });

  /**
   * 2. BOTÕES - Efeito Hover elegante
   */
  document.querySelectorAll('.button').forEach(button => {
    const isHovering = false;
    
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: '0 12px 24px rgba(32, 87, 214, 0.3)',
        y: -2
      });
    });

    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        duration: 0.3,
        ease: 'power2.out',
        boxShadow: 'none',
        y: 0
      });
    });
  });

  /**
   * 3. SCROLL TRIGGERS - Seções animadas
   */
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    // Animação de fade in e slide up para seções
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 50%',
        scrub: false,
        markers: false,
      },
      autoAlpha: 0,
      y: 50,
      duration: 0.8,
      ease: 'power2.out'
    });
  });

  /**
   * 4. CARDS - Animação ao passar pelo scroll
   */
  const cards = document.querySelectorAll('[class*="card"]');
  cards.forEach((card, index) => {
    gsap.from(card, {
      scrollTrigger: {
        trigger: card,
        start: 'top 85%',
        markers: false,
      },
      autoAlpha: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      delay: index * 0.1
    });

    // Efeito hover para cards
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        duration: 0.3,
        ease: 'power2.out',
        y: -5,
        boxShadow: '0 16px 40px rgba(23, 32, 42, 0.12)'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, {
        duration: 0.3,
        ease: 'power2.out',
        y: 0,
        boxShadow: '0 8px 24px rgba(23, 32, 42, 0.06)'
      });
    });
  });

  /**
   * 5. MENU LINKS - Smooth scroll com efeito
   */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target && typeof ScrollToPlugin !== 'undefined') {
        gsap.registerPlugin(ScrollToPlugin);
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            autoKill: false
          },
          ease: 'power2.inOut'
        });
      }
    });
  });

  /**
   * 6. PROGRESS BAR - Animação de preenchimento ao scroll
   */
  const progressBars = document.querySelectorAll('.progress-track span');
  progressBars.forEach(bar => {
    const parentBar = bar.parentElement;
    const targetWidth = bar.style.width || '0%';

    gsap.from(bar, {
      scrollTrigger: {
        trigger: parentBar,
        start: 'center 80%',
        markers: false,
      },
      width: '0%',
      duration: 1.2,
      ease: 'power2.out'
    });
  });

  /**
   * 7. HEADER - Sticky animation
   */
  const header = document.querySelector('[data-header]');
  if (header) {
    gsap.to(header, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        onUpdate: (self) => {
          if (self.direction === 1 && self.getVelocity() < 0) {
            gsap.to(header, { y: -100, duration: 0.3, overwrite: 'auto' });
          } else if (self.direction === -1) {
            gsap.to(header, { y: 0, duration: 0.3, overwrite: 'auto' });
          }
        }
      }
    });
  }

  /**
   * 8. TÍTULOS - Stagger animation para títulos de seção
   */
  document.querySelectorAll('section > h2, section > h3').forEach((heading, index) => {
    gsap.from(heading, {
      scrollTrigger: {
        trigger: heading,
        start: 'center 85%',
        markers: false,
      },
      autoAlpha: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out'
    });
  });

  /**
   * 9. LISTAS - Stagger animation para itens de lista
   */
  document.querySelectorAll('ul:not(.nav-menu) li, .schedule-list article').forEach((item, index) => {
    gsap.from(item, {
      scrollTrigger: {
        trigger: item.parentElement,
        start: 'top 80%',
        markers: false,
      },
      autoAlpha: 0,
      x: -30,
      duration: 0.5,
      ease: 'power2.out',
      delay: index * 0.08
    });
  });

  /**
   * 10. BRAND LOGO - Animação suave ao scroll
   */
  const brandLogo = document.querySelector('.brand__logo');
  if (brandLogo) {
    gsap.to(brandLogo, {
      scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        onUpdate: (self) => {
          const scale = 1 + self.getVelocity() * 0.00001;
          gsap.to(brandLogo, {
            rotation: self.getVelocity() * 0.05,
            overwrite: 'auto',
            duration: 0.1
          });
        }
      }
    });
  }

  /**
   * 11. REFRESH ScrollTrigger após carregamento completo
   */
  window.addEventListener('load', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });

  // Atualizar ScrollTrigger quando a janela é redimensionada
  window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.refresh();
    }
  });
}

// Iniciar animações quando o documento estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

// Cleanup ao sair da página
window.addEventListener('beforeunload', () => {
  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }
});
