/* ===========================
   Preloader
   =========================== */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (preloader) {
    preloader.style.opacity = "0";
    setTimeout(() => { preloader.style.display = "none"; }, 500);
  }
});

/* ===========================
   Smooth Scroll to Sections
   =========================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(anchor.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ===========================
   Counters (Facts Section)
   =========================== */
function animateCounters() {
  document.querySelectorAll(".timer").forEach(counter => {
    const target = +counter.getAttribute("data-original-text");
    let count = 0;
    const increment = Math.ceil(target / 100);

    const update = () => {
      if (count < target) {
        count += increment;
        counter.innerText = count;
        setTimeout(update, 20);
      } else {
        counter.innerText = target;
      }
    };
    update();
  });
}

/* ===========================
   Skills Progress Bars
   =========================== */
let skillsAnimated = false;

function animateProgressBars() {
  document.querySelectorAll(".progress-bar").forEach(bar => {
    const targetWidth = bar.getAttribute("data-progress");
    bar.style.width = targetWidth;
  });
}

function checkSkillsInView() {
  if (skillsAnimated) return;
  const skillsSection = document.getElementById("skills");
  if (!skillsSection) return;

  const rect = skillsSection.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    animateProgressBars();
    skillsAnimated = true;
  }
}

/* ===========================
   Reveal Animations (WOW.js-like)
   =========================== */
function revealOnScroll() {
  document.querySelectorAll(".wow").forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (elementTop < windowHeight - 150) {
      el.classList.add("animated", "fadeInUp");
      el.style.visibility = "visible";
    }
  });
}

/* ===========================
   Scroll Behavior
   - Navbar shrink
   - Scroll-up button
   - Skills progress
   - Reveal animations
   =========================== */
function onScroll() {
  const navbar = document.getElementById("navbar-custom");
  const scrollUp = document.querySelector(".scroll-up");

  // Navbar shrink
  if (navbar) {
    navbar.classList.toggle("navbar-shrink", window.scrollY > 50);
  }

  // Scroll-up button
  if (scrollUp) {
    scrollUp.classList.toggle("visible", window.scrollY > 300);
  }

  // Animate skills + reveal
  checkSkillsInView();
  revealOnScroll();
}

/* ===========================
   Init
   =========================== */
document.addEventListener("DOMContentLoaded", () => {
  animateCounters();
  checkSkillsInView(); // check immediately
  setTimeout(checkSkillsInView, 300); // run again after short delay
  onScroll(); // set initial states
});

window.addEventListener("scroll", onScroll);