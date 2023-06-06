import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-auto';
import preprocessReact from "svelte-preprocess-react/preprocessReact";


/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },

  preprocess: [
    preprocess({
      postcss: true,
      typescript: true
    }),
    preprocessReact({
      preprocess: preprocess({ sourceMap: true }),
    }),
  ]
};

export default config;
