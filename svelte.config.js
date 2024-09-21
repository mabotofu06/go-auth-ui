import adapter from '@sveltejs/adapter-static';
import preprocess from 'svelte-preprocess';

export default {
  kit: {
    adapter: adapter({
      // デフォルトのオプションを表示
      pages: 'build',
      assets: 'build',
      fallback: 'index.html' // フォールバックページを設定
    }),
    prerender: {
      entries: [] // すべてのページをプリレンダリング
    }
  },
  preprocess: preprocess()
};