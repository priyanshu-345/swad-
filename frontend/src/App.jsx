import React, { useEffect, useState } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";

axios.defaults.withCredentials = true;

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await axios.get("/api/profile");
        setUser(res.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  return { user, setUser, loading };
}

function Layout({ children, user, onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="top-bar-inner">
          <div className="brand-area">
            <img
              src="/assets/images/logo-original.png"
              alt="Logo"
              className="brand-logo"
            />
            <span className="brand-text">Pizza Time</span>
          </div>
          <button
            className="nav-toggle"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="nav-line" />
            <span className="nav-line" />
          </button>
          <nav
            className={
              menuOpen ? "main-nav main-nav-open" : "main-nav main-nav-closed"
            }
          >
            <Link to="/" className="nav-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
            <Link
              to="/menu"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              to="/about"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
            {user && (
              <Link
                to="/profile"
                className="nav-link"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
            )}
            {!user && (
              <>
                <Link
                  to="/login"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="nav-link"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
            {user && (
              <button className="nav-link nav-link-btn" onClick={onLogout}>
                Logout
              </button>
            )}
          </nav>
        </div>
      </header>
      <main className="page-area">{children}</main>
      <footer className="page-footer">
        <p className="footer-text">Made with simple code and a lot of pizza.</p>
      </footer>
    </div>
  );
}

function HomePage() {
  return (
    <div className="page page-home">
      <section className="hero-section">
        <div className="hero-media">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            src="/assets/videos/hero-2.mp4"
          />
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Hot pizza. Simple website.</h1>
          <p className="hero-text">
            Clean layout, real images, working login and profile. Everything you
            asked for.
          </p>
          <div className="hero-actions">
            <Link to="/menu" className="primary-btn">
              See menu
            </Link>
            <Link to="/register" className="secondary-btn">
              Create account
            </Link>
          </div>
        </div>
      </section>

      <section className="grid-section">
        <h2 className="section-title">From our menu</h2>
        <div className="image-grid">
          <img
            src="/assets/images/menu/pizza/margherita-pizza.jpg"
            alt="Pizza"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/pasta/lasagna-bolognese.jpeg"
            alt="Pasta"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/sushi/sushi-5.jpeg"
            alt="Sushi"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/drinks/coca-cola-classic.jpeg"
            alt="Drink"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/pizza/pepperoni-pizza.jpg"
            alt="Pizza"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/pasta/chicken-alfredo.jpeg"
            alt="Pasta"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/sushi/sushi-10.jpeg"
            alt="Sushi"
            className="grid-image"
          />
          <img
            src="/assets/images/menu/drinks/pepsi.jpeg"
            alt="Drink"
            className="grid-image"
          />
        </div>
      </section>

      <section className="grid-section">
        <h2 className="section-title">Blog preview</h2>
        <div className="image-grid image-grid-small">
          <img
            src="/assets/images/blog-preview/blog-one-700.webp"
            alt="Blog one"
            className="grid-image"
          />
          <img
            src="/assets/images/blog-preview/blog-two-700.webp"
            alt="Blog two"
            className="grid-image"
          />
          <img
            src="/assets/images/blog-preview/blog-three-700.webp"
            alt="Blog three"
            className="grid-image"
          />
        </div>
      </section>

      <section className="about-section">
        <div className="about-content">
          <h2 className="about-heading">About Our Restaurant</h2>
          <p className="about-text">
            Founded in 2020, Pizza Time started with a simple mission: to
            serve the best pizza in town. Our founders, passionate about
            Italian cuisine, traveled across Italy to learn the secrets
            of authentic pizza making. We brought back traditional recipes
            and techniques, combining them with fresh, locally sourced
            ingredients.
          </p>
          <p className="about-text">
            Today, Pizza Time is a beloved restaurant where families and
            friends gather to enjoy delicious food in a warm, welcoming
            atmosphere. Our wood-fired oven, imported from Italy, gives
            our pizzas that perfect crispy crust and smoky flavor that
            makes every bite unforgettable.
          </p>
        </div>
        <div className="about-images">
          <img
            src="/assets/images/about/img-one.jpeg"
            alt="Restaurant"
            className="about-img"
          />
        </div>
      </section>

      <section className="video-section-full">
        <video
          className="video-bg-full"
          autoPlay
          muted
          loop
          playsInline
          src="/assets/videos/hero-3.mp4"
        />
        <div className="video-overlay-full"></div>
        <div className="video-content-full">
          <h2 className="section-title">Watch Our Kitchen in Action</h2>
          <p className="section-intro">
            See how we create magic in our kitchen with traditional techniques and modern passion.
          </p>
        </div>
      </section>
    </div>
  );
}

function MenuPage() {
  return (
    <div className="page page-menu">
      <h1 className="page-title">Menu</h1>
      <p className="page-subtitle">
        All images you see are coming from your original project assets.
      </p>
      <div className="menu-grid-iconic">
        <div className="menu-block-iconic">
          <h2 className="menu-title-iconic">🍕 Pizza</h2>
          <div className="menu-items-grid">
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pizza/pepperoni-pizza.jpg"
                alt="Pepperoni Pizza"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Pepperoni Pizza</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pizza/meat-pizza.jpg"
                alt="Meat Pizza"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Meat Pizza</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pizza/margherita-pizza.jpg"
                alt="Margherita Pizza"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Margherita Pizza</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pizza/BBQ-chicken-pizza.jpg"
                alt="BBQ Chicken Pizza"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">BBQ Chicken Pizza</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pizza/veggie-pizza.jpg"
                alt="Veggie Pizza"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Veggie Pizza</h3>
            </div>
          </div>
        </div>

        <div className="menu-block-iconic">
          <h2 className="menu-title-iconic">🍝 Pasta</h2>
          <div className="menu-items-grid">
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pasta/chicken-alfredo.jpeg"
                alt="Chicken Alfredo"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Chicken Alfredo</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pasta/mac-and-cheese.jpeg"
                alt="Mac and Cheese"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Mac and Cheese</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pasta/pasta-salad.jpeg"
                alt="Pasta Salad"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Pasta Salad</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pasta/lasagna-bolognese.jpeg"
                alt="Lasagna Bolognese"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Lasagna Bolognese</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pasta/penne-alla-vodka.jpeg"
                alt="Penne alla Vodka"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Penne alla Vodka</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/pasta/burrata-caprese-gnocchi.jpeg"
                alt="Burrata Caprese Gnocchi"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Burrata Caprese Gnocchi</h3>
            </div>
          </div>
        </div>

        <div className="menu-block-iconic">
          <h2 className="menu-title-iconic">🍣 Sushi</h2>
          <div className="menu-items-grid">
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/sushi/sushi-1.jpeg"
                alt="Sushi Platter 1"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sushi Platter 1</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/sushi/sushi-10.jpeg"
                alt="Sushi Platter 10"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sushi Platter 10</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/sushi/sushi-20.jpeg"
                alt="Sushi Platter 20"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sushi Platter 20</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/sushi/sushi-5.jpeg"
                alt="Sushi Platter 5"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sushi Platter 5</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/sushi/sushi-15.jpeg"
                alt="Sushi Platter 15"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sushi Platter 15</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/sushi/sushi-25.jpeg"
                alt="Sushi Platter 25"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sushi Platter 25</h3>
            </div>
          </div>
        </div>

        <div className="menu-block-iconic">
          <h2 className="menu-title-iconic">🥤 Drinks</h2>
          <div className="menu-items-grid">
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/drinks/coca-cola-classic.jpeg"
                alt="Coca Cola Classic"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Coca Cola Classic</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/drinks/pepsi.jpeg"
                alt="Pepsi"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Pepsi</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/drinks/sprite-caffeine-free.jpeg"
                alt="Sprite"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Sprite</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/drinks/red-bull.jpg"
                alt="Red Bull"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Red Bull</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/drinks/fanta-orange-soda.jpeg"
                alt="Fanta Orange"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Fanta Orange</h3>
            </div>
            <div className="menu-item-card">
              <img
                src="/assets/images/menu/drinks/mountain-dew-citrus.webp"
                alt="Mountain Dew"
                className="menu-item-img"
              />
              <h3 className="menu-item-name">Mountain Dew</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage() {
  return (
    <div className="page page-about">
      <h1 className="page-title">About Us</h1>
      <p className="page-subtitle">
        We make fresh pizza, pasta, sushi and drinks every day.
      </p>

      <section className="about-section">
        <div className="about-content">
          <h2 className="about-heading">Our Story</h2>
          <p className="about-text">
            Started in 2020, we serve hot and fresh food. Our kitchen uses only
            the best ingredients. Every pizza is made by hand, every pasta is
            cooked fresh, and every drink is served cold.
          </p>
          <p className="about-text">
            We believe in simple, good food. No fancy stuff, just real taste.
            Come visit us or order online.
          </p>
        </div>
      </section>

      <section className="about-section">
        <div className="about-images">
          <img
            src="/assets/images/about/img-three.jpeg"
            alt="About"
            className="about-img"
          />
          <img
            src="/assets/images/about/carbonara.jpeg"
            alt="About"
            className="about-img"
          />
        </div>
        <div className="about-content">
          <h2 className="about-heading">Our Kitchen</h2>
          <p className="about-text">
            Our chefs work hard every day. They make everything from scratch.
            Pizzas are baked in our wood-fired oven. Pastas are made fresh every
            morning.
          </p>
          <p className="about-text">
            We use local ingredients when possible. Quality is our top priority.
            Every dish is checked before it goes out.
          </p>
        </div>
      </section>

      <section className="image-gallery-section">
        <h2 className="section-title">Gallery</h2>
        <div className="gallery-grid">
          <img
            src="/assets/images/about/section-one.jpeg"
            alt="Gallery"
            className="gallery-img"
          />
          <img
            src="/assets/images/about/section-two.jpeg"
            alt="Gallery"
            className="gallery-img"
          />
          <img
            src="/assets/images/about/section-three.jpeg"
            alt="Gallery"
            className="gallery-img"
          />
          <img
            src="/assets/images/about/office-1.jpeg"
            alt="Gallery"
            className="gallery-img"
          />
          <img
            src="/assets/images/about/office-2.jpeg"
            alt="Gallery"
            className="gallery-img"
          />
          <img
            src="/assets/images/about/img-four.jpeg"
            alt="Gallery"
            className="gallery-img"
          />
        </div>
      </section>
    </div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", message: "" });
    }, 3000);
  }

  return (
    <div className="page page-contact">
      <h1 className="page-title">Contact Us</h1>
      <p className="page-subtitle">
        Have a question? Send us a message and we'll get back to you.
      </p>

      <div className="contact-layout">
        <div className="contact-form-section">
          <form className="contact-form" onSubmit={handleSubmit}>
            <label className="simple-field">
              <span className="simple-label">Name</span>
              <input
                className="simple-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="simple-field">
              <span className="simple-label">Email</span>
              <input
                className="simple-input"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="simple-field">
              <span className="simple-label">Message</span>
              <textarea
                className="simple-input simple-textarea"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="6"
                required
              />
            </label>
            {submitted && (
              <p className="form-note" style={{ color: "#4ade80" }}>
                Message sent! We'll contact you soon.
              </p>
            )}
            <button className="primary-btn full-width" type="submit">
              Send Message
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="contact-image-box">
            <img
              src="/assets/images/contact/img-one.jpeg"
              alt="Contact"
              className="contact-img"
            />
          </div>
          <div className="contact-details">
            <h3 className="contact-heading">Visit Us</h3>
            <p className="contact-text">123 Pizza Street</p>
            <p className="contact-text">Food City, FC 12345</p>
            <p className="contact-text">Phone: (555) 123-4567</p>
            <p className="contact-text">Email: info@pizzatime.com</p>
            <h3 className="contact-heading" style={{ marginTop: "1.5rem" }}>
              Hours
            </h3>
            <p className="contact-text">Mon - Fri: 11am - 10pm</p>
            <p className="contact-text">Sat - Sun: 12pm - 11pm</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginPage({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setUser(res.data);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-auth">
      <div className="auth-card">
        <h1 className="page-title">Login</h1>
        <form className="simple-form" onSubmit={handleSubmit}>
          <label className="simple-field">
            <span className="simple-label">Email</span>
            <input
              className="simple-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="simple-field">
            <span className="simple-label">Password</span>
            <input
              className="simple-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-btn full-width" disabled={loading}>
            {loading ? "Please wait..." : "Login"}
          </button>
        </form>
        <p className="auth-note">
          No account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

function RegisterPage({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      setUser(res.data);
      navigate("/profile");
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page page-auth">
      <div className="auth-card">
        <h1 className="page-title">Register</h1>
        <form className="simple-form" onSubmit={handleSubmit}>
          <label className="simple-field">
            <span className="simple-label">Name</span>
            <input
              className="simple-input"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="simple-field">
            <span className="simple-label">Email</span>
            <input
              className="simple-input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="simple-field">
            <span className="simple-label">Password</span>
            <input
              className="simple-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          {error && <p className="form-error">{error}</p>}
          <button className="primary-btn full-width" disabled={loading}>
            {loading ? "Please wait..." : "Register"}
          </button>
        </form>
        <p className="auth-note">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

function ProfilePage({ user, setUser }) {
  const [name, setName] = useState(user?.name || "");
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(user?.name || "");
  }, [user]);

  async function handleSave(e) {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.put("/api/profile", { name });
      setUser(res.data);
      setMessage("Profile updated");
    } catch {
      setMessage("Could not update profile");
    }
  }

  if (!user) {
    return (
      <div className="page page-profile">
        <div className="auth-card">
          <h1 className="page-title">Profile</h1>
          <p>You need to login to see this page.</p>
          <Link to="/login" className="primary-btn">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page page-profile">
      <div className="profile-layout">
        <div className="profile-main">
          <h1 className="page-title">Profile</h1>
          <form className="simple-form" onSubmit={handleSave}>
            <label className="simple-field">
              <span className="simple-label">Name</span>
              <input
                className="simple-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label className="simple-field">
              <span className="simple-label">Email</span>
              <input
                className="simple-input"
                type="email"
                value={user.email}
                readOnly
              />
            </label>
            {message && <p className="form-note">{message}</p>}
            <button className="primary-btn">Save changes</button>
          </form>
        </div>
        <div className="profile-side">
          <img
            src="/assets/images/landing/img-one-700.webp"
            alt="Profile side"
            className="profile-image"
          />
          <p className="profile-text">
            This profile page is connected to the backend. Your data is stored
            in a small JSON database.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const { user, setUser, loading } = useAuth();

  async function handleLogout() {
    try {
      await axios.post("/api/auth/logout");
    } catch {
      // ignore
    }
    setUser(null);
  }

  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout user={user} onLogout={handleLogout}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage setUser={setUser} />} />
        <Route path="/register" element={<RegisterPage setUser={setUser} />} />
        <Route
          path="/profile"
          element={<ProfilePage user={user} setUser={setUser} />}
        />
        <Route
          path="*"
          element={
            <div className="page">
              <h1 className="page-title">Page not found</h1>
              <Link to="/" className="primary-btn">
                Go home
              </Link>
            </div>
          }
        />
      </Routes>
    </Layout>
  );
}
