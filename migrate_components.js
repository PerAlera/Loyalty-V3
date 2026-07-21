const fs = require('fs');
const path = require('path');

const srcComponents = path.join(__dirname, 'peralera-website-temp', 'src', 'components');
const destComponents = path.join(__dirname, 'src', 'components', 'landing');

if (!fs.existsSync(destComponents)) {
  fs.mkdirSync(destComponents, { recursive: true });
}

const files = fs.readdirSync(srcComponents);

for (const file of files) {
  if (file.endsWith('.jsx')) {
    const srcPath = path.join(srcComponents, file);
    const destPath = path.join(destComponents, file.replace('.jsx', '.tsx'));
    
    let content = fs.readFileSync(srcPath, 'utf-8');
    
    // Convert generic HTML a tags pointing to '#' to Next.js specific or just leave as is since they are buttons.
    // I will let it be. But I need to add "use client" if it uses React state
    if (content.includes('useState') || content.includes('useEffect') || content.includes('onClick')) {
      content = '"use client";\n\n' + content;
    }

    // Remove CSS imports since we merged them
    content = content.replace(/import\s+['"]\..*\.css['"];?\n/g, '');

    fs.writeFileSync(destPath, content);
    console.log(`Migrated ${file} to ${path.basename(destPath)}`);
  }
}
