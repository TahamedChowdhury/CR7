document.addEventListener('DOMContentLoaded', function() {
  // FAQ Toggle functionality
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    if (question) {
      question.addEventListener('click', () => {
        // Close other items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });
  
  // Category switching
  const categoryButtons = document.querySelectorAll('.category-btn');
  const faqLists = document.querySelectorAll('.faq-list');
  
  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-category');
      
      // Update active button
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Show corresponding FAQ list
      faqLists.forEach(list => {
        list.classList.add('hidden');
        if (list.id === category) {
          list.classList.remove('hidden');
        }
      });
    });
  });
  
  // Search functionality
  const searchInput = document.getElementById('faq-search');
  
  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const searchTerm = searchInput.value.toLowerCase().trim();
      
      if (searchTerm.length > 2) {
        // Show all FAQ lists when searching
        faqLists.forEach(list => list.classList.remove('hidden'));
        
        // Update active category button
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        
        // Filter questions
        faqItems.forEach(item => {
          const question = item.querySelector('h3').textContent.toLowerCase();
          const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
          
          if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      } else if (searchTerm.length === 0) {
        // Reset to default view when search is cleared
        resetFaqView();
        
        // Activate first category
        if (categoryButtons.length > 0) {
          categoryButtons[0].click();
        }
      }
    });
  }
  
  // Check for hash in URL to open specific section
  function checkUrlHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      // Find the category button that matches the hash
      const categoryBtn = document.querySelector(`[data-category="${hash}"]`);
      if (categoryBtn) {
        categoryBtn.click();
      }
      
      // Find the specific question that matches the ID
      const questionElement = document.getElementById(hash);
      if (questionElement) {
        // Find the parent FAQ item
        const faqItem = questionElement.closest('.faq-item');
        if (faqItem) {
          // Make sure the category is visible
          const categoryList = faqItem.closest('.faq-list');
          if (categoryList) {
            faqLists.forEach(list => list.classList.add('hidden'));
            categoryList.classList.remove('hidden');
            
            // Update category buttons
            const categoryId = categoryList.id;
            categoryButtons.forEach(btn => {
              btn.classList.remove('active');
              if (btn.getAttribute('data-category') === categoryId) {
                btn.classList.add('active');
              }
            });
          }
          
          // Open the FAQ item
          faqItem.classList.add('active');
          
          // Scroll to it
          setTimeout(() => {
            questionElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 300);
        }
      }
    }
  }
  
  // Reset FAQ view
  function resetFaqView() {
    faqItems.forEach(item => {
      item.style.display = 'block';
    });
  }
  
  // Run hash check on page load
  checkUrlHash();
  
  // Listen for hash changes
  window.addEventListener('hashchange', checkUrlHash);
});