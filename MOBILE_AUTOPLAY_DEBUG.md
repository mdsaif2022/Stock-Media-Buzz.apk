# 🔍 Mobile Autoplay Debugging Guide

## Quick Checks

### 1. Is it mobile?
Check browser console:
```javascript
window.innerWidth < 768  // Should be true on mobile
```

### 2. Is video detected?
Check if video element exists:
```javascript
document.querySelector('video')  // Should find video element
```

### 3. Is Intersection Observer working?
Add this to console:
```javascript
// Check if observer is attached
const observer = new IntersectionObserver(() => {});
console.log('Observer supported:', !!observer);
```

## Common Issues & Fixes

### Issue 1: Video not playing
**Check:**
- Video has `muted` attribute ✅
- Video has `playsInline` attribute ✅  
- Browser allows autoplay (may need user interaction first)

**Fix:** User must interact with page first (tap, scroll) before autoplay works.

### Issue 2: Autoplay blocked
**Symptoms:** Console shows "Video autoplay blocked"

**Fix:** 
- Ensure video is muted
- Requires user interaction (scroll counts as interaction)
- Some browsers need user to interact first

### Issue 3: Not detecting center viewport
**Check:**
- Scroll video to center of screen
- Check browser console for debug logs (development mode)

**Fix:** Lower threshold in `useMobileAutoplay` hook if needed.

### Issue 4: Multiple videos playing
**Check:** Video manager should pause others automatically

**Fix:** Verify `registerVideo` is called for each video.

---

## Testing Steps

1. **Open on mobile device** (not desktop browser emulator)
2. **Scroll to a video**
3. **Slowly scroll until video is in center**
4. **Check:** Video should start playing automatically
5. **Scroll away:** Video should pause
6. **Scroll to another video:** Previous should pause, new should play

---

## Debug Mode

In development, check browser console for logs:
- `[VideoCard] Mobile autoplay state:` - Shows current state
- `[VideoCard] Video autoplay blocked:` - Autoplay was blocked
- `[VideoCard] Video play error:` - Error occurred

---

## Browser Autoplay Policies

Most browsers allow autoplay if:
- ✅ Video is muted
- ✅ Video has `playsInline` (iOS)
- ✅ User has interacted with page (scroll, tap)
- ✅ Site has good engagement history

Some browsers (Safari iOS) may block autoplay until user interacts.

---

## Manual Test

Open browser console and run:
```javascript
// Force autoplay test
const video = document.querySelector('video');
if (video) {
  video.muted = true;
  video.playsInline = true;
  video.play().then(() => {
    console.log('✅ Autoplay works!');
  }).catch(err => {
    console.log('❌ Autoplay blocked:', err);
  });
}
```

