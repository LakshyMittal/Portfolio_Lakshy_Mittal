// Fade-in sections & nav active highlight + copy link helper

// Fade-in observer
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.18 };
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('show');
      obs.unobserve(e.target);
    }
  });
}, appearOptions);
faders.forEach(f => observer.observe(f));

// Skill bar animation on scroll
const skillBars = document.querySelectorAll('.bar > div');
const skillsSection = document.querySelector('#skills'); // Make sure skills section has id="skills"

const skillObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      skillBars.forEach(bar => {
        bar.style.animationPlayState = 'running'; // Start animation
      });
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (skillsSection) {
  skillObserver.observe(skillsSection);
}

// Active nav on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => {
    const top = s.offsetTop - 120;
    if (scrollY >= top) current = s.id;
  });
  navLinks.forEach(a => {
    a.classList.remove('active');
    if (a.getAttribute('href') === `#${current}`) a.classList.add('active');
  });
});

// Smooth click behavior (nav)
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', (e) => {
    // Smooth scroll is handled by CSS scroll-behavior
  });
});

// Copy link on project buttons
document.querySelectorAll('.project-cta .copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const link = btn.getAttribute('data-link');
    if (!link || link === '#') {
      alert('Project link placeholder — replace with repo or demo URL.');
      return;
    }
    navigator.clipboard.writeText(link).then(() => {
      btn.textContent = 'Copied!';
      setTimeout(() => btn.textContent = 'Copy Link', 1400);
    });
  });
});
