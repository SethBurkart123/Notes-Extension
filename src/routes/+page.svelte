<script>
  import Editor from '$lib/editor/index.svelte';

  let title = 'Svelte Tiptap Notion Clone (Svnotion?)';
</script>

<h1
  contenteditable
  bind:textContent={title}
  class="focus:outline-none text-4xl font-semibold mb-4"
/>
<Editor />
