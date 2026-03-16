<script>
  let { cartCount = 0 } = $props();
</script>

<nav>
  <a href="/" class="logo"><h2>Ayush Café</h2></a>
  <div>
    <a href="/">Home</a>
    <a href="/#about">About Us</a>
    <a href="/menu">Menu</a>
    <a href="/#contact">Contact</a>
    <a href="/cart" class="cart-link">
      <i class="fas fa-shopping-cart"></i> CART
      {#if cartCount > 0}
        <span class="cart-badge">{cartCount}</span>
      {/if}
    </a>
  </div>
</nav>

<style>
  .cart-link {
    position: relative;
  }
  .cart-badge {
    position: absolute;
    top: -8px;
    right: -12px;
    background: #e74c3c;
    color: white;
    font-size: 11px;
    font-weight: bold;
    padding: 2px 6px;
    border-radius: 10px;
    min-width: 18px;
    text-align: center;
  }
</style>
