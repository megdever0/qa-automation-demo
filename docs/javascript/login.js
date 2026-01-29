const form = document.getElementById("login-form");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const successMessage = document.getElementById("success-message");

// Only run login code if form exists
if(form) {
  function validatePassword(password) {
    const minLength = 12;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

    if (password.length < minLength) {
      return { valid: false, error: 'Password must be at least 12 characters long' };
    }
    if (!hasNumber) {
      return { valid: false, error: 'Password must contain at least 1 number' };
    }
    if (!hasUppercase) {
      return { valid: false, error: 'Password must contain at least 1 uppercase letter' };
    }
    if (!hasSpecialChar) {
      return { valid: false, error: 'Password must contain at least 1 special character' };
    }

    return { valid: true };
  }

  form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    // Clear previous errors
    document.querySelectorAll(".error-message").forEach(el => el.textContent = "");

    // Username validation
    const username = usernameInput.value.trim();
    if(username.length < 4) {
      usernameInput.nextElementSibling.textContent = "Username must be at least 4 characters.";
      valid = false;
    }

    // Password validation
    const password = passwordInput.value.trim();
    const passwordValidation = validatePassword(password);
    if(!passwordValidation.valid) {
      passwordInput.nextElementSibling.textContent = passwordValidation.error;
      valid = false;
    }

    if(valid) {
      successMessage.style.display = "block";
      // Store username in sessionStorage and redirect to welcome page after 3 seconds
      const username = usernameInput.value.trim();
      sessionStorage.setItem('username', username);
      setTimeout(() => {
        window.location.href = 'welcome.html';
      }, 3000);
    } else {
      successMessage.style.display = "none";
    }
  });
}
