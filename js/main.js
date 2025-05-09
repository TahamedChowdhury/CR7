// Toggle mobile navigation
document.addEventListener('DOMContentLoaded', function() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      document.body.classList.toggle('nav-open');
    });
  }
  
  // Header scroll effect
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.style.padding = '12px 0';
      header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
      if (window.innerWidth > 768) {
        header.style.padding = '24px 0';
      } else {
        header.style.padding = '16px 0';
      }
      header.style.background = 'rgba(10, 10, 10, 0.9)';
    }
  });
  
  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          // Close mobile nav if open
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            document.body.classList.remove('nav-open');
          }
          
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });
  
  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (isValidEmail(email)) {
        // In a real application, you would send this to your server
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }
});

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Add active class to current page in navigation
document.addEventListener('DOMContentLoaded', function() {
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    if (currentLocation.includes(linkPath) && linkPath !== 'index.html') {
      link.classList.add('active');
    } else if (currentLocation.endsWith('/') && linkPath === 'index.html') {
      link.classList.add('active');
    }
  });
});