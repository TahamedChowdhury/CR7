document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value.trim();
      
      // Validate form
      if (!name || !email || !subject || !message) {
        showFormStatus('Please fill out all fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showFormStatus('Please enter a valid email address.', 'error');
        return;
      }
      
      // In a real application, you would send this data to your server
      // For demo purposes, we'll just simulate a successful submission
      
      // Show loading status
      showFormStatus('Sending message...', 'pending');
      
      // Simulate API call
      setTimeout(() => {
        // Success response
        showFormStatus('Thank you! Your message has been sent successfully.', 'success');
        contactForm.reset();
        
        // Hide the success message after 5 seconds
        setTimeout(() => {
          if (formStatus) {
            formStatus.classList.add('hidden');
          }
        }, 5000);
      }, 1500);
    });
  }
  
  // Function to display form status
  function showFormStatus(message, status) {
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.classList.remove('hidden', 'success', 'error', 'pending');
      formStatus.classList.add(status);
    }
  }
  
  // Email validation
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
});