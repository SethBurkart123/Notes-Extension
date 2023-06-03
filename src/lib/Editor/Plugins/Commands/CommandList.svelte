<script lang="ts">
  import { slashVisible, slashItems, slashLocation, slashProps, selectedIndex, scrollIntoView } from '$lib/stores';
	import { get } from 'svelte/store';
	import { fly } from 'svelte/transition';

  let height: number;

  let elements: any = [];
  $: {
    if (get(scrollIntoView) && elements[0] != null) {
      elements[$selectedIndex]?.scrollIntoView({ block: 'end', behavior: 'smooth' });
      scrollIntoView.set(false);
    }
  }



type SlashItem = {
  title: string;
  subtitle: string;
  image: any;
  command: ({ editor, range }: any) => void;
};

export function handleKeydown(event: any, editor: any, slashProps: any) {
  if (!slashVisible) return;

  if (event.key === 'ArrowUp') {
    event.preventDefault();
    upHandler();
    return true;
  }

  if (event.key === 'ArrowDown') {
    event.preventDefault();
    downHandler();
    return true;
  }

  if (event.key === 'Enter') {
    event.preventDefault();
   selectItem(editor, slashProps);
    return true;
  }

  return false;
}

function upHandler() {
  scrollIntoView.set(true);
  selectedIndex.set((get(selectedIndex) + get(slashItems).length - 1) % get(slashItems).length);
}

function downHandler() {
  scrollIntoView.set(true);
  selectedIndex.set((get(selectedIndex) + 1) % get(slashItems).length);
}

function selectItem(editor: any, slashProps: any) {
  const item = get(slashItems)[get(selectedIndex)];

  if (item) {
    let range = slashProps.range;
    item.command({ editor, range });
  }
}
</script>

<svelte:window bind:innerHeight={height} />

{#if $slashVisible}
  <div class="w-full absolute h-screen top-0" on:keydown={() => {}} on:click={() => ($slashVisible = false)} />
  <div
   transition:fly={{ y: 10, duration: 300 }}
    class="absolute bg-white shadow-xl w-96 h-96 max-w-full border rounded-lg overflow-scroll"
    style="left: {$slashLocation.x}px; top: {$slashLocation.y + $slashLocation.height + 384 >
    height
      ? $slashLocation.y - $slashLocation.height - 384
      : $slashLocation.y + $slashLocation.height}px;">
    <div class="p-2 text-sm text-slate-500">Basic Blocks</div>
    {#each $slashItems as { title, subtitle, command, image }, i}
      <div
        class="p-3 transition duration-300 flex gap-4 cursor-pointer {i == $selectedIndex ? 'bg-slate-100' : 'bg-white'}"
        on:mouseenter={() => selectedIndex.set(i)}
        on:click={() => {
          $slashVisible = false;
          // @ts-ignore
          command($slashProps);
        }}
        on:keydown={() => {}}
        bind:this={elements[i]}
      >
      <img class="h-12" src={image} alt={title} />
      <div>
        {title}
        <p class="text-sm text-slate-500">{subtitle ? subtitle : ''}</p>
      </div>
      </div>
    {/each}
  </div>
{/if}
