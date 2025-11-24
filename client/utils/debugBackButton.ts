/**
 * Debug Back Button Issues
 * 
 * Run: window.debugBackButton() in console
 */

export function debugBackButton() {
  console.group('🔍 Back Button Debug');
  
  // Check current state
  console.log('📍 Current State:');
  console.log('  URL:', window.location.href);
  console.log('  Pathname:', window.location.pathname);
  console.log('  History Length:', window.history.length);
  console.log('  History State:', window.history.state);
  
  // Check if we can go back
  console.log('\n🧪 Testing Back Button:');
  const urlBefore = window.location.href;
  const pathnameBefore = window.location.pathname;
  
  console.log('  Before back():', urlBefore);
  console.log('  Calling history.back()...');
  
  // Add a listener to see if popstate fires
  const popstateListener = () => {
    console.log('  ✅ popstate event fired!');
    console.log('  URL after popstate:', window.location.href);
    console.log('  Pathname after popstate:', window.location.pathname);
  };
  
  window.addEventListener('popstate', popstateListener, { once: true });
  
  // Call back
  window.history.back();
  
  // Check after a delay
  setTimeout(() => {
    const urlAfter = window.location.href;
    const pathnameAfter = window.location.pathname;
    
    console.log('  After back():', urlAfter);
    console.log('  URL Changed:', urlBefore !== urlAfter);
    console.log('  Pathname Changed:', pathnameBefore !== pathnameAfter);
    
    if (urlBefore === urlAfter) {
      console.error('❌ PROBLEM: Back button did not change URL!');
      console.log('  This means:');
      console.log('    1. All history entries have the same URL (duplicates)');
      console.log('    2. OR history.back() is being blocked');
      console.log('    3. OR React Router is not handling popstate');
      
      // Check if popstate fired
      console.log('\n  Checking if popstate fired...');
      // We can't directly check, but we can see if URL changed
      
      // Try to go back multiple times to see if we can find a different URL
      console.log('\n  Attempting to go back multiple times...');
      let attempts = 0;
      const maxAttempts = 5;
      const checkHistory = () => {
        attempts++;
        const currentUrl = window.location.href;
        console.log(`  Attempt ${attempts}: ${currentUrl}`);
        
        if (currentUrl !== urlBefore) {
          console.log('  ✅ Found different URL!');
          // Go forward to restore
          window.history.forward();
          return;
        }
        
        if (attempts < maxAttempts) {
          window.history.back();
          setTimeout(checkHistory, 100);
        } else {
          console.error('  ❌ Could not find different URL after', maxAttempts, 'attempts');
          console.log('  All history entries likely have the same URL');
        }
      };
      
      setTimeout(checkHistory, 200);
    } else {
      console.log('✅ Back button works - URL changed');
      // Go forward to restore
      window.history.forward();
    }
    
    window.removeEventListener('popstate', popstateListener);
    console.groupEnd();
  }, 300);
}

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).debugBackButton = debugBackButton;
  console.log('💡 Run debugBackButton() in console to debug back button issues');
}

