<script>
  import { fly, fade, slide } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { onMount } from 'svelte';

  export let data;

  let cartItems = data.cartItems ?? [];
  let message = data?.message ?? '';
  let messageType = data?.messageType ?? '';
  let showPopup = !!message;

  $: totalQuantity = cartItems.reduce((s, i) => s + i.quantity, 0);
  $: totalPrice    = cartItems.reduce((s, i) => s + i.item_price * i.quantity, 0);

  onMount(() => {
    if (showPopup) setTimeout(() => { showPopup = false; }, 2000);
  });

  function formatNum(n) {
    return Number(n).toLocaleString();
  }
</script>

<svelte:head>
  <title>Cart - Ayush Café</title>
  <link rel="icon" type="image/png" href="/static/favicon.png">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="true">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet">
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

{#if showPopup}
  <div class="popup {messageType}" transition:fly={{ x: 100, duration: 400 }}>
    {message}
  </div>
{/if}

<!-- CART HERO -->
<section class="cart-hero" in:fly={{ y: -30, duration: 500 }}>
  <h1><i class="fa-solid fa-cart-shopping" style="font-size:30px;"></i> Your Cart</h1>
  <p>Review your items before checkout</p>
</section>

<div class="cart-container">
  {#if cartItems.length > 0}

    <!-- CART SUMMARY -->
    <div class="cart-summary" in:fly={{ y: 30, duration: 500, delay: 100 }}>
      <div class="cart-summary-item">
        <h3>{cartItems.length}</h3>
        <p>Unique Items</p>
      </div>
      <div class="cart-summary-item">
        <h3>{totalQuantity}</h3>
        <p>Total Quantity</p>
      </div>
      <div class="cart-summary-item">
        <h3>Rs {formatNum(totalPrice)}</h3>
        <p>Total Price</p>
      </div>
    </div>

    <!-- CART ITEMS -->
    <div class="cart-items" in:fly={{ y: 30, duration: 500, delay: 200 }}>
      {#each cartItems as item (item.id)}
        <div class="cart-item" animate:flip={{ duration: 300 }} transition:slide={{ duration: 250 }}>
          <div class="cart-item-info">
            <h3>{item.item_name}</h3>
            <p>Rs {formatNum(item.item_price)} per item</p>
          </div>
          <div class="cart-item-quantity">× {item.quantity}</div>
          <div class="cart-item-price">Rs {formatNum(item.item_price)}</div>
          <div class="cart-item-total">Rs {formatNum(item.item_price * item.quantity)}</div>
          <form method="POST" action="/cart?/removeItem" style="display:inline;">
            <input type="hidden" name="item_name" value={item.item_name}>
            <button type="submit" class="remove-btn">
              <i class="fas fa-trash"></i> Remove
            </button>
          </form>
        </div>
      {/each}

      <!-- GRAND TOTAL -->
      <div class="cart-total">
        Grand Total: <span>Rs {formatNum(totalPrice)}</span>
      </div>

      <!-- ACTIONS -->
      <div class="cart-actions">
        <form method="POST" action="/cart?/clearCart" style="display:inline;">
          <button
            type="submit"
            class="clear-cart-btn"
            on:click|preventDefault={(e) => {
              if (confirm('Are you sure you want to clear your cart?')) e.target.closest('form').submit();
            }}
          >
            <i class="fas fa-trash-alt"></i> Clear Cart
          </button>
        </form>

        <a href="/menu" class="continue-shopping" style="text-decoration:none; display:inline-block; padding:12px 30px; border-radius:8px; background:#95a5a6; color:white; text-align:center;">
          <i class="fas fa-arrow-left"></i> Continue Shopping
        </a>

        <button class="checkout-btn" on:click={() => alert('Checkout feature coming soon! 🚀')}>
          <i class="fas fa-check-circle"></i> Proceed to Checkout
        </button>
      </div>
    </div>

  {:else}
    <!-- EMPTY CART -->
    <div class="empty-cart" in:fade={{ duration: 400 }}>
      <i class="fas fa-shopping-cart" style="height:10px;"></i>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
      <a href="/menu">Browse Menu</a>
    </div>
  {/if}
</div>

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
        <a href="https://www.facebook.com/ayush.ghonday.gurung" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook"></i></a>
        <a href="https://www.instagram.com/ayush_on_lead/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram"></i></a>
        <a href="https://www.youtube.com/@mrlemon4807" target="_blank" rel="noopener noreferrer"><i class="fab fa-youtube"></i></a>
      </div>
    </div>
  </div>
  <div class="footer-bottom">© 2026 Ayush Café. All Rights Reserved.</div>
</footer>

<style>
  .cart-hero {
    text-align: center;
    padding: 60px 20px;
    background: #fff;
  }
  .cart-hero h1 { font-size: 2.5rem; margin-bottom: 10px; }
  .cart-hero p  { font-size: 1.2rem; opacity: 0.9; }

  .cart-container { max-width: 1000px; margin: 20px auto; padding: 0 20px; }

  .cart-summary {
    background: #f8f5f2; border-radius: 12px; padding: 25px;
    margin-bottom: 30px; display: flex; justify-content: space-around;
    flex-wrap: wrap; gap: 20px;
  }
  .cart-summary-item { text-align: center; }
  .cart-summary-item h3 { color: #6B4423; font-size: 2rem; margin: 0; }
  .cart-summary-item p  { color: #888; margin: 5px 0 0 0; font-size: 0.9rem; }

  .cart-items {
    background: white; border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,.1); overflow: hidden;
  }
  .cart-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 25px; border-bottom: 1px solid #eee; transition: background 0.3s;
  }
  .cart-item:hover { background: #f8f5f2; }
  .cart-item:last-child { border-bottom: none; }

  .cart-item-info { flex: 1; }
  .cart-item-info h3 { color: #333; margin: 0 0 5px 0; font-size: 1.2rem; }
  .cart-item-info p  { color: #888; margin: 0; font-size: 0.9rem; }

  .cart-item-quantity {
    background: #6B4423; color: white; padding: 5px 15px;
    border-radius: 20px; font-weight: bold; margin: 0 20px;
  }
  .cart-item-price { color: #6B4423; font-weight: bold; font-size: 1.1rem; min-width: 100px; text-align: right; }
  .cart-item-total { color: #27ae60; font-weight: bold; font-size: 1.1rem; min-width: 120px; text-align: right; margin: 0 20px; }

  .remove-btn {
    background: #e74c3c; color: white; border: none;
    padding: 8px 15px; border-radius: 6px; cursor: pointer;
    font-size: 0.9rem; transition: background 0.3s;
  }
  .remove-btn:hover { background: #c0392b; }

  .cart-total {
    background: #6f4e37; color: white;
    padding: 25px; text-align: right; font-size: 1.3rem;
  }
  .cart-total span { font-weight: bold; font-size: 1.5rem; }

  .cart-actions {
    display: flex; justify-content: space-between;
    padding: 25px; gap: 15px; flex-wrap: wrap;
  }
  .cart-actions button {
    padding: 12px 30px; border: none; border-radius: 8px;
    font-size: 1rem; cursor: pointer; transition: all 0.3s;
  }
  .clear-cart-btn { background: #e74c3c; color: white; }
  .clear-cart-btn:hover { background: #c0392b; }
  .checkout-btn { background: #27ae60; color: white; flex: 1; max-width: 300px; }
  .checkout-btn:hover { background: #229954; }

  .empty-cart { text-align: center; padding: 60px 20px; color: #888; }
  .empty-cart i { font-size: 4rem; color: #ddd; margin-bottom: 20px; }
  .empty-cart h2 { color: #6B4423; margin-bottom: 15px; }
  .empty-cart a {
    display: inline-block; margin-top: 20px; padding: 12px 30px;
    background: #6B4423; color: white; text-decoration: none;
    border-radius: 8px; transition: background 0.3s;
  }
  .empty-cart a:hover { background: #8B6F47; }
</style>
