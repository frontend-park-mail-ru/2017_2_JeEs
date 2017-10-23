function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('../public/static/fonts/', true, /\.(ttf)$/));
requireAll(require.context('../public/static/images/', true, /\.(png)$/));
requireAll(require.context('./views/', true, /\.(css)$/));
requireAll(require.context('../dist/compiled', true, /\.(js)$/));
requireAll(require.context('./views/', true, /\.(pug|jade)$/));