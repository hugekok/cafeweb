<script>
  import favicon from "$lib/assets/favicon.svg";
  import Navbar from "$lib/components/Navbar.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import "./project.css";

  let { children, data } = $props();
</script>

<svelte:head>
  <link rel="icon" href={favicon} />
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.css"
  />
</svelte:head>

<Navbar cartCount={data.cartCount} />

<main>
  {@render children()}
</main>

<Footer />
