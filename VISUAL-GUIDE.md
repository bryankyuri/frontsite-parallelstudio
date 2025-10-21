# 🎨 Visual Guide: WorkDetail Updates

## 1️⃣ Hero Banner Anchor Positioning

### **Before:**
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│     Image always centered at top   │
│     (hardcoded: center 0px)         │
│                                     │
│                                     │
└─────────────────────────────────────┘
```

### **After (9-Point Grid Control):**
```
┌─────────────────────────────────────┐
│ TL  │   TC    │   TR               │
├─────┼─────────┼────────────────────┤
│ ML  │   MC    │   MR               │
├─────┼─────────┼────────────────────┤
│ BL  │   BC    │   BR               │
└─────────────────────────────────────┘

TL = Top Left      TC = Top Center      TR = Top Right
ML = Middle Left   MC = Middle Center   MR = Middle Right
BL = Bottom Left   BC = Bottom Center   BR = Bottom Right
```

**Example Use Cases:**
- **Top Right:** Subject in upper right corner
- **Bottom Center:** Subject at bottom (landscape shots)
- **Middle Left:** Subject on left side (portrait shots)

---

## 2️⃣ Gallery Image Types

### **Full Width Images**

#### **Type: `full-16:9`** (Standard Widescreen)
```
┌───────────────────────────────────────────────┐
│                                               │
│          16:9 Aspect Ratio                    │
│          56.25% height                        │
│                                               │
└───────────────────────────────────────────────┘
```

#### **Type: `full-2.35:1`** (CinemaScope)
```
┌───────────────────────────────────────────────┐
│                                               │
│        2.35:1 Ultra-Wide Cinema               │
│        42.55% height                          │
└───────────────────────────────────────────────┘
```

#### **Type: `full-2.39:1`** (Panavision)
```
┌───────────────────────────────────────────────┐
│                                               │
│        2.39:1 Anamorphic Cinema               │
│        41.84% height                          │
└───────────────────────────────────────────────┘
```

---

### **Two Column Images**

#### **Type: `2col-16:9`**
```
┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │
│   Image 1       │  │   Image 2       │
│   16:9 ratio    │  │   16:9 ratio    │
│                 │  │                 │
└─────────────────┘  └─────────────────┘
        gap: 10px
```

#### **Type: `2col-2.35:1`**
```
┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │
│ Ultra-wide      │  │ Ultra-wide      │
│ CinemaScope     │  │ CinemaScope     │
└─────────────────┘  └─────────────────┘
```

#### **Type: `2col-2.39:1`**
```
┌─────────────────┐  ┌─────────────────┐
│                 │  │                 │
│ Anamorphic      │  │ Anamorphic      │
│ Panavision      │  │ Panavision      │
└─────────────────┘  └─────────────────┘
```

---

### **Before/After Comparison**

#### **Type: `compare-16:9`**
```
┌─────────────────────────────────────────────┐
│ [BEFORE]                         [AFTER]    │ ← Sticky controls
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ BEFORE IMAGE    │    AFTER IMAGE            │
│                 │                           │
│      ←──────────┼──────────→                │ ← Draggable slider
│                 │                           │
└─────────────────────────────────────────────┘
```

#### **Type: `compare-2.35:1`**
```
┌─────────────────────────────────────────────┐
│ [BEFORE]                         [AFTER]    │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│                 │                           │
│  Ultra-wide comparison with CinemaScope     │
│      ←──────────┼──────────→                │
└─────────────────────────────────────────────┘
```

---

## 3️⃣ Aspect Ratio Comparison

### **Visual Size Comparison (Same Width):**

```
┌───────────────────────────────────────────────┐
│             16:9 (56.25%)                     │
│                                               │
│                                               │
└───────────────────────────────────────────────┘

┌───────────────────────────────────────────────┐
│          2.35:1 (42.55%)                      │
│                                               │
└───────────────────────────────────────────────┘

┌───────────────────────────────────────────────┐
│          2.39:1 (41.84%)                      │
│                                               │
└───────────────────────────────────────────────┘
```

**Notice:** Cinema ratios (2.35:1, 2.39:1) are much wider and shorter than standard 16:9

---

## 4️⃣ Responsive Behavior

### **Desktop (1024px+):**
```
Full Width:     ┌─────────────────────────────────────┐
                │         Full container width        │
                └─────────────────────────────────────┘

