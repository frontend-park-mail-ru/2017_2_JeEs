'use strict';

function requireAll(r) { r.keys().forEach(r); }

requireAll(require.context('./fonts/', true, /\.(ttf)$/));
requireAll(require.context('./images/', true, /\.(png)$/));
requireAll(require.context('./scripts/', true, /\.(js)$/));
requireAll(require.context('./stylesheet/', true, /\.(css)$/));
