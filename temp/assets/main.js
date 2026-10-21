/**
* Template Name: Gp
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Updated: Aug 15 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
    mobileNavToggleBtn.setAttribute('aria-expanded', document.body.classList.contains('mobile-nav-active'));
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.setAttribute('role', 'button');
    mobileNavToggleBtn.setAttribute('tabindex', '0');
    mobileNavToggleBtn.setAttribute('aria-label', 'Toggle navigation');
    mobileNavToggleBtn.setAttribute('aria-controls', 'navmenu');
    mobileNavToggleBtn.setAttribute('aria-expanded', 'false');
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && document.body.classList.contains('mobile-nav-active')) {
        mobileNavToogle();
        mobileNavToggleBtn.focus();
      }
    });
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a:not(.dropdown > a)').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .dropdown > a').forEach((navmenu, index) => {
    const submenu = navmenu.nextElementSibling;
    submenu.id = submenu.id || 'nav-submenu-' + index;
    navmenu.setAttribute('aria-controls', submenu.id);
    navmenu.setAttribute('aria-expanded', 'false');
    navmenu.addEventListener('click', event => {
      if (!window.matchMedia('(max-width: 1199.98px)').matches) return;
      event.preventDefault();
      const expanded = navmenu.getAttribute('aria-expanded') !== 'true';
      navmenu.setAttribute('aria-expanded', expanded);
      submenu.classList.toggle('dropdown-active', expanded);
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop?.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  function normalizedPage(pathname) {
    return pathname.replace(/\/index(?:\.html)?\/?$/, '').replace(/\.html$/, '').replace(/\/$/, '').replace(/(veritasch2|verizonch2)b$/, '$1');
  }

  function updateActiveNavigation() {
    const currentPage = normalizedPage(window.location.pathname);
    const links = document.querySelectorAll('#navmenu a[href]');
    links.forEach(link => {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    });
    links.forEach(link => {
      const target = new URL(link.href, window.location.href);
      if (target.origin !== window.location.origin || target.hash || normalizedPage(target.pathname) !== currentPage) return;
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
      const dropdown = link.closest('li.dropdown');
      if (dropdown) dropdown.querySelector(':scope > a').classList.add('active');
    });
  }

  updateActiveNavigation();
  window.addEventListener('pageshow', updateActiveNavigation);

})();
