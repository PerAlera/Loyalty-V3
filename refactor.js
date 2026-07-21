const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    const filepath = path.join(dir, file);
    if (fs.statSync(filepath).isDirectory()) {
      walk(filepath, callback);
    } else {
      callback(filepath);
    }
  });
}

const targetDir = path.join(__dirname, 'src');

walk(targetDir, filepath => {
  if (filepath.endsWith('.ts') || filepath.endsWith('.tsx') || filepath.endsWith('.js') || filepath.endsWith('.jsx')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;

    content = content.replace(/storeId/g, 'businessId');
    content = content.replace(/store/g, 'business');
    content = content.replace(/Store/g, 'Business');

    // Restore next-auth Provider storeId -> businessId logic but we will remove next-auth soon anyway.

    if (content !== original) {
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`Updated: ${filepath}`);
    }
  }
});
