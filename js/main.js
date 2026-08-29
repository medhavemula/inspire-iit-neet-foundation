/**
 * ==========================================================================
 * INSPIRE IIT & NEET FOUNDATION — CORE ENGINE & CONFIGURATION
 * Pure Vanilla JavaScript (Zero External Dependencies)
 * ==========================================================================
 */

// ==========================================================================
// 1. CONFIGURABLE PORTAL LOGIN SETTINGS
// ==========================================================================
/**
 * Single place to configure the Inspire CRM / LMS portal URL.
 * Set `loginUrl` to "PENDING" until the actual portal endpoint is received.
 * When the real URL is ready, simply replace "PENDING" with e.g. "https://portal.inspireiit.com"
 */
const INSPIRE_CONFIG = {
  loginUrl: "login.html", // Routes directly to the Inspire CRM login portal page
  crmEndpoint: "PENDING", // Set external CRM production endpoint here when ready
  fallbackWebsite: "https://www.inspireiit.com/",
  contactEmail: "inspireiitfoundation@gmail.com",
  phonePrimary: "+91 9704801457",
  phoneSecondary: "+91 9121441475"
};

// ==========================================================================
// 2. INITIALIZATION ON DOM READY
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initHeroConstellationCanvas();
  initHeroInteractive3D();
  initHeroMicroInteractions();
  initFeatureShowcase();
  initRoleTabs();
  initScrollReveals();
  initLoginActions();
  initModalEvents();
  initActiveNavHighlight();
  initStatsCounterAnimation();
});

// ==========================================================================
// 2.1 HERO CONSTELLATION NETWORK CANVAS ANIMATION
// ==========================================================================
function initHeroConstellationCanvas() {
  const canvas = document.getElementById('hero-network-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationFrameId;
  let width, height;
  let particles = [];
  const particleCount = 30;

  function resizeCanvas() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Create particles with Inspire Blue & Orange tones
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      radius: Math.random() * 2 + 1.2,
      color: Math.random() > 0.3 ? 'rgba(2, 84, 184, ' : 'rgba(243, 111, 33, ',
      alpha: Math.random() * 0.4 + 0.2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ')';
      ctx.fill();

      // Connect nearby particles with subtle lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const lineAlpha = (1 - dist / 130) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(2, 84, 184, ${lineAlpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationFrameId = requestAnimationFrame(draw);
  }

  // Check prefers-reduced-motion
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    draw();
  }
}

// ==========================================================================
// 2.2 HERO 3D TILT & PARALLAX ON MOUSE MOVE
// ==========================================================================
function initHeroInteractive3D() {
  const hero = document.querySelector('.hero-section');
  const dashboard = document.querySelector('.hero-dashboard-container');
  const cardTop = document.querySelector('.satellite-card-top');
  const cardBottom = document.querySelector('.satellite-card-bottom');

  if (!hero || !dashboard) return;
  if (window.innerWidth < 992) return; // Disable on touch and mobile
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let bounds = hero.getBoundingClientRect();
  const handleResize = () => {
    if (window.innerWidth < 992) {
      dashboard.style.transform = 'none';
      if (cardTop) cardTop.style.transform = 'none';
      if (cardBottom) cardBottom.style.transform = 'none';
      return;
    }
    bounds = hero.getBoundingClientRect();
  };
  window.addEventListener('resize', handleResize);

  hero.addEventListener('mousemove', (e) => {
    if (window.innerWidth < 992) return;
    const mouseX = e.clientX - bounds.left;
    const mouseY = e.clientY - bounds.top;

    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;

    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;

    const maxTilt = 4.5;
    const tiltY = percentX * maxTilt;
    const tiltX = -percentY * maxTilt;

    dashboard.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;

    if (cardTop) {
      cardTop.style.transform = `translate3d(${(percentX * 14).toFixed(1)}px, ${(percentY * 10).toFixed(1)}px, 30px)`;
    }
    if (cardBottom) {
      cardBottom.style.transform = `translate3d(${(-percentX * 16).toFixed(1)}px, ${(-percentY * 12).toFixed(1)}px, 30px)`;
    }
  });

  hero.addEventListener('mouseleave', () => {
    dashboard.style.transform = 'rotateX(0deg) rotateY(0deg)';
    if (cardTop) cardTop.style.transform = 'translate3d(0, 0, 0)';
    if (cardBottom) cardBottom.style.transform = 'translate3d(0, 0, 0)';
  });
}

// ==========================================================================
// 2.3 HERO MICRO-INTERACTIONS
// ==========================================================================
function initHeroMicroInteractions() {
  const joinBtn = document.getElementById('hero-join-btn');
  const doubtBtn = document.getElementById('hero-doubt-btn');

  if (joinBtn) {
    joinBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'login.html';
    });
  }

  if (doubtBtn) {
    doubtBtn.addEventListener('click', () => {
      window.location.href = 'login.html';
    });
  }
}

// ==========================================================================
// 3. NAVBAR SCROLL EFFECT
// ==========================================================================
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar-wrapper');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

// ==========================================================================
// 4. MOBILE DRAWER NAVIGATION
// ==========================================================================
function initMobileNav() {
  const hamburger = document.querySelector('.hamburger-btn');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileBackdrop = document.querySelector('.mobile-nav-backdrop');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburger || !mobileDrawer) return;

  const toggleDrawer = (forceState) => {
    const isOpen = typeof forceState === 'boolean' ? forceState : !mobileDrawer.classList.contains('open');
    hamburger.classList.toggle('open', isOpen);
    mobileDrawer.classList.toggle('open', isOpen);
    if (mobileBackdrop) mobileBackdrop.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleDrawer();
  });

  if (mobileBackdrop) {
    mobileBackdrop.addEventListener('click', () => toggleDrawer(false));
  }

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleDrawer(false);
    });
  });

  // Close when pressing Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });

  // Close when window resized to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 992 && mobileDrawer.classList.contains('open')) {
      toggleDrawer(false);
    }
  });
}

