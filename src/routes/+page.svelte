<script>
  import { fade, fly, slide } from 'svelte/transition';
  import { onMount } from 'svelte';

  export let data;

  let message = data?.message ?? '';
  let messageType = data?.messageType ?? '';
  let showPopup = !!message;

  onMount(() => {
    if (showPopup) {
      setTimeout(() => { showPopup = false; }, 2000);
    }
  });
</script>

<svelte:head>
  <title>Ayush Café</title>
  <link rel="icon" type="image/png" href="/static/favicon.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</svelte:head>

<nav>
  <a href="/" class="logo"><h2>Ayush Café</h2></a>
  <div>
    <a href="/">Home</a>
    <a href="/#about">About Us</a>
    <a href="/menu">Menu</a>
    <a href="/#contact">Contact</a>
    <a href="/cart">CART</a>
  </div>
</nav>

<!-- MESSAGE POPUP -->
{#if showPopup}
  <div
    class="popup {messageType}"
    transition:fly={{ x: 100, duration: 400 }}
  >
    {message}
  </div>
{/if}

<!-- HOME -->
<section id="home" class="hero-section">
  <div class="hero-image" in:fly={{ x: -60, duration: 700, delay: 100 }}>
    <img src="/cafe.jpg" alt="Ayush Café interior">
  </div>
  <div class="hero-content" in:fly={{ x: 60, duration: 700, delay: 200 }}>
    <h1>Welcome to Ayush Café</h1>
    <p>Where Coffee Meets Comfort</p>
    <a href="/menu" class="explore-btn">Explore Menu</a>
  </div>
</section>

<!-- ABOUT -->
<section id="about" class="about-section">
  <div class="about-container">
    <div class="about-text" in:fly={{ y: 40, duration: 600 }}>
      <h1>About Ayush Café</h1>
      <p>Ayush Café was created with one simple idea — bring people together over a perfect cup of coffee.</p>
      <p>We believe coffee is not just a drink. It's an experience, a conversation starter, and a moment of comfort.</p>
      <p>From freshly brewed espresso to creamy cappuccino, every cup is made with passion.</p>
    </div>
    <div class="about-image" in:fly={{ y: 40, duration: 600, delay: 150 }}>
      <img src="/inside.jpg" alt="Ayush Café interior">
    </div>
  </div>
</section>

<!-- CONTACT -->
<section id="contact" class="contact-section">
  <h1>Contact Us</h1>
  <form class="contact-form" method="POST" action="/?/contact">
    <label for="name">Your Name</label>
    <input type="text" id="name" name="name" placeholder="Your Name" required>
    <label for="email">Your Email</label>
    <input type="email" id="email" name="email" placeholder="Your Email" required>
    <label for="message">Your Message</label>
    <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
    <button type="submit" name="contact_submit">Send Message</button>
  </form>
</section>

<!-- FOOTER -->
<footer class="footer">
  <div class="footer-container">
    <div class="footer-brand">
      <h3>Ayush Café ☕</h3>
      <p>Fresh Coffee. Cozy Moments.</p>
    </div>
    <div class="footer-links">
      <h4>Quick Links</h4>
      <a href="/">Home</a>
      <a href="/menu">Menu</a>
      <a href="/#about">About Us</a>
      <a href="/#contact">Contact</a>
    </div>
    <div class="footer-social">
      <h4>Follow Us</h4>
      <div class="social-icons">
        <a aria-label='link' href="https://www.facebook.com/ayush.ghonday.gurung" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
        <a aria-label='link' href="https://www.instagram.com/ayush_on_lead/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        <a aria-label="link" href="https://www.youtube.com/@mrlemon4807" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">© 2026 Ayush Café. All Rights Reserved.</div>
</footer>
