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

const targetDir = path.join(__dirname, 'src', 'app', 'api', 'owner');

walk(targetDir, filepath => {
  if (filepath.endsWith('.ts') || filepath.endsWith('.tsx')) {
    let content = fs.readFileSync(filepath, 'utf8');
    let original = content;

    content = content.replace(/session\.user\.role !== "OWNER"/g, 'session.user.role !== "ADMIN" && session.user.role !== "SUPER_ADMIN"');

    if (content !== original) {
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`Updated OWNER check: ${filepath}`);
    }
  }
});