// ==========================================================================
// 5. SECTION 3 — INTERACTIVE FEATURE SHOWCASE
// ==========================================================================
function initFeatureShowcase() {
  const featureNavItems = document.querySelectorAll('.feature-nav-item');
  const featurePanels = document.querySelectorAll('.feature-panel-view');
  const playBtns = document.querySelectorAll('.mock-play-btn, #feature-video-player, .mock-playlist-item');

  if (playBtns.length) {
    playBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        // Navigate to login portal
        window.location.href = 'login.html';
      });
    });
  }

  if (!featureNavItems.length || !featurePanels.length) return;

  featureNavItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetFeature = item.getAttribute('data-feature');

      // Update active nav button
      featureNavItems.forEach(nav => {
        nav.classList.toggle('active', nav === item);
      });

      // Update active display screen
      featurePanels.forEach(panel => {
        const isTarget = panel.getAttribute('id') === `feature-view-${targetFeature}`;
        panel.classList.toggle('active', isTarget);
      });
    });
  });
}

// ==========================================================================
// 6. SECTION 4 — ROLE TABS SWITCHER (Students, Teachers, Schools)
// ==========================================================================
function initRoleTabs() {
  const tabButtons = document.querySelectorAll('.role-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  const roleJumpLinks = document.querySelectorAll('[data-role-target]');
  const navRoleLinks = document.querySelectorAll('[data-nav-role]');

  if (!tabButtons.length || !tabPanes.length) return;

  const switchToRole = (targetRole) => {
    // Update button active state
    tabButtons.forEach(btn => {
      const isCurrent = btn.getAttribute('data-tab') === targetRole;
      btn.classList.toggle('active', isCurrent);
      btn.setAttribute('aria-selected', String(isCurrent));
    });

    // Update pane active state
    tabPanes.forEach(pane => {
      const isTarget = pane.getAttribute('id') === `tab-${targetRole}`;
      pane.classList.toggle('active', isTarget);
    });

    // Update nav links active state for roles
    navRoleLinks.forEach(link => {
      const isCurrentRole = link.getAttribute('data-nav-role') === targetRole;
      if (link.classList.contains('nav-link')) {
        link.classList.toggle('active', isCurrentRole);
      }
    });
  };

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetRole = button.getAttribute('data-tab');
      switchToRole(targetRole);
    });
  });

  roleJumpLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetRole = link.getAttribute('data-role-target');
      switchToRole(targetRole);
    });
  });

  navRoleLinks.forEach(link => {
    link.addEventListener('click', () => {
      const targetRole = link.getAttribute('data-nav-role');
      switchToRole(targetRole);
    });
  });
}

// ==========================================================================
// 7. SCROLL-TRIGGERED REVEAL ANIMATIONS
// ==========================================================================
function initScrollReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if (!revealElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -30px 0px'
  });

  revealElements.forEach(el => observer.observe(el));
}

// ==========================================================================
// 8. CONFIGURABLE "LOGIN TO INSPIRE" CTAs
// ==========================================================================
function initLoginActions() {
  const loginButtons = document.querySelectorAll('[data-action="login"]');
  const modal = document.getElementById('login-modal');

  loginButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      if (INSPIRE_CONFIG.loginUrl && INSPIRE_CONFIG.loginUrl.toUpperCase() !== "PENDING") {
        window.location.href = INSPIRE_CONFIG.loginUrl;
      } else {
        if (modal) {
          modal.classList.add('active');
          document.body.style.overflow = 'hidden';
        } else {
          window.location.href = INSPIRE_CONFIG.fallbackWebsite;
        }
      }
    });
  });
}

// ==========================================================================
// 9. MODAL DIALOG CONTROLS
// ==========================================================================
function initModalEvents() {
  const modal = document.getElementById('login-modal');
  if (!modal) return;

  const closeButtons = modal.querySelectorAll('[data-close-modal]');

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ==========================================================================
// 10. ACTIVE NAV LINK HIGHLIGHTING
// ==========================================================================
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');

        if (currentId === 'for-students') {
          // If in Section 4, sync with active role tab
          const activeTabBtn = document.querySelector('.role-tab-btn.active');
          const activeRole = activeTabBtn ? activeTabBtn.getAttribute('data-tab') : 'students';
          navLinks.forEach(link => {
            if (link.getAttribute('data-nav-role') === activeRole) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        } else {
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}` && !link.hasAttribute('data-nav-role')) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      }
    });
  }, {
    rootMargin: '-15% 0px -45% 0px',
    threshold: 0.1
  });

  sections.forEach(section => observer.observe(section));
}

// ==========================================================================
// 11. ABOUT US STATS COUNT-UP ANIMATION
// ==========================================================================
function initStatsCounterAnimation() {
  const statElements = document.querySelectorAll('.stat-counter');
  if (!statElements.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statElements.forEach(el => {
          const target = parseInt(el.getAttribute('data-target'), 10) || 0;
          const duration = 1200;
          const startTimestamp = performance.now();

          function step(now) {
            const progress = Math.min((now - startTimestamp) / duration, 1);
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeOutQuart * target);
            el.textContent = currentVal.toLocaleString();

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              el.textContent = target.toLocaleString();
            }
          }

          requestAnimationFrame(step);
        });
      }
    });
  }, { threshold: 0.25 });

  const aboutSection = document.getElementById('about');
  if (aboutSection) {
    observer.observe(aboutSection);
  }
}
