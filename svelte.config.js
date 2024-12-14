import adapter from '@sveltejs/adapter-static';
import sveltePreprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      // デフォルトのオプションを表示
      pages: 'build',
      assets: 'build',
      fallback: undefined, // フォールバックページを設定
      precompress: false,
      strict: true
    }),
  },
  preprocess: sveltePreprocess({
    sourceMap: true,
    defaults: {
      script: 'typescript',
      style: 'scss'
    },
    typescript: {
      tsconfigFile: './tsconfig.json'
    }
  })
};