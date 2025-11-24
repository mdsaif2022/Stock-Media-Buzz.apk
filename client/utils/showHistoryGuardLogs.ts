/**
 * Show History Guard Logs
 * 
 * This utility helps you see what the history guard is doing
 * Run: window.showHistoryGuardLogs() in console
 */

export function showHistoryGuardLogs() {
  console.group('📋 How to Check History Guard Messages');
  
  console.log('1. Open Browser Console:');
  console.log('   - Press F12 (or Ctrl+Shift+I / Cmd+Option+I)');
  console.log('   - Click on "Console" tab');
  
  console.log('\n2. Look for messages starting with "[History Guard]":');
  console.log('   - "[History Guard] ALLOWED pushState" = Guard allowed the navigation');
  console.log('   - "[History Guard] BLOCKED pushState" = Guard blocked a duplicate');
  console.log('   - "[History Guard] Blocking duplicate pushState" = Warning about blocking');
  
  console.log('\n3. Filter console messages:');
  console.log('   - In console, type: [History Guard]');
  console.log('   - This will show only history guard messages');
  
  console.log('\n4. Check initial state:');
  console.log('   - Look for: "[History Guard] Setting up guard..."');
  console.log('   - It shows initial history length');
  
  console.log('\n5. Count messages:');
  console.log('   - Count how many "ALLOWED" vs "BLOCKED" messages you see');
  console.log('   - If you see many "ALLOWED" for same URL, guard might be too permissive');
  
  console.log('\n6. Check stack traces:');
  console.log('   - When guard blocks, it shows a stack trace');
  console.log('   - This tells you what code is calling pushState');
  console.log('   - Look for file names and line numbers');
  
  console.log('\n7. Current state:');
  console.log('   History Length:', window.history.length);
  console.log('   Current URL:', window.location.href);
  
  console.log('\n💡 Tip: Clear console (Ctrl+L) and refresh page to see fresh logs');
  
  console.groupEnd();
}

// Make available globally
if (typeof window !== 'undefined') {
  (window as any).showHistoryGuardLogs = showHistoryGuardLogs;
  console.log('💡 Run showHistoryGuardLogs() to see how to check history guard messages');
}

