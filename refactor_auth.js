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

    // Replace getServerSession import
    content = content.replace(/import\s+{\s*getServerSession\s*}\s+from\s+["']next-auth["'];?/g, '');
    
    // Check if we need to add the new import
    if (content.includes('getServerSession(') && !content.includes('import { getServerSession } from "@/lib/auth"')) {
      // Remove any existing authOptions import from "@/lib/auth" to avoid duplicates or unused
      content = content.replace(/import\s+{\s*authOptions\s*}\s+from\s+["']@\/lib\/auth["'];?\n?/g, '');
      content = `import { getServerSession } from "@/lib/auth";\n` + content;
    }

    // Replace getServerSession(authOptions) with getServerSession()
    content = content.replace(/getServerSession\(authOptions\)/g, 'getServerSession()');

    if (content !== original) {
      fs.writeFileSync(filepath, content, 'utf8');
      console.log(`Updated auth: ${filepath}`);
    }
  }
});
