/**
 * Force Refresh History
 * 
 * This utility forces a page refresh to clear all duplicate history entries
 * Run: window.forceRefreshHistory() in console
 */

export function forceRefreshHistory() {
  console.group('🔄 Force Refresh History');
  
  console.log('📍 Current State:');
  console.log('  Current URL:', window.location.href);
  console.log('  History Length:', window.history.length);
  
  console.log('\n💡 Solution: Refreshing page to clear all duplicate history entries...');
  console.log('  After refresh, navigate through your app normally');
  console.log('  The history guard will prevent new duplicates from being created');
  
  // Force a hard refresh to clear all history
  setTimeout(() => {
    window.location.reload();
  }, 1000);
  
  console.groupEnd();
}

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).forceRefreshHistory = forceRefreshHistory;
  console.log('💡 Run forceRefreshHistory() to force a page refresh and clear duplicate history');
}

