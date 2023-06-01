<script>
	import { fly } from 'svelte/transition';
  import "../app.css";
  import Sidebar from '$lib/Sidebar.svelte';

  export let data;
</script>

<div class="flex">
  <!-- <Sidebar /> -->
  {#key data.pathname}
    <div class="max-w-3xl p-2 m-auto my-16" 
      in:fly={{ y: 50, duration: 300, delay: 400 }}
      out:fly={{ y: -50, duration: 300 }}>
      <slot />
    </div>
  {/key}
</div>