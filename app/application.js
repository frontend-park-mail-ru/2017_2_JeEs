'use strict';

/**
 * подключает модули/статику/css и тд для сборки webpack-ом
 */
function requireAll(r) { r.keys().forEach(r); }

require('./index.js');
require('./index.css');
requireAll(require.context('../public/static/fonts/', true, /\.(ttf)$/));
requireAll(require.context('../public/static/images/', true, /\.(png)$/));
requireAll(require.context('./blocks/', true, /\.(js)$/));
requireAll(require.context('./blocks/', true, /\.(css)$/));
requireAll(require.context('./modules/', true, /\.(js)$/));
requireAll(require.context('./blocks/', true, /\.(pug|jade)$/));
