/**
 * Navigation Demo - Working Example of Proper History Navigation
 * 
 * This component demonstrates:
 * 1. pushState vs replaceState behavior
 * 2. Creating distinct history entries
 * 3. Proper React Router navigation
 * 4. Testing back/forward buttons
 * 
 * Access at: /navigation-demo
 */

import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '@/components/Layout';

export default function NavigationDemo() {
  const navigate = useNavigate();
  const location = useLocation();
  const [historyLog, setHistoryLog] = useState<string[]>([]);

  useEffect(() => {
    const log = `Navigated to: ${location.pathname}${location.search}`;
    setHistoryLog(prev => [...prev, log]);
  }, [location]);

  // ✅ CORRECT: Normal navigation (creates new history entry)
  const handleNavigate = (path: string) => {
    // Only navigate if URL is different
    if (location.pathname !== path) {
      navigate(path); // pushState - creates new entry
      console.log(`✅ Navigated to: ${path} (new history entry)`);
    } else {
      console.log(`⚠️ Already on: ${path} (skipping navigation)`);
    }
  };

  // ⚠️ DEMO: Replace navigation (replaces current entry)
  const handleReplace = (path: string) => {
    navigate(path, { replace: true }); // replaceState - replaces current entry
    console.log(`🔄 Replaced with: ${path} (replaced current entry)`);
  };

  // Test history API directly
  const testHistoryBack = () => {
    console.log('Testing history.back()...');
    const beforeUrl = window.location.href;
    window.history.back();
    
    setTimeout(() => {
      const afterUrl = window.location.href;
      if (beforeUrl === afterUrl) {
        console.error('❌ Back button did not change URL!');
        alert('Back button failed - all history entries may have the same URL');
      } else {
        console.log('✅ Back button works!');
        console.log(`Went from: ${beforeUrl}`);
        console.log(`To: ${afterUrl}`);
      }
    }, 100);
  };

  const testHistoryForward = () => {
    console.log('Testing history.forward()...');
    window.history.forward();
  };

  const checkHistoryState = () => {
    const state = {
      currentUrl: window.location.href,
      historyLength: window.history.length,
      canGoBack: window.history.length > 1,
      canGoForward: window.history.length > 1, // Simplified check
    };
    
    console.log('History State:', state);
    alert(JSON.stringify(state, null, 2));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Navigation Demo</h1>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Current State</h2>
          <p><strong>URL:</strong> {location.pathname}{location.search}</p>
          <p><strong>History Length:</strong> {window.history.length}</p>
          <p><strong>Can Go Back:</strong> {window.history.length > 1 ? 'Yes' : 'No'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Normal Navigation (pushState) */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">✅ Normal Navigation (pushState)</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Creates a NEW history entry. Back button can navigate to previous page.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleNavigate('/')}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Navigate to Home
              </button>
              <button
                onClick={() => handleNavigate('/browse')}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Navigate to Browse
              </button>
              <button
                onClick={() => handleNavigate('/browse/video')}
                className="w-full px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
              >
                Navigate to Videos
              </button>
            </div>
          </div>

          {/* Replace Navigation (replaceState) */}
          <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-3">🔄 Replace Navigation (replaceState)</h2>
            <p className="text-sm text-muted-foreground mb-3">
              Replaces CURRENT history entry. Back button skips this entry.
            </p>
            <div className="space-y-2">
              <button
                onClick={() => handleReplace('/')}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Replace with Home
              </button>
              <button
                onClick={() => handleReplace('/browse')}
                className="w-full px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Replace with Browse
              </button>
            </div>
          </div>
        </div>

        {/* Test Buttons */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-3">Test History API</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <button
              onClick={testHistoryBack}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Back
            </button>
            <button
              onClick={testHistoryForward}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Test Forward
            </button>
            <button
              onClick={checkHistoryState}
              className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
            >
              Check State
            </button>
            <button
              onClick={() => setHistoryLog([])}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Clear Log
            </button>
          </div>
        </div>

        {/* Navigation Log */}
        <div className="bg-white dark:bg-slate-900 border border-border rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-3">Navigation Log</h2>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {historyLog.length === 0 ? (
              <p className="text-muted-foreground">No navigation yet...</p>
            ) : (
              historyLog.map((log, index) => (
                <div key={index} className="text-sm font-mono p-2 bg-slate-50 dark:bg-slate-800 rounded">
                  {log}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-2">How to Test</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Click "Navigate to Home" (creates entry 1)</li>
            <li>Click "Navigate to Browse" (creates entry 2)</li>
            <li>Click "Navigate to Videos" (creates entry 3)</li>
            <li>Click browser back button - should go to Browse</li>
            <li>Click browser back button - should go to Home</li>
            <li>Click browser forward button - should go to Browse</li>
            <li>Click "Test Back" to test programmatically</li>
            <li>Click "Check State" to see current history state</li>
          </ol>
        </div>
      </div>
    </Layout>
  );
}

