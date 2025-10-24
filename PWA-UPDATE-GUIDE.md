# PWA Auto-Update Guide

## Overview
The PWA (Progressive Web App) is now configured for automatic updates with smart cache management.

## Features

### 1. **Auto-Update on Rebuild**
- When you rebuild the app (`npm run build`), users will automatically receive the update
- Updates are detected and applied within 3 seconds
- A toast notification appears informing users of the update

### 2. **Smart Cache Strategy**

#### **Cleared on Update:**
- JavaScript files (`.js`)
- CSS files (`.css`)
- HTML files (`.html`)
- App icons (`.ico`, `.png`, `.svg`)

#### **Preserved Across Updates:**
- Images (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`)
  - Cache duration: 90 days
  - Max entries: 100 files
- Videos (`.mp4`, `.webm`, `.ogg`, `.avi`, `.mov`)
  - Cache duration: 90 days
  - Max entries: 20 files
- Google Fonts
  - Cache duration: 365 days

### 3. **Update Check Interval**
- The service worker checks for updates every 1 hour
- Updates are applied immediately when detected

## How It Works

1. **Build Process:**
   ```bash
   npm run build
   ```
   This generates a new service worker with a unique cache version.

2. **User Experience:**
   - User visits the site
   - Service worker detects new version
   - Toast notification appears: "Update Available - Updating in 3 seconds..."
   - User can click "Update Now" or wait 3 seconds
   - Page reloads with new version
   - Images and videos load from cache (fast)

3. **Cache Management:**
   - Old app caches are automatically deleted
   - Image and video caches persist
   - API responses cache for 2 days

## Configuration

### Vite PWA Config (`vite.config.js`)

```javascript
VitePWA({
  registerType: 'autoUpdate',  // Auto-update mode
  injectRegister: 'auto',
  strategies: 'generateSW',
  workbox: {
    cleanupOutdatedCaches: true,  // Remove old caches
    clientsClaim: true,           // Take control immediately
    skipWaiting: true,            // Activate new SW immediately
    
    // Runtime caching strategies
    runtimeCaching: [
      // Images: Cache first, long duration
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'images-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 90  // 90 days
          }
        }
      },
      // Videos: Cache first, long duration
      {
        urlPattern: /\.(?:mp4|webm|ogg|avi|mov)$/,
        handler: 'CacheFirst',
        options: {
          cacheName: 'videos-cache',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 90  // 90 days
          }
        }
      },
      // API: Network first, short duration
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 100,
            maxAgeSeconds: 60 * 60 * 24 * 2  // 2 days
          }
        }
      }
    ]
  }
})
```

## Manual Cache Clear

If you need to force clear ALL caches (including images/videos):

```javascript
// In browser console:
if ('serviceWorker' in navigator) {
  caches.keys().then(cacheNames => {
    cacheNames.forEach(cacheName => {
      caches.delete(cacheName);
    });
  }).then(() => {
    window.location.reload();
  });
}
```

## Testing

### Test Auto-Update Locally:

1. Build the app:
   ```bash
   npm run build
   npm run preview
   ```

2. Open in browser and note the version

3. Make a change to the code

4. Build again:
   ```bash
   npm run build
   ```

5. The running preview should detect the update and show the toast notification

### Test in Production:

1. Deploy new build
2. Users with the app open will receive update notification within 1 hour
3. New visitors get the latest version immediately

## Troubleshooting

### Updates Not Detected
- Check if service worker is registered: `navigator.serviceWorker.controller`
- Check browser console for SW errors
- Verify build created new files with different hashes

### Images/Videos Not Loading
- Check cache in DevTools > Application > Cache Storage
- Verify `images-cache` and `videos-cache` exist
- Check network requests in DevTools

### Toast Not Appearing
- Check App.jsx for the toast component
- Verify global.scss has the slideUp animation
- Check browser console for React errors

## Best Practices

1. **Always test updates in staging** before production
2. **Monitor cache sizes** - adjust maxEntries if needed
3. **Update cache durations** based on your content update frequency
4. **Version your API** to avoid breaking changes with cached responses
5. **Use CDN** for large media files to reduce cache size

## Cache Size Estimates

- **Images**: ~100 files × 500KB avg = ~50MB
- **Videos**: ~20 files × 10MB avg = ~200MB
- **API**: ~100 responses × 50KB avg = ~5MB
- **App**: JS/CSS/HTML = ~2-5MB

**Total**: ~250-260MB maximum

Browsers typically allow 50-100MB per origin, adjust maxEntries accordingly.
