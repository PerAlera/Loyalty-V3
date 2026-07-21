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

async function testUpload() {
  const fileContent = "This is a test SVG file: <svg></svg>";
  
  console.log("Uploading to loyalty-assets...");
  const { data, error } = await supabase.storage
    .from("loyalty-assets")
    .upload("test-file.svg", Buffer.from(fileContent), {
      contentType: "image/svg+xml",
      upsert: true
    });

  if (error) {
    console.error("Upload failed with error:", error);
  } else {
    console.log("Upload succeeded!", data);
  }
}

testUpload();
