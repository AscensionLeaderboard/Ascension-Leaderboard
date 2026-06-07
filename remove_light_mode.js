const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove all body.light-mode CSS rules block
// We notice that light-mode CSS usually starts from "/* --- Light Mode --- */" or similar.
// Wait, looking at the grep output, it starts around line 319: "/* --- Light Mode --- */"
// Let's just use regex to remove any CSS block starting with body.light-mode
html = html.replace(/body\.light-mode[^{]*\{[^}]*\}/g, '');

// Also remove the "/* --- Light Mode --- */" comment and other light-mode specific rules
html = html.replace(/\/\*\s*---\s*Light Mode.*?\*\//gi, '');
html = html.replace(/img\[style\*="mix-blend-mode: screen"\][^{]*\{[^}]*\}/g, ''); // "img[style*="mix-blend-mode: screen"]" logic used for unblack
html = html.replace(/\.tier-item img,\s*\.title img,\s*#modalOverallIcon[^{]*\{[^}]*\}/g, ''); 

// 2. Remove the SVG filter for Light Mode JPG transparency
html = html.replace(/<!-- SVG Filter for Light Mode JPG transparency -->[\s\S]*?<\/svg>/, '');

// 3. Remove the Light/Dark Mode Toggle button
html = html.replace(/<!-- Light\/Dark Mode Toggle -->[\s\S]*?<\/button>/, '');

// 4. Remove the JS Toggle script
html = html.replace(/\/\/ Light\/Dark Mode Toggle[\s\S]*?}\);/, '');

fs.writeFileSync('index.html', html);
console.log('Light Mode successfully stripped out!');