Two Column:     ┌───────────────┐  ┌───────────────┐
                │   50% width   │  │   50% width   │
                └───────────────┘  └───────────────┘
```

### **Mobile (< 768px):**
```
Full Width:     ┌─────────────────────┐
                │   Full width        │
                └─────────────────────┘

Two Column:     ┌─────────────────────┐
                │   Responsive grid   │
                └─────────────────────┘
                ┌─────────────────────┐
                │   Still side-by-side│
                └─────────────────────┘
```

---

## 5️⃣ Image Popup Feature

### **Click Any Image:**
```
┌─────────────────────────────────────────────────────┐
│  ✕                                                  │ ← Close button
│                                                     │
│                                                     │
│                 ┌─────────────┐                     │
│                 │             │                     │
│  ‹              │   Image     │              ›      │ ← Navigation
│                 │  Popup      │                     │
│                 │             │                     │
│                 └─────────────┘                     │
│                                                     │
│                    1 / 2                            │ ← Counter
│                                                     │
└─────────────────────────────────────────────────────┘
        Click anywhere outside to close
```

**Features:**
- Fullscreen overlay
- Navigation arrows for multi-image galleries
- Image counter (1/2, 2/2, etc.)
- Keyboard support (Escape to close, Arrow keys to navigate)

---

## 6️⃣ Layout Examples

### **Example Work Layout:**

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│     HERO BANNER (with anchor positioning)          │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│ Client: ABC Company    │  Tags: #Commercial        │
│ Title: Amazing Project │  Year: 2025               │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│                                                     │
│         VIDEO PLAYER (16:9)                         │
│                                                     │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│           Gallery Item 1: full-2.35:1               │
└─────────────────────────────────────────────────────┘

┌─────────────────┐  ┌─────────────────┐
│  Gallery Item 2 │  │  2col-16:9      │
└─────────────────┘  └─────────────────┘

┌─────────────────────────────────────────────────────┐
│  Gallery Item 3: compare-2.39:1                     │
│  [BEFORE] ←──────────┼──────────→ [AFTER]          │
└─────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────┐
│              MORE WORKS (Carousel)                  │
└─────────────────────────────────────────────────────┘
```

---

## 7️⃣ CSS Technique: Aspect Ratio Padding Trick

### **How It Works:**
```css
/* Container with padding-bottom for aspect ratio */
.container {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 = 9/16 * 100 */
  overflow: hidden;
}

/* Image positioned absolutely inside */
.container img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Fills container, may crop */
}
```

**Why This Works:**
- `padding-bottom` percentage is relative to width
- Creates responsive height that maintains ratio
- Absolute positioned content fills the space
- Works on all screen sizes

---

## 8️⃣ Type Selection Guide

### **When to Use Each Type:**

| Type | Best For | Use Case |
|------|----------|----------|
| `full-16:9` | Standard video frames | Behind-the-scenes, interviews |
| `full-2.35:1` | Cinematic wide shots | Landscapes, establishing shots |
| `full-2.39:1` | Anamorphic cinema | Premium film look, dramatic shots |
| `2col-16:9` | Product comparisons | Before/after, variations |
| `2col-2.35:1` | Wide scene pairs | Dual wide angles |
| `2col-2.39:1` | Cinematic pairs | Split-screen cinema |
| `compare-16:9` | Video frame comparison | Color grading, VFX |
| `compare-2.35:1` | Wide shot comparison | Landscape changes |
| `compare-2.39:1` | Premium comparison | High-end film work |

---

## 🎯 Quick Reference

### **Hero Banner:**
- API fields: `hero_banner_position_x`, `hero_banner_position_y`
- Valid X: `left`, `center`, `right`
- Valid Y: `top`, `center`, `bottom`
- Default: `center top`

### **Gallery Types:**
- Format: `{category}-{ratio}`
- Categories: `full`, `2col`, `compare`
- Ratios: `16:9`, `2.35:1`, `2.39:1`
- Total: 9 types

### **Aspect Ratios:**
- 16:9 = 56.25% padding
- 2.35:1 = 42.55% padding
- 2.39:1 = 41.84% padding

---

**Last Updated:** October 21, 2025  
**Status:** ✅ Implementation Complete
