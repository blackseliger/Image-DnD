import Router from './router/index.js';

const router = Router.instance();

router
  .addRoute(/^$/, 'editor')
  .addRoute(/^404\/?$/, 'error404')
  .setNotFoundPagePath('editor')
  .listen();
