const fs = require('fs');
const env = fs.readFileSync('.env', 'utf8').split('\n').forEach(line => {
  const match = line.match(/^([^=]+)=(.*)$/);
  if (match) {
    let val = match[2];
    if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
    process.env[match[1]] = val;
  }
});
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createBucket() {
  console.log("Creating loyalty-assets bucket...");
  const { data, error } = await supabase.storage.createBucket('loyalty-assets', {
    public: true,
    allowedMimeTypes: ['image/svg+xml', 'image/png', 'image/jpeg'],
    fileSizeLimit: 10485760 // 10MB
  });

  if (error) {
    console.error("Failed to create bucket:", error);
  } else {
    console.log("Bucket created successfully:", data);
  }
}

createBucket();
