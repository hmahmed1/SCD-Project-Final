// Toggle between login, signup, and forgot password forms
function showLogin() {
  document.getElementById("login-form").classList.add("active");
  document.getElementById("signup-form").classList.remove("active");
  document.getElementById("forgot-password-form").classList.remove("active");
}

function showSignup() {
  document.getElementById("login-form").classList.remove("active");
  document.getElementById("signup-form").classList.add("active");
  document.getElementById("forgot-password-form").classList.remove("active");
}

function showForgotPassword() {
  document.getElementById("login-form").classList.remove("active");
  document.getElementById("signup-form").classList.remove("active");
  document.getElementById("forgot-password-form").classList.add("active");
}

// Validate email format
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

// Validate password complexity
function validatePassword(password) {
  const passwordPattern =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordPattern.test(password);
}
// Real-time password strength feedback
const passwordInput = document.getElementById("signup-password");
const feedback = document.getElementById("password-feedback");

if (passwordInput) {
  passwordInput.addEventListener("input", function () {
    const password = passwordInput.value;
    const strength = getPasswordStrength(password);
    feedback.textContent = strength.message;
    feedback.style.color = strength.color;
  });
}

// Function to evaluate password strength
function getPasswordStrength(password) {
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[@$!%*?&]/.test(password);

  if (password.length === 0) return { message: "", color: "gray" };

  let score = 0;
  if (password.length >= 8) score++;
  if (hasUpper) score++;
  if (hasLower) score++;
  if (hasNumber) score++;
  if (hasSpecial) score++;

  if (score <= 2) return { message: "Weak password", color: "yellow" };
  if (score <= 4) return { message: "Moderate password", color: "yellow" };
  return { message: "Strong password", color: "yellow" };
}


// Validate phone number format
function validatePhone(phone) {
  const phonePattern = /^\d{10}$/;
  return phonePattern.test(phone);
}

// Login functionality
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Login successful!");
          // Redirect to the saved redirect path or home page
          const redirectPath = localStorage.getItem("redirectPath") || "/";
          localStorage.removeItem("redirectPath"); // Clear redirect path after use
          window.location.href = redirectPath;
        }
      })
      .catch((error) => {
        console.error("Error logging in:", error);
        alert("Error logging in. Please try again later.");
      });
  });

// Signup functionality
document
  .getElementById("signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const phone = document.getElementById("signup-phone").value;

    // Check email format
    if (!validateEmail(email)) {
      alert("Please enter a valid email.");
      return;
    }

    // Check password complexity
    if (!validatePassword(password)) {
      alert(
        "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
      );
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Check phone format
    if (!validatePhone(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const userData = {
      username,
      email,
      password,
      phone,
    };

    try {
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "An error occurred during signup");
        return;
      }

      alert("Sign up successful! Redirecting to login form...");
document.getElementById("signup-form").classList.remove("active"); // hide signup
document.getElementById("login-form").classList.add("active"); // show login

    } catch (err) {
      console.error("Error signing up:", err);
      alert("An error occurred. Please try again later.");
    }
  });

// Forgot password functionality
document
  .getElementById("forgot-password-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("reset-email").value;
    const newPassword = document.getElementById("reset-password").value;

    if (!email || !newPassword) {
      alert("Email and new password are required.");
      return;
    }

    if (!validatePassword(newPassword)) {
      alert(
        "Password must be at least 8 characters long and include one uppercase letter, one number, and one special character."
      );
      return;
    }

    fetch("/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, newPassword }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert(
            "Password reset successful! Please log in with your new password."
          );
          showLogin();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while resetting your password.");
      });
  });


  // Delete account functionality
document
.getElementById("delete-account-btn")
.addEventListener("click", async function (event) {
  event.preventDefault();

  const email = document.getElementById("login-email").value;

  if (!email) {
    alert("Please enter your email to delete your account.");
    return;
  }

  const confirmation = confirm(
    "Are you sure you want to delete your account? This action cannot be undone."
  );

  if (!confirmation) return;

  try {
    const response = await fetch("/auth/delete-account", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "An error occurred while deleting your account.");
      return;
    }

    alert("Your account has been successfully deleted.");
    window.location.href = "/";
  } catch (err) {
    console.error("Error deleting account:", err);
    alert("An error occurred. Please try again later.");
  }
});

// Initial toggle to show the login form
showLogin();
