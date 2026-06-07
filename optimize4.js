const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the #unblack SVG
html = html.replace(/<!-- SVG Filter to cut black backgrounds -->[\s\S]*?<\/svg>/, '');

// 2. Replace the Universal Black Background Remover CSS
const oldCSS = `        /* --- Universal Black Background Remover --- */
        img[style*="mix-blend-mode: screen"],
        .tab img,
        .position-circle img,
        .tier-item img,
        .title img,
        #modalOverallIcon {
            mix-blend-mode: normal !important;
            filter: url(#unblack) brightness(1.2) drop-shadow(0 2px 4px rgba(0,0,0,0.5)) !important;
            border-radius: 0 !important;
            background: transparent !important;
        }`;

const newCSS = `        /* --- Universal Black Background Remover --- */
        img[style*="mix-blend-mode: screen"],
        .tab img,
        .position-circle img,
        .tier-item img,
        .title img,
        #modalOverallIcon {
            mix-blend-mode: screen !important;
            filter: contrast(1.5) brightness(0.9) !important;
            border-radius: 0 !important;
            background: transparent !important;
        }`;

html = html.replace(oldCSS, newCSS);

fs.writeFileSync('index.html', html);
console.log('Fixed icon background removal!');
