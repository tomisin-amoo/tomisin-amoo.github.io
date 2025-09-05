/* =========================================
   Preloader
   ========================================= */
window.addEventListener('load', () => {
  const preloader = document.getElementById('tt-preloader');
  if (preloader) {
    preloader.style.opacity = '0';
    setTimeout(() => { preloader.style.display = 'none'; }, 500);
  }
});

/* =========================================
   Smooth Scroll to Sections
   ========================================= */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(anchor.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

/* =========================================
   Counters (Facts Section)
   ========================================= */
function animateCounters() {
  document.querySelectorAll('.timer').forEach(counter => {
    const target = +counter.getAttribute('data-original-text');
    let count = 0;
    const increment = Math.ceil(target / 100);

    const updateCount = () => {
      if (count < target) {
        count += increment;
        counter.innerText = count;
        setTimeout(updateCount, 20);
      } else {
        counter.innerText = target;
      }
    };
    updateCount();
  });
}
document.addEventListener('DOMContentLoaded', animateCounters);

/* =========================================
   Skills Progress Bars (One-time Animation)
   ========================================= */
let skillsAnimated = false;
function animateProgressBars() {
  document.querySelectorAll('.progress-bar').forEach(bar => {
    const targetWidth = bar.getAttribute('data-progress');
    bar.style.width = targetWidth;
  });
}
function checkSkillsInView() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    animateProgressBars();
    skillsAnimated = true;
  }
}

/* =========================================
   Reveal Animations (WOW.js-like)
   ========================================= */
function revealOnScroll() {
  document.querySelectorAll('.wow').forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 150) {
      el.classList.add('animated', 'fadeInUp');
      el.style.visibility = 'visible';
    }
  });
}

/* =========================================
   Scroll Behavior (Navbar, Scroll-Up, Skills)
   ========================================= */
function onScroll() {
  const navbar = document.getElementById('navbar-custom');
  const scrollUp = document.querySelector('.scroll-up');

  // Navbar shrink
  if (window.scrollY > 50) {
    navbar.classList.add('navbar-shrink');
  } else {
    navbar.classList.remove('navbar-shrink');
  }

  // Scroll-up button
  if (window.scrollY > 300) {
    scrollUp.classList.add('visible');
  } else {
    scrollUp.classList.remove('visible');
  }

  // Skills progress
  checkSkillsInView();

  // Reveal animations
  revealOnScroll();
}

window.addEventListener('scroll', onScroll);
document.addEventListener('DOMContentLoaded', onScroll);