// backend/src/test-cloudinary.js

const cloudinary = require('cloudinary').v2;

// ─── STEP 1: Configure Cloudinary ───
cloudinary.config({
  cloud_name: 'dyjtwsl7m',      // ← your cloud name
  api_key: '268344139922788',   // ← your API key
  api_secret: 'fuyBdNlxSZiQCUYx2T67Mi0D1nM' // ← your API secret
});

console.log('📸 Cloudinary configured successfully!\n');

// ─── STEP 2: Upload an image ───
const sampleImageUrl = 'https://res.cloudinary.com/demo/image/upload/sample.jpg';

console.log('📤 Uploading sample image...');

cloudinary.uploader.upload(sampleImageUrl, { public_id: 'sample-upload' })
  .then(result => {
    console.log('✅ Upload successful!\n');
    console.log('📎 Public ID:', result.public_id);
    console.log('🔗 Secure URL:', result.secure_url);
    console.log('\n─'.repeat(40) + '\n');

    // ─── STEP 3: Get image details ───
    console.log('📊 Image Metadata:');
    console.log(`   Width:  ${result.width}px`);
    console.log(`   Height: ${result.height}px`);
    console.log(`   Format: ${result.format}`);
    console.log(`   Size:   ${(result.bytes / 1024).toFixed(2)} KB (${result.bytes} bytes)`);
    console.log('\n─'.repeat(40) + '\n');

    // ─── STEP 4: Transform the image ───
    // f_auto = automatic format selection (WebP/AVIF for smaller size)
    // q_auto = automatic quality optimization (balance size & quality)
    const transformedUrl = cloudinary.url('sample-upload', {
      transformation: [
        { fetch_format: 'auto' },  // f_auto — picks best format
        { quality: 'auto' }        // q_auto — optimizes quality
      ]
    });

    console.log('✨ Transformations applied:');
    console.log('   - f_auto: automatic format (WebP/AVIF)');
    console.log('   - q_auto: automatic quality optimization');
    console.log('\n🔗 Transformed URL:');
    console.log(transformedUrl);
    console.log('\n' + '✅ Done! Open the link above to see the optimized image.');
    console.log('   Check the size and format in your browser.\n');
  })
  .catch(error => {
    console.error('❌ Upload failed:', error.message);
  });
