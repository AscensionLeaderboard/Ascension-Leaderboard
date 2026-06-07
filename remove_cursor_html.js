const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<!-- Custom Cursor Canvas -->\s*<canvas id="cursorCanvas"><\/canvas>\s*<!-- Custom Cursor DOM Elements -->\s*<div class="cursor-dot" id="cursorDot"><\/div>\s*<div class="cursor-ring" id="cursorRing"><\/div>/;

html = html.replace(regex, '');

fs.writeFileSync('index.html', html);
console.log('Removed leftover cursor HTML tags with regex.');
