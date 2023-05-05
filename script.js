// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Toggle mobile navigation
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-active');
});

// Contact form submission
const form = document.querySelector('#contact-form');
const nameInput = document.querySelector('#name');
const emailInput = document.querySelector('#email');
const messageInput = document.querySelector('#message');
const formMessage = document.querySelector('#form-message');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('name', nameInput.value);
  formData.append('email', emailInput.value);
  formData.append('message', messageInput.value);

  fetch('/submit-form.php', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      formMessage.textContent = 'Thanks for contacting me! I will get back to you soon.';
      formMessage.style.color = '#007bff';
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
    } else {
      formMessage.textContent = 'There was a problem submitting the form. Please try again later.';
      formMessage.style.color = 'red';
    }
  })
  .catch(error => {
    console.error(error);
    formMessage.textContent = 'There was a problem submitting the form. Please try again later.';
    formMessage.style.color = 'red';
  });
});
