import '../scss/style.scss'
import { initSakura } from './sakura.js'

// Main JavaScript file
console.log('Vite + Sass environment is ready!');

// Course Tab Switching
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.course-tab');
  const contents = document.querySelectorAll('.course-tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.getAttribute('data-tab');

      // Update tabs
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update contents
      contents.forEach(content => {
        if (content.id === target) {
          content.classList.add('active');
          content.style.display = 'block';
          // Force reflow for transition
          setTimeout(() => {
            content.style.opacity = '1';
          }, 10);
        } else {
          content.classList.remove('active');
          content.style.opacity = '0';
          setTimeout(() => {
            content.style.display = 'none';
          }, 400); // Match transition speed
        }
      });
    });
  });

  // Course Expand/Collapse
  const expandBtns = document.querySelectorAll('.course-expand-btn');
  expandBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const container = btn.closest('.course-expand-container');
      if (!container) return;

      const isExpanded = container.classList.toggle('is-expanded');
      btn.classList.toggle('is-active');
      btn.textContent = isExpanded ? '閉じる' : '続きを見る';

      if (isExpanded) {
        // Force a scroll event so IntersectionObserver triggers for hidden items
        setTimeout(() => {
          window.dispatchEvent(new Event('scroll'));
        }, 100);
      } else {
        // Scroll back to the top of the section if closing
        const section = btn.closest('section');
        if (section) {
          const offsetTop = section.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll('.reveal, .reveal-group');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-active');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.05, // Slightly lower for better responsiveness
      rootMargin: '0px 0px -20px 0px' // Slightly less negative margin
    });

    revealElements.forEach(el => {
      revealObserver.observe(el);
    });
  }

  // Smooth Scroll for Internal Links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return; // Ignore single #

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // Pagetop Button
  const pagetop = document.getElementById('pagetop');
  if (pagetop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        pagetop.classList.add('is-show');
      } else {
        pagetop.classList.remove('is-show');
      }
    });

    pagetop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // Initialize Sakura Animation
  initSakura();
});
