/**
 * Test script for Cloudinary sync endpoint
 * Run with: node test-sync.js
 */

const BASE_URL = process.env.API_URL || 'http://localhost:8088';

async function testSync() {
  console.log('🔄 Testing Cloudinary sync endpoint...');
  console.log(`📍 URL: ${BASE_URL}/api/media/sync-cloudinary\n`);

  try {
    const response = await fetch(`${BASE_URL}/api/media/sync-cloudinary`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Sync successful!\n');
      console.log('Response:', JSON.stringify(data, null, 2));
      
      if (data.stats) {
        console.log('\n📊 Statistics:');
        console.log(`  - Total in Cloudinary: ${data.stats.totalInCloudinary}`);
        console.log(`  - Existing in Database: ${data.stats.existingInDatabase}`);
        console.log(`  - New Items Added: ${data.stats.newItemsAdded}`);
        console.log(`  - Skipped: ${data.stats.skipped}`);
        console.log(`  - Total in Database: ${data.stats.totalInDatabase}`);
      }
    } else {
      console.error('❌ Sync failed!\n');
      console.error('Error:', data.error);
      console.error('Message:', data.message);
      if (data.details) {
        console.error('Details:', data.details);
      }
      process.exit(1);
    }
  } catch (error) {
    console.error('❌ Request failed:', error.message);
    console.error('\nMake sure your dev server is running:');
    console.error('  pnpm run dev');
    process.exit(1);
  }
}

// Also test database status
async function testStatus() {
  try {
    const response = await fetch(`${BASE_URL}/api/media/database/status`);
    const data = await response.json();
    
    console.log('\n📊 Database Status:');
    console.log(`  Storage: ${data.storage?.type || 'Unknown'}`);
    console.log(`  Has KV: ${data.storage?.hasKV || false}`);
    console.log(`  Media Count: ${data.media?.count || 0}`);
    console.log(`  Message: ${data.message || 'N/A'}`);
  } catch (error) {
    console.error('Could not check status:', error.message);
  }
}

// Run tests
(async () => {
  await testSync();
  await testStatus();
})();

