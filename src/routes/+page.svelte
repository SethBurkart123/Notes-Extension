<script>
  import Editor from '$lib/Editor/Editor.svelte';

  let title = 'Nice Title';
</script>

<h1
  contenteditable
  bind:textContent={title}
  class="focus:outline-none text-4xl font-semibold mb-4"
/>
<Editor />
