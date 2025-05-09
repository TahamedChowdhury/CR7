document.addEventListener('DOMContentLoaded', function() {
  // Animate stats counter
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateCounter() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-count'));
      const duration = 2000; // Duration in milliseconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          stat.textContent = target;
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 16);
    });
  }
  
  // Use Intersection Observer to trigger animation when element is in view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    const statsSection = document.querySelector('.stats-container');
    if (statsSection) {
      observer.observe(statsSection);
    }
  } else {
    // Fallback for browsers that don't support Intersection Observer
    window.addEventListener('scroll', () => {
      const statsSection = document.querySelector('.stats-container');
      if (statsSection && isInViewport(statsSection)) {
        animateCounter();
        window.removeEventListener('scroll', this);
      }
    });
  }
  
  // Parallax effect for hero section
  const hero = document.querySelector('.hero');
  
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition < window.innerHeight) {
        hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
      }
    });
  }
});

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}