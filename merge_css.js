const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'peralera-website-temp', 'src');
const componentsDir = path.join(srcDir, 'components');
const outPath = path.join(__dirname, 'src', 'app', 'home', 'landing.css');

const files = [
  path.join(srcDir, 'index.css'),
  path.join(srcDir, 'App.css'),
  path.join(componentsDir, 'DemoBuilder.css'),
  path.join(componentsDir, 'MobilePreview.css')
];

let combinedCss = '';

for (const file of files) {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf-8');
    combinedCss += `/* --- ${path.basename(file)} --- */\n\n`;
    
    // Quick and dirty scoping: replace body with .landing-wrapper
    let scoped = content.replace(/^body\s*{/gm, '.landing-wrapper {');
    // We leave everything else as is for now, it's mostly specific classes
    combinedCss += scoped + '\n\n';
  } else {
    console.error(`File not found: ${file}`);
  }
}

fs.writeFileSync(outPath, combinedCss);
console.log('CSS merged successfully into ' + outPath);
