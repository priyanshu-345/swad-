// Cart functionality
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountEl = document.getElementById("cartCount");
  if (cartCountEl) {
    cartCountEl.textContent = count;
  }
}

function updateCartDisplay() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  if (cart.length === 0) {
    cartItems.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
    cartTotal.textContent = "$0.00";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart
    .map((item, index) => {
      const itemTotal = item.price * item.quantity;
      total += itemTotal;
      return `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" />
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <p class="cart-item-price">$${item.price.toFixed(2)}</p>
          </div>
          <div class="cart-item-controls">
            <button class="cart-qty-btn" onclick="updateQuantity(${index}, -1)">-</button>
            <span class="cart-qty">${item.quantity}</span>
            <button class="cart-qty-btn" onclick="updateQuantity(${index}, 1)">+</button>
            <button class="cart-remove-btn" onclick="removeFromCart(${index})">×</button>
          </div>
        </div>
      `;
    })
    .join("");

  cartTotal.textContent = `$${total.toFixed(2)}`;
}

window.updateQuantity = function (index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
};

window.removeFromCart = function (index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  updateCartDisplay();
};

// Toast Notification Function
function showToast(message, type = "info", title = "") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  const icons = {
    success: "✅",
    error: "❌",
    info: "ℹ️",
    warning: "⚠️"
  };

  const titles = {
    success: title || "Success",
    error: title || "Error",
    info: title || "Info",
    warning: title || "Warning"
  };

  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <div class="toast-content">
      ${title ? `<div class="toast-title">${titles[type]}</div>` : ""}
      <div class="toast-message">${message}</div>
    </div>
    <button class="toast-close" onclick="this.parentElement.remove()">×</button>
  `;

  container.appendChild(toast);

  // Auto remove after 5 seconds
  setTimeout(() => {
    toast.classList.add("fade-out");
    setTimeout(() => {
      if (toast.parentElement) {
        toast.remove();
      }
    }, 300);
  }, 5000);
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  // Add to cart
  document.querySelectorAll(".add-to-cart-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const card = btn.closest(".order-item-card");
      if (!card) return;
      
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const image = card.dataset.image;

      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, image, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();

      // Show notification
      btn.textContent = "Added!";
      setTimeout(() => {
        btn.textContent = "Add to Cart";
      }, 1000);
    });
  });

  // Cart sidebar toggle
  const cartBtn = document.getElementById("cartBtn");
  const cartClose = document.getElementById("cartClose");
  const cartOverlay = document.getElementById("cartOverlay");
  const checkoutBtn = document.getElementById("checkoutBtn");

  if (cartBtn) {
    cartBtn.addEventListener("click", () => {
      const sidebar = document.getElementById("cartSidebar");
      if (sidebar) {
        sidebar.classList.add("cart-sidebar-open");
      }
      if (cartOverlay) {
        cartOverlay.classList.add("cart-overlay-active");
      }
      updateCartDisplay();
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", () => {
      const sidebar = document.getElementById("cartSidebar");
      if (sidebar) {
        sidebar.classList.remove("cart-sidebar-open");
      }
      if (cartOverlay) {
        cartOverlay.classList.remove("cart-overlay-active");
      }
    });
  }

  if (cartOverlay) {
    cartOverlay.addEventListener("click", () => {
      const sidebar = document.getElementById("cartSidebar");
      if (sidebar) {
        sidebar.classList.remove("cart-sidebar-open");
      }
      cartOverlay.classList.remove("cart-overlay-active");
    });
  }

  // Checkout
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      if (cart.length === 0) {
        showToast("Your cart is empty! Please add items before checkout.", "error", "Empty Cart");
        return;
      }
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
      showToast(`Order placed successfully! Total: $${total}`, "success", "Order Confirmed");
      cart = [];
      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartCount();
      updateCartDisplay();
      const sidebar = document.getElementById("cartSidebar");
      if (sidebar) {
        sidebar.classList.remove("cart-sidebar-open");
      }
      if (cartOverlay) {
        cartOverlay.classList.remove("cart-overlay-active");
      }
    });
  }

  updateCartCount();

  // Smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth";

  // Nav toggle
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      if (mainNav.classList.contains("main-nav-closed")) {
        mainNav.classList.remove("main-nav-closed");
      } else {
        mainNav.classList.add("main-nav-closed");
      }
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 800) {
          mainNav.classList.add("main-nav-closed");
        }
      });
    });
  }

  // Scroll indicator animation
  const scrollIndicator = document.querySelector(".scroll-indicator");
  if (scrollIndicator) {
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
      const currentScroll = window.pageYOffset;
      if (currentScroll > 100) {
        scrollIndicator.style.opacity = "0";
        scrollIndicator.style.transform = "translateY(-20px)";
      } else {
        scrollIndicator.style.opacity = "1";
        scrollIndicator.style.transform = "translateY(0)";
      }
      lastScroll = currentScroll;
    });
  }

  // Auth forms
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const loginError = document.getElementById("loginError");
  const registerError = document.getElementById("registerError");
  const profileStatus = document.getElementById("profileStatus");
  const profileForm = document.getElementById("profileForm");
  const profileName = document.getElementById("profileName");
  const profileEmail = document.getElementById("profileEmail");
  const profileMessage = document.getElementById("profileMessage");
  const logoutBtn = document.getElementById("logoutBtn");
  const contactForm = document.getElementById("contactForm");
  const contactMessage = document.getElementById("contactMessage");

  async function fetchProfile() {
    if (!profileStatus || !profileForm) return;
    profileStatus.textContent = "Loading profile...";
    profileForm.style.display = "none";
    const notLoggedIn = document.getElementById("notLoggedIn");
    try {
      const res = await fetch("/api/profile", {
        credentials: "include",
      });
      if (!res.ok) {
        profileStatus.textContent = "Not logged in. Please login first.";
        if (notLoggedIn) notLoggedIn.style.display = "block";
        return;
      }
      const data = await res.json();
      if (profileName) profileName.value = data.name || "";
      if (profileEmail) profileEmail.value = data.email || "";
      profileStatus.textContent = "You are logged in.";
      profileForm.style.display = "block";
      if (notLoggedIn) notLoggedIn.style.display = "none";
    } catch (e) {
      profileStatus.textContent =
        "Could not load profile. Please try again later.";
      if (notLoggedIn) notLoggedIn.style.display = "block";
    }
  }

  if (profileStatus && profileForm) {
    fetchProfile();
  }

  if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (loginError) {
        loginError.style.display = "none";
      }
      const formData = new FormData(loginForm);
      const body = {
        email: formData.get("email"),
        password: formData.get("password"),
      };
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          if (loginError) {
            loginError.textContent = err.message || "Login failed";
            loginError.style.display = "block";
          }
          return;
        }
        await fetchProfile();
        // Redirect to profile page after successful login
        window.location.href = "profile.html";
      } catch (err) {
        if (loginError) {
          loginError.textContent = "Login failed";
          loginError.style.display = "block";
        }
      }
    });
  }

  if (registerForm) {
    registerForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (registerError) {
        registerError.style.display = "none";
      }
      const formData = new FormData(registerForm);
      const body = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };
      try {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          if (registerError) {
            registerError.textContent = err.message || "Register failed";
            registerError.style.display = "block";
          }
          return;
        }
        await fetchProfile();
        // Redirect to profile page after successful register
        window.location.href = "profile.html";
      } catch (err) {
        if (registerError) {
          registerError.textContent = "Register failed";
          registerError.style.display = "block";
        }
      }
    });
  }

  if (profileForm) {
    profileForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (profileMessage) {
        profileMessage.textContent = "";
      }
      const body = { name: profileName ? profileName.value : "" };
      try {
        const res = await fetch("/api/profile", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(body),
        });
        if (!res.ok) {
          if (profileMessage) {
            profileMessage.textContent = "Could not update profile";
          }
          return;
        }
        if (profileMessage) {
          profileMessage.textContent = "Profile updated successfully!";
        }
      } catch (err) {
        if (profileMessage) {
          profileMessage.textContent = "Could not update profile";
        }
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
      try {
        await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        });
      } catch (e) {}
      if (profileForm) {
        profileForm.style.display = "none";
      }
      if (profileStatus) {
        profileStatus.textContent = "You are logged out.";
      }
      const notLoggedIn = document.getElementById("notLoggedIn");
      if (notLoggedIn) notLoggedIn.style.display = "block";
      // Redirect to home page after logout
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1000);
    });
  }

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (contactMessage) {
        contactMessage.style.display = "block";
      }
      contactForm.reset();
      setTimeout(() => {
        if (contactMessage) contactMessage.style.display = "none";
      }, 3000);
    });
  }

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  document.querySelectorAll(".content-block, .order-item-card, .feature-card").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });
});

// Toggle menu section function
window.toggleMenuSection = function(button) {
  const content = button.nextElementSibling;
  const icon = button.querySelector('.menu-collapsible-icon');
  
  if (content.classList.contains('open')) {
    content.classList.remove('open');
    button.classList.remove('active');
    icon.textContent = '▼';
  } else {
    content.classList.add('open');
    button.classList.add('active');
    icon.textContent = '▲';
  }
};

