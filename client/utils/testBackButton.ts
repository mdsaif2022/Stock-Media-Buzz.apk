/**
 * Test Back Button Functionality
 * 
 * Run this in browser console to test if back button works
 */

export function testBackButtonWorkflow() {
  console.group('🧪 Testing Back Button Workflow');
  
  const initialUrl = window.location.href;
  const initialLength = window.history.length;
  
  console.log('Initial State:', {
    url: initialUrl,
    historyLength: initialLength,
    canGoBack: initialLength > 1,
  });
  
  if (initialLength <= 1) {
    console.warn('⚠️ Cannot test - no history to go back to');
    console.log('💡 Navigate to a few pages first, then run this test again');
    console.groupEnd();
    return;
  }
  
  // Monitor popstate
  let popstateFired = false;
  const popstateHandler = () => {
    popstateFired = true;
    console.log('✅ PopState event fired');
  };
  window.addEventListener('popstate', popstateHandler, { once: true });
  
  // Monitor location changes
  const checkInterval = setInterval(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== initialUrl) {
      clearInterval(checkInterval);
      window.removeEventListener('popstate', popstateHandler);
      
      console.log('✅ URL Changed:', {
        from: initialUrl,
        to: currentUrl,
        popstateFired,
      });
      
      if (!popstateFired) {
        console.warn('⚠️ URL changed but popstate did not fire - React Router might not be handling it');
      }
      
      console.groupEnd();
    }
  }, 100);
  
  console.log('Calling history.back()...');
  window.history.back();
  
  // Timeout after 2 seconds
  setTimeout(() => {
    clearInterval(checkInterval);
    window.removeEventListener('popstate', popstateHandler);
    
    if (window.location.href === initialUrl) {
      console.error('❌ Back button did not work - URL did not change');
      console.log('Possible causes:');
      console.log('1. All history entries have the same URL');
      console.log('2. Something is preventing popstate from working');
      console.log('3. React Router is not handling popstate correctly');
    }
    
    console.groupEnd();
  }, 2000);
}

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).testBackButton = testBackButtonWorkflow;
  console.log('💡 Run testBackButton() in console to test back button');
}

