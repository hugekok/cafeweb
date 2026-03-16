<script>
  import { fade, fly, slide } from "svelte/transition";
  import { onMount } from "svelte";
  import { enhance } from "$app/forms";

  export let data;

  let message = data?.message ?? "";
  let messageType = data?.messageType ?? "";
  let showPopup = !!message;

  let name = "";
  let email = "";
  let messageText = "";
  let isSubmitting = false;

  let errors = {
    name: "",
    email: "",
    message: "",
  };

  function validateForm() {
    let valid = true;
    errors = { name: "", email: "", message: "" };

    if (!name.trim()) {
      errors.name = "Name is required";
      valid = false;
    } else if (name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      valid = false;
    }

    if (!email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "Please enter a valid email";
      valid = false;
    }

    if (!messageText.trim()) {
      errors.message = "Message is required";
      valid = false;
    } else if (messageText.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
      valid = false;
    }

    return valid;
  }

  function resetForm() {
    name = "";
    email = "";
    messageText = "";
    errors = { name: "", email: "", message: "" };
  }

  onMount(() => {
    if (showPopup) {
      setTimeout(() => {
        showPopup = false;
      }, 2000);
    }
  });
</script>

<svelte:head>
  <title>Ayush Café</title>
</svelte:head>

{#if showPopup}
  <div class="popup {messageType}" transition:fly={{ x: 100, duration: 400 }}>
    {message}
  </div>
{/if}

<section id="home" class="hero-section">
  <div class="hero-image" in:fly={{ x: -60, duration: 700, delay: 100 }}>
    <img src="/cafe.jpg" alt="Ayush Café interior" />
  </div>
  <div class="hero-content" in:fly={{ x: 60, duration: 700, delay: 200 }}>
    <h1>Welcome to Ayush Café</h1>
    <p>Where Coffee Meets Comfort</p>
    <a href="/menu" class="explore-btn">Explore Menu</a>
  </div>
</section>

<section id="about" class="about-section">
  <div class="about-container">
    <div class="about-text" in:fly={{ y: 40, duration: 600 }}>
      <h1>About Ayush Café</h1>
      <p>
        Ayush Café was created with one simple idea — bring people together over
        a perfect cup of coffee.
      </p>
      <p>
        We believe coffee is not just a drink. It's an experience, a
        conversation starter, and a moment of comfort.
      </p>
      <p>
        From freshly brewed espresso to creamy cappuccino, every cup is made
        with passion.
      </p>
    </div>
    <div class="about-image" in:fly={{ y: 40, duration: 600, delay: 150 }}>
      <img src="/inside.jpg" alt="Ayush Café interior" />
    </div>
  </div>
</section>

<section id="contact" class="contact-section">
  <h1>Contact Us</h1>
  <div class="contact-container">
    <div class="contact-info">
      <div class="contact-item">
        <i class="fas fa-map-marker-alt"></i>
        <div>
          <h3>Location</h3>
          <p>Kathmandu, Nepal</p>
        </div>
      </div>
      <div class="contact-item">
        <i class="fas fa-phone"></i>
        <div>
          <h3>Phone</h3>
          <p>+977-9800000000</p>
        </div>
      </div>
      <div class="contact-item">
        <i class="fas fa-envelope"></i>
        <div>
          <h3>Email</h3>
          <p>hello@ayushcafe.com</p>
        </div>
      </div>
      <div class="contact-item">
        <i class="fas fa-clock"></i>
        <div>
          <h3>Hours</h3>
          <p>Daily: 7:00 AM - 10:00 PM</p>
        </div>
      </div>
    </div>
    <form 
      class="contact-form" 
      method="POST" 
      action="/?/contact"
      use:enhance={() => {
        if (!validateForm()) {
          return ({ cancel }) => cancel();
        }
        isSubmitting = true;
        return async ({ result, update }) => {
          isSubmitting = false;
          await update();
          if (result.type === 'success') {
            resetForm();
          }
          if (result.data?.message) {
            message = result.data.message;
            messageType = result.data.messageType;
            showPopup = true;
            setTimeout(() => { showPopup = false; }, 3000);
          }
        };
      }}
    >
      <div class="form-group" class:has-error={errors.name}>
        <label for="name">
          <i class="fas fa-user"></i> Your Name
        </label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          placeholder="John Doe"
          bind:value={name}
          class:error={errors.name}
        />
        {#if errors.name}
          <span class="error-text">{errors.name}</span>
        {/if}
      </div>

      <div class="form-group" class:has-error={errors.email}>
        <label for="email">
          <i class="fas fa-envelope"></i> Your Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="john@example.com"
          bind:value={email}
          class:error={errors.email}
        />
        {#if errors.email}
          <span class="error-text">{errors.email}</span>
        {/if}
      </div>

      <div class="form-group" class:has-error={errors.message}>
        <label for="message">
          <i class="fas fa-comment"></i> Your Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us anything... We'd love to hear from you!"
          rows="5"
          bind:value={messageText}
          class:error={errors.message}
        ></textarea>
        {#if errors.message}
          <span class="error-text">{errors.message}</span>
        {/if}
      </div>

      <button type="submit" name="contact_submit" disabled={isSubmitting}>
        {#if isSubmitting}
          <i class="fas fa-spinner fa-spin"></i> Sending...
        {:else}
          <i class="fas fa-paper-plane"></i> Send Message
        {/if}
      </button>
    </form>
  </div>
</section>

<style>
  .contact-container {
    max-width: 900px;
    margin: auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    padding: 0 20px;
  }

  .contact-info {
    display: flex;
    flex-direction: column;
    gap: 25px;
    text-align: left;
  }

  .contact-item {
    display: flex;
    align-items: flex-start;
    gap: 15px;
  }

  .contact-item i {
    background: #6f4e37;
    color: white;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    flex-shrink: 0;
  }

  .contact-item h3 {
    margin: 0 0 5px 0;
    font-size: 16px;
    color: #333;
  }

  .contact-item p {
    margin: 0;
    color: #666;
    font-size: 14px;
  }

  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .form-group label {
    font-size: 14px;
    font-weight: 600;
    color: #444;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .form-group label i {
    color: #6f4e37;
    font-size: 14px;
  }

  .form-group input,
  .form-group textarea {
    padding: 14px 16px;
    border-radius: 10px;
    border: 2px solid #e0e0e0;
    font-size: 15px;
    font-family: inherit;
    transition: all 0.3s ease;
    background: #fafafa;
  }

  .form-group input:focus,
  .form-group textarea:focus {
    outline: none;
    border-color: #6f4e37;
    background: #fff;
    box-shadow: 0 0 0 4px rgba(111, 78, 55, 0.1);
  }

  .form-group input.error,
  .form-group textarea.error {
    border-color: #e74c3c;
    background: #fff5f5;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: #aaa;
  }

  .form-group textarea {
    resize: vertical;
    min-height: 120px;
  }

  .has-error label {
    color: #e74c3c;
  }

  .error-text {
    font-size: 12px;
    color: #e74c3c;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .error-text::before {
    content: "!";
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 14px;
    height: 14px;
    background: #e74c3c;
    color: white;
    border-radius: 50%;
    font-size: 10px;
    font-weight: bold;
  }

  .contact-form button {
    padding: 16px 30px;
    background: linear-gradient(135deg, #6f4e37, #8b6f47);
    border: none;
    color: white;
    border-radius: 10px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
  }

  .contact-form button:hover:not(:disabled) {
    background: linear-gradient(135deg, #5a3d2b, #6f4e37);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(111, 78, 55, 0.3);
  }

  .contact-form button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  .popup {
    position: fixed;
    top: 90px;
    right: 30px;
    background: #6f4e37;
    color: white;
    padding: 16px 28px;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    font-weight: 600;
    z-index: 2000;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .popup.success {
    background: #27ae60;
  }

  .popup.error {
    background: #e74c3c;
  }

  .popup::before {
    font-family: "Font Awesome 6 Free";
    font-weight: 900;
  }

  .popup.success::before {
    content: "\f00c";
  }

  .popup.error::before {
    content: "\f00d";
  }

  @media (max-width: 768px) {
    .contact-container {
      grid-template-columns: 1fr;
    }
  }
</style>
