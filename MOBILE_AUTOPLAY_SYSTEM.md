# 📱 Mobile Autoplay Preview System

## Overview

A fully functional mobile autoplay preview system that automatically plays video previews when they enter the center viewport area (around 50% center). The system is optimized for mobile performance and ensures only one video plays at a time.

---

## Features

### ✅ Mobile Autoplay
- **Viewport Detection**: Videos autoplay when entering the center 50% of the viewport
- **Automatic Pause**: Videos pause when leaving the center area
- **Smooth Transitions**: Uses Intersection Observer for efficient, smooth detection

### ✅ Single Video Playback
- **Global Manager**: Only one video can play at a time across all pages
- **Automatic Pause**: When a new video starts, all others pause automatically
- **Seamless Experience**: No conflicts between multiple videos

### ✅ Desktop Compatibility
- **Hover Preview**: Desktop hover logic remains unchanged
- **Separate Systems**: Mobile autoplay and desktop hover work independently
- **Device Detection**: Automatically detects mobile vs desktop devices

### ✅ Mobile Requirements
- **Always Muted**: `muted={true}` - Required for autoplay
- **Inline Playback**: `playsInline={true}` - Prevents fullscreen on iOS
- **Autoplay Attribute**: `autoPlay={true}` - Triggers native autoplay

---

## Architecture

### Components

#### 1. **VideoManager** (`client/utils/videoManager.ts`)
Global video manager that ensures only one video plays at a time:
- `registerVideo(id, pauseCallback)` - Register a video instance
- `activateVideo(id)` - Activate a video (pauses others)
- `deactivateVideo(id)` - Deactivate a video
- `pauseAllVideos()` - Pause all videos

#### 2. **useMobileAutoplay Hook** (`client/hooks/useMobileAutoplay.ts`)
Custom hook for mobile viewport autoplay detection:
- Uses Intersection Observer for efficient detection
- Detects when video enters center 50% of viewport
- Returns `shouldAutoplay` boolean

#### 3. **VideoCard Component** (`client/components/media/VideoCard.tsx`)
Enhanced video card with mobile autoplay support:
- Integrates both desktop hover and mobile autoplay
- Registers with global video manager
- Handles play/pause logic for both modes

---

## How It Works

### Mobile Flow

1. **User Scrolls**: Video enters viewport
2. **Intersection Observer**: Detects video entering center area (50% viewport)
3. **Autoplay Triggered**: Video starts playing automatically
   - `muted={true}`
   - `playsInline={true}`
   - `autoPlay={true}`
4. **Global Manager**: Pauses any currently playing video
5. **User Scrolls Away**: Video leaves center area
6. **Auto Pause**: Video pauses automatically

### Desktop Flow (Unchanged)

1. **User Hovers**: Mouse enters video card
2. **Hover Detection**: `isHovering` state becomes `true`
3. **Video Plays**: Starts playing preview
4. **User Moves Away**: Mouse leaves card
5. **Video Pauses**: Returns to thumbnail

---

## Technical Details

### Viewport Detection

The center area is calculated as:
- **Viewport Center**: `window.innerHeight / 2`
- **Video Center**: `rect.top + rect.height / 2`
- **Max Distance**: `viewportHeight * 0.25` (25% above + 25% below = 50% total)
- **Detection**: Video center must be within 25% of viewport center

### Intersection Observer Configuration

```typescript
{
  threshold: [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1], // Multiple thresholds
  rootMargin: "0px"
}
```

### Video Attributes (Mobile)

```jsx
<video
  muted={true}           // Required for autoplay
  playsInline={true}     // Prevents fullscreen on iOS
  autoPlay={true}        // Triggers autoplay
  crossOrigin="anonymous"
  preload="metadata"     // Preloads for faster start
/>
```

---

## Usage

The system is automatically integrated into `VideoCard` component. No additional setup required.

### VideoCard Usage

```tsx
import { VideoCard } from "@/components/media/VideoCard";

<VideoCard 
  media={videoMedia} 
  to={`/browse/video/${videoMedia.id}`} 
  variant="detailed" 
/>
```

The component automatically:
- Detects mobile vs desktop
- Enables mobile autoplay on mobile devices
- Uses hover preview on desktop
- Manages single video playback

---

## Performance Optimizations

### 1. **Intersection Observer**
- More efficient than scroll listeners
- Native browser optimization
- Reduces CPU usage

### 2. **Preloading**
- Videos preload metadata when in viewport
- Faster autoplay response
- Reduces loading delay

### 3. **Single Playback**
- Only one video active at a time
- Reduces memory usage
- Better battery life on mobile

### 4. **Conditional Rendering**
- Mobile autoplay only active on mobile
- Desktop hover only active on desktop
- No unnecessary overhead

---

## Browser Support

### Mobile
- ✅ iOS Safari (with `playsInline`)
- ✅ Chrome Mobile
- ✅ Firefox Mobile
- ✅ Samsung Internet

### Desktop
- ✅ Chrome
- ✅ Firefox
- ✅ Safari
- ✅ Edge

---

## Configuration

### Adjust Center Area

Edit `client/hooks/useMobileAutoplay.ts`:

```typescript
// Change from 25% (50% total) to 30% (60% total)
const maxDistance = viewportHeight * 0.3;
```

### Adjust Threshold

Edit `client/components/media/VideoCard.tsx`:

```typescript
const shouldMobileAutoplay = useMobileAutoplay(cardRef, isMobile && !supportsHover, {
  threshold: 0.3, // 30% visible instead of 50%
});
```

---

## Troubleshooting

### Video Not Autoplaying on Mobile

**Check:**
1. Video has `muted={true}`
2. Video has `playsInline={true}`
3. Device is detected as mobile
4. Video is in center viewport area
5. Browser allows autoplay (may require user interaction first)

### Multiple Videos Playing

**Fix:** Ensure `VideoCard` components register with `videoManager`. This should happen automatically, but check console for errors.

### Videos Not Pausing

**Fix:** Check that `deactivateVideo()` is called when video leaves center area. Verify Intersection Observer is working.

---

## Testing

### Mobile Testing

1. **Open on mobile device**
2. **Scroll to video**
3. **Verify**: Video starts playing when entering center area
4. **Scroll away**
5. **Verify**: Video pauses when leaving center area
6. **Scroll to another video**
7. **Verify**: Previous video pauses, new video starts

### Desktop Testing

1. **Open on desktop**
2. **Hover over video**
3. **Verify**: Video plays on hover
4. **Move mouse away**
5. **Verify**: Video pauses
6. **Mobile autoplay should NOT activate on desktop**

---

## Files Modified

- ✅ `client/utils/videoManager.ts` - Global video manager
- ✅ `client/hooks/useMobileAutoplay.ts` - Mobile autoplay hook
- ✅ `client/components/media/VideoCard.tsx` - Enhanced with mobile autoplay

---

## Future Enhancements

Potential improvements:
- Custom center area size per video
- Volume control on mobile (user interaction required)
- Preview duration limit on mobile
- Analytics tracking for autoplay events

---

**System Status**: ✅ Fully Functional and Production Ready

