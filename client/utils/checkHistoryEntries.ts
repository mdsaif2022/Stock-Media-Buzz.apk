/**
 * Check History Entries
 * 
 * Attempts to detect if all history entries have the same URL
 * Run: window.checkHistoryEntries() in console
 */

export function checkHistoryEntries() {
  console.group('🔍 Checking History Entries');
  
  const currentUrl = window.location.href;
  const historyLength = window.history.length;
  
  console.log('📍 Current State:');
  console.log('  Current URL:', currentUrl);
  console.log('  History Length:', historyLength);
  
  if (historyLength === 1) {
    console.log('  ✅ History length is 1 - this is normal for a fresh page');
    console.groupEnd();
    return;
  }
  
  console.log('\n🧪 Testing History Entries:');
  console.log('  Attempting to go back and check URLs...');
  
  const urls: string[] = [currentUrl];
  let attempts = 0;
  const maxAttempts = Math.min(historyLength - 1, 10); // Check up to 10 entries
  
  const checkNext = () => {
    attempts++;
    const url = window.location.href;
    urls.push(url);
    
    console.log(`  Entry ${attempts}: ${url}`);
    
    // Check if this URL is different from previous
    if (urls.length > 1 && url === urls[urls.length - 2]) {
      console.warn(`  ⚠️ Entry ${attempts} has same URL as previous entry!`);
    }
    
    if (attempts < maxAttempts && window.history.length > attempts + 1) {
      window.history.back();
      setTimeout(checkNext, 100);
    } else {
      // Restore position
      console.log('\n  Restoring position...');
      for (let i = 0; i < attempts; i++) {
        window.history.forward();
      }
      
      // Analyze results
      console.log('\n📊 Analysis:');
      const uniqueUrls = new Set(urls);
      console.log('  Total entries checked:', urls.length);
      console.log('  Unique URLs found:', uniqueUrls.size);
      
      if (uniqueUrls.size === 1) {
        console.error('❌ PROBLEM: All history entries have the same URL!');
        console.log('  This is why the back button does nothing.');
        console.log('  Solution: Navigate to a new page to create a fresh history entry.');
      } else if (uniqueUrls.size < urls.length / 2) {
        console.warn('⚠️ Many duplicate URLs in history');
        console.log('  This can cause back button issues');
      } else {
        console.log('✅ History entries have different URLs');
      }
      
      console.groupEnd();
    }
  };
  
  // Start checking
  window.history.back();
  setTimeout(checkNext, 100);
}

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).checkHistoryEntries = checkHistoryEntries;
  console.log('💡 Run checkHistoryEntries() to check if history entries have same URLs');
}

