<script>
	import { fly } from 'svelte/transition';
  import "../app.css";
  import Sidebar from '$lib/Sidebar.svelte';

  export let data;
</script>

<div class="flex h-screen">
  <Sidebar />
  {#key data.pathname}
    <div class="overflow-y-scroll h-screen py-16 p-2 w-full" 
      in:fly={{ y: 50, duration: 300, delay: 400 }}
      out:fly={{ y: -50, duration: 300 }}>
      <slot />
    </div>
  {/key}
</div>