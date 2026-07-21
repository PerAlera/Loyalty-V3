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

    content = content.replace(/import\s+{\s*useSession([^}]*)}\s+from\s+["']next-auth\/react["'];?/g, 'import { useSession$1 } from "@/components/AuthProvider";');
    content = content.replace(/import\s+{\s*signOut([^}]*)}\s+from\s+["']next-auth\/react["'];?/g, 'import { signOut$1 } from "@/components/AuthProvider";');
    content = content.replace(/import\s+{\s*useSession\s*,\s*signOut\s*}\s+from\s+["']next-auth\/react["'];?/g, 'import { useSession, signOut } from "@/components/AuthProvider";');
    content = content.replace(/import\s+{\s*signOut\s*,\s*useSession\s*}\s+from\s+["']next-auth\/react["'];?/g, 'import { useSession, signOut } from "@/components/AuthProvider";');

    if (content !== original) {
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`Updated react auth: ${filepath}`);
    }
  }
});
