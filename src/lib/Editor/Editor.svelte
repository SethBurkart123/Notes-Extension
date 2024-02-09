<script lang="ts">
  import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
  import Collaboration from '@tiptap/extension-collaboration'
  import Placeholder from '@tiptap/extension-placeholder';
  import Commands from '$lib/Editor/Plugins/Commands/command';
  import { Dropcursor } from "@tiptap/extension-dropcursor";
  import BubbleMenu from '@tiptap/extension-bubble-menu';
  import Typography from '@tiptap/extension-typography';
  import TaskList from '@tiptap/extension-task-list';
  import TaskItem from '@tiptap/extension-task-item';
  import StarterKit from '@tiptap/starter-kit';
  import Link from '@tiptap/extension-link';
  
  import { browser } from '$app/environment';
  import { Editor } from '@tiptap/core';

  //import { LanguageTool } from './Plugins/Spellcheck/Spellcheck';
  //import type { Match } from './Plugins/Spellcheck/Spellcheck';

  // Live Collaboration
  import { HocuspocusProvider } from '@hocuspocus/provider'
  import { IndexeddbPersistence } from 'y-indexeddb';
  import * as Y from "yjs";
  
  import CommandList from '$lib/Editor/Plugins/Commands/CommandList.svelte';
  import suggestion from '$lib/Editor/Plugins/Commands/suggestion';

  import { onMount, onDestroy } from 'svelte';
  import './EditorStyles.css';

  let output: any;
  let outputType: string;
  let commandListInstance: any;


  let element: HTMLElement;
  let editor: Editor;
  let w: number;

  onMount(() => {
    const ydoc = new Y.Doc();
    new IndexeddbPersistence('example-document', ydoc)
    const provider = new HocuspocusProvider({
      url: "ws://127.0.0.1:1234",
      name: "example-document",
      document: ydoc,
    });

    if (browser) {
      editor = new Editor({
        element: element,
        editorProps: {
          attributes: {
            class: 'focus:outline-none flex flex-col items-center px-3 md:px-0'
          }
        },
        extensions: [
          StarterKit,
          Placeholder.configure({
            placeholder: ({ node }) => {
              if (node.type.name === 'heading') {
                return 'Heading'
              } else if (node.type.name === 'paragraph') {
                return "Type '/' for commands"
              }
                
              return 'Type something...';
            },
          }),
          TaskList,
          TaskItem,
          Link,
          Typography,
          /*LanguageTool.configure({
            language: 'auto',
            apiUrl: 'http://192.168.0.152:8081/' + 'v2/check',
            automaticMode: true,
          }),*/
          Commands.configure({
            suggestion
          }),
          Collaboration.configure({
            document: ydoc,
          }),
          CollaborationCursor.configure({
            provider: provider,
            user: { name: "John Doe", color: "#ffcc00" },
          }),
          BubbleMenu.configure({
            element: document.querySelector('.menu') as HTMLElement,
          }),
          Dropcursor.configure({ width: 5, color: "#ddeeff" }),
        ],
        onTransaction: () => {
          // force re-render so `editor.isActive` works as expected
          editor = editor;
        },
        onUpdate: ({ editor }: { editor: Editor }) => {
          // send the content to an API here
        }
      });
    }
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div class="prose prose-slate sm:prose-xl lg:prose-3xl" bind:clientWidth={w}>
  <div  class="w-full" bind:this={element} on:keydown|capture={(event) => commandListInstance.handleKeydown(event, editor)} />  <!-- handleKeydown(event, editor, $slashVisible, $slashItems, selectItem, $slashProps) -->
</div>

<!-- <div class="menu bg-black rounded-full text-white">
  eee
</div>
 -->
<CommandList bind:this={commandListInstance} />

<div class="sm:flex my-4">
  <button
    on:click={() => {
      output = editor.getJSON();
      outputType = 'json';
    }}
    class="m-2 border rounded-full px-4 py-2 border-slate-500 {outputType == 'json'
      ? 'bg-blue-200'
      : ''}">See JSON Output</button
  >
</div>

{#if output}
  <div class="sm:flex flex-row-reverse">
    <button
      class="underline font-semibold text-slate-700 hover:text-slate-800 cursor p-2"
      on:click={() => (output = false)}
    >
      Clear output
    </button>
    <button
      class="underline font-semibold text-slate-700 hover:text-slate-800 cursor p-2"
      on:click={() => navigator.clipboard.writeText(JSON.stringify(output))}
    >
      Copy output
    </button>
  </div>
  {JSON.stringify(output)}
{/if}
<hr />
