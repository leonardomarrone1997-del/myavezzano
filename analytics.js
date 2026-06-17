/**
 * Vercel Web Analytics initialization
 * 
 * This file initializes Vercel Web Analytics for the MyAvezzano application.
 * Analytics will be automatically tracked once deployed to Vercel.
 * 
 * IMPORTANT: After deploying to Vercel, enable Web Analytics in your project settings:
 * 1. Go to your project in Vercel dashboard
 * 2. Navigate to the Analytics tab  
 * 3. Click "Enable" to activate Web Analytics
 * 4. Deploy again to start tracking
 * 
 * Once enabled, this script will automatically start tracking:
 * - Page views
 * - Web Vitals (CLS, FID, FCP, LCP, TTFB)
 * - User interactions
 */

(function() {
  'use strict';
  
  // Check if we're in a browser environment
  if (typeof window === 'undefined') return;
  
  // Initialize the analytics queue
  if (!window.va) {
    window.va = function va() {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }
  
  // Detect environment (development or production)
  var isProduction = window.location.hostname !== 'localhost' && 
                     window.location.hostname !== '127.0.0.1' &&
                     !window.location.hostname.startsWith('192.168.');
  
  // Set the mode
  window.vam = isProduction ? 'production' : 'development';
  
  // Only load the analytics script in production (when deployed to Vercel)
  if (isProduction) {
    // The analytics script will be automatically injected by Vercel
    // when Web Analytics is enabled in the dashboard
    var script = document.createElement('script');
    script.defer = true;
    script.src = '/_vercel/insights/script.js';
    script.onerror = function() {
      // If the Vercel script fails to load (analytics not enabled),
      // silently fail - this allows the app to work without analytics
      console.info('Vercel Analytics not enabled. Enable it in your Vercel dashboard.');
    };
    document.head.appendChild(script);
  } else {
    console.info('Vercel Analytics: Running in development mode. Analytics will be active in production.');
  }
})();
