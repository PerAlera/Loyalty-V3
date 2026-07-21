const fs = require('fs');
const path = require('path');

const files = [
  'src/app/panel/login/page.tsx',
  'src/app/[slug]/login/page.tsx',
  'src/app/[slug]/register/page.tsx',
  'src/app/api/auth/register/route.ts',
  'src/app/api/owner/cashiers/route.ts',
  'src/app/api/super-admin/businesses/route.ts'
];

files.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Panel login
    content = content.replace(
      "const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';\n    const email = `${phone}@${baseDomain}`;",
      "const email = `${phone}@peralera.com`;"
    );
    
    // Slug login / register / API
    content = content.replace(
      "const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';\n    const email = `${phone}@${params.slug}.${baseDomain}`;",
      "const email = `${phone}@${params.slug}.peralera.com`;"
    );
    content = content.replace(
      "const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';\n      const email = `${formData.phone}@${params.slug}.${baseDomain}`;",
      "const email = `${formData.phone}@${params.slug}.peralera.com`;"
    );
    content = content.replace(
      "const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';\n    const email = `${phone}@${slug}.${baseDomain}`;",
      "const email = `${phone}@${slug}.peralera.com`;"
    );
    content = content.replace(
      "const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';\n    const email = `${phone}@${business.slug}.${baseDomain}`;",
      "const email = `${phone}@${business.slug}.peralera.com`;"
    );
    content = content.replace(
      "const baseDomain = process.env.NEXT_PUBLIC_BASE_DOMAIN || 'peralera.com';\n    const email = `${adminPhone}@${slug}.${baseDomain}`;",
      "const email = `${adminPhone}@${slug}.peralera.com`;"
    );

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Reverted in ${file}`);
  }
});
