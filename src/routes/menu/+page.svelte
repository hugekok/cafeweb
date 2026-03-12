<script>
  import { fly, fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import { enhance } from '$app/forms'; // This prevents the page refresh

  export let data;

  let message = data?.message ?? '';
  let messageType = data?.messageType ?? '';
  let showPopup = !!message;

  // Filter state
  let activeFilter = 'all';

  const categories = [
    { key: 'all',       label: 'All' },
    { key: 'coffee',    label: '☕ Coffee' },
    { key: 'dessert',   label: '🍰 Desserts' },
    { key: 'snack',     label: '🥪 Snacks' },
    { key: 'cold',      label: '🧋 Cold Drinks' },
    { key: 'breakfast', label: '🍳 Breakfast' },
  ];

  const menuItems = [
    { name: 'Espresso',           price: 150,  category: 'coffee',    desc: 'Strong and bold single shot',             badge: 'Popular' },
    { name: 'Latte',              price: 200,  category: 'coffee',    desc: 'Espresso with steamed milk' },
    { name: 'Cappuccino',         price: 220,  category: 'coffee',    desc: 'Espresso with thick milk foam' },
    { name: 'Flat White',         price: 230,  category: 'coffee',    desc: 'Velvety microfoam over espresso',           badge: 'New' },
    { name: 'Americano',          price: 160,  category: 'coffee',    desc: 'Espresso diluted with hot water' },
    { name: 'Macchiato',          price: 180,  category: 'coffee',    desc: 'Espresso with a dash of milk foam' },
    { name: 'Iced Latte',         price: 220,  category: 'cold',      desc: 'Chilled espresso with cold milk',          badge: 'Popular' },
    { name: 'Cold Brew',          price: 250,  category: 'cold',      desc: 'Slow-steeped for 12 hours' },
    { name: 'Chocolate Milkshake',price: 280,  category: 'cold',      desc: 'Thick, creamy and indulgent' },
    { name: 'Mango Smoothie',     price: 260,  category: 'cold',      desc: 'Fresh mango blended with yogurt' },
    { name: 'Strawberry Frappe',  price: 270,  category: 'cold',      desc: 'Blended strawberries with cream',          badge: 'New' },
    { name: 'Lemonade',           price: 120,  category: 'cold',      desc: 'Fresh squeezed with mint' },
    { name: 'Pancakes',           price: 200,  category: 'breakfast', desc: 'Fluffy stacks with maple syrup',           badge: 'Popular' },
    { name: 'Avocado Toast',      price: 220,  category: 'breakfast', desc: 'Smashed avo on sourdough',                  badge: 'New' },
    { name: 'Egg Sandwich',       price: 250,  category: 'breakfast', desc: 'Scrambled eggs in toasted brioche' },
    { name: 'Granola Bowl',       price: 230,  category: 'breakfast', desc: 'Oats, honey, berries and yogurt' },
    { name: 'Chocolate Cake',     price: 250,  category: 'dessert',    desc: 'Rich dark chocolate layered cake',         badge: 'Popular' },
    { name: 'Blueberry Muffin',   price: 120,  category: 'dessert',    desc: 'Soft muffin bursting with blueberries' },
    { name: 'Apple Pie',          price: 200,  category: 'dessert',    desc: 'Warm cinnamon apple in flaky pastry' },
    { name: 'Tiramisu',           price: 300,  category: 'dessert',    desc: 'Classic Italian coffee dessert',           badge: 'New' },
    { name: 'Cheesecake',         price: 280,  category: 'dessert',    desc: 'New York style with strawberry topping' },
    { name: 'Brownie',            price: 150,  category: 'dessert',    desc: 'Fudgy walnut brownie, served warm' },
    { name: 'Veg Sandwich',       price: 180,  category: 'snack',      desc: 'Fresh veggies on toasted multigrain' },
    { name: 'French Fries',       price: 150,  category: 'snack',      desc: 'Crispy golden fries with dipping sauce',    badge: 'Popular' },
    { name: 'Garlic Bread',       price: 170,  category: 'snack',      desc: 'Toasted baguette with herb butter' },
    { name: 'Nachos',             price: 200,  category: 'snack',      desc: 'Tortilla chips with salsa and cheese' },
    { name: 'Bruschetta',         price: 190,  category: 'snack',      desc: 'Toasted bread with tomato and basil',      badge: 'New' },
    { name: 'Spring Rolls',       price: 160,  category: 'snack',      desc: 'Crispy rolls with sweet chili sauce' },
  ];

  const sections = [
    { id: 'coffee',    label: 'Coffee' },
    { id: 'cold',      label: '🧋 Cold Drinks' },
    { id: 'breakfast', label: '🍳 Breakfast' },
    { id: 'dessert',   label: '🍰 Desserts' },
    { id: 'snack',     label: '🥪 Snacks' },
  ];

  // Logic to show/hide popup
  function showToast(msg, type) {
    message = msg;
    messageType = type;
    showPopup = true;
    setTimeout(() => { showPopup = false; }, 2000);
  }

  onMount(() => {
    if (showPopup) setTimeout(() => { showPopup = false; }, 2000);
  });

  $: filteredItems = (cat) => {
    if (activeFilter === 'all') {
      return menuItems.filter(i => i.category === cat);
    }
    return menuItems.filter(i => i.category === cat && i.category === activeFilter);
  };

  $: sectionVisible = (cat) =>
    activeFilter === 'all' || activeFilter === cat;

  function setFilter(key) {
    activeFilter = key;
  }
</script>

<svelte:head>
  <title>Menu - Ayush Café</title>
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

<section class="menu-hero">
  <h1 in:fly={{ y: -30, duration: 500 }}>Our Full Menu ☕</h1>
  <p in:fly={{ y: -20, duration: 500, delay: 100 }}>Freshly made, every single day</p>
  <div class="filter-buttons" in:fade={{ duration: 400, delay: 200 }}>
    {#each categories as cat}
      <button
        class="filter-btn"
        class:active={activeFilter === cat.key}
        on:click={() => setFilter(cat.key)}
      >
        {cat.label}
      </button>
    {/each}
  </div>
</section>

  {#each sections as section}
  {#if sectionVisible(section.id)}
    <section class="menu-section" id={section.id} transition:fade={{ duration: 300 }}>
      <h2>{section.label}</h2>
      <div class="items">
        {#each filteredItems(section.id) as item (item.name)}
          <div class="item" in:fly={{ y: 30, duration: 400 }}>
            {#if item.badge}
              <div class="item-badge">{item.badge}</div>
            {/if}
            <h3>{item.name}</h3>
            <p class="item-desc">{item.desc}</p>
            <p class="item-price">Rs {item.price}</p>
            
            <form 
              method="POST" 
              action="/menu?/addToCart"
              use:enhance={() => {
                return async ({ result, update }) => {
                  await update({ reset: false });
                  if (result.type === 'success') {
                    showToast(result.data.message, result.data.messageType);
                  }
                };
              }}
            >
              <input type="hidden" name="item_name" value={item.name}>
              <input type="hidden" name="item_price" value={item.price}>
              <button type="submit" name="add_to_cart">Add to Cart</button>
            </form>
          </div>
        {/each}
      </div>
    </section>
  {/if}
{/each}

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
