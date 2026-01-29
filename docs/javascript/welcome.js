/* Smooth scroll for anchor links */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

/* Dark mode toggle */
const toggle = document.getElementById('theme-toggle');

// Check stored preference
if(localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');

    if(document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

/* Extract username from sessionStorage on welcome page */
const storedUsername = sessionStorage.getItem('username');

if(storedUsername) {
  const welcomeMessage = document.getElementById('welcome-message');
  if(welcomeMessage) {
    welcomeMessage.innerHTML = `You have successfully logged in with username <strong>${storedUsername}</strong>`;
  }
}
