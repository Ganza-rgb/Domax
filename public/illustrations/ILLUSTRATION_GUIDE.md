# Illustration Guide for Domax

## Background Removal Solutions for Freepik Images

### Option 1: Remove.bg (Easiest - Recommended) ⭐
- **Website**: https://www.remove.bg
- **Free Tier**: 1 image at a time (or 50/month with API)
- **Quality**: Excellent automatic removal
- **How to use**:
  1. Go to remove.bg
  2. Upload your Freepik image
  3. Download the result (PNG with transparency)
  4. Save to your illustrations folder

### Option 2: Canva (Free & Easy)
- **Website**: https://www.canva.com
- **Free**: Yes, with account
- **How to use**:
  1. Create a free account
  2. Upload your image
  3. Click on image → "Remove background" button
  4. Download as PNG

### Option 3: Photopea (Free, No Account Needed)
- **Website**: https://www.photopea.com
- **Free**: Completely free, works in browser
- **How to use**:
  1. Open Photopea in browser
  2. File → Open → Select your Freepik image
  3. Use Magic Wand tool (W) to select background
  4. Delete key to remove background
  5. File → Export As → PNG (with transparency)

### Option 4: Remove.bg API (For Automation)
- **Website**: https://www.remove.bg/api
- **Free Tier**: 50 API calls/month
- **Best for**: Batch processing multiple images
- See `scripts/README.md` for usage

## Modern Illustration Resources

### 1. **Ouch by Icons8** ⭐ Recommended
- **URL**: https://icons8.com/illustrations
- **Style**: Modern 3D and vector illustrations
- **License**: Free with attribution (or paid for no attribution)
- **Best for**: Professional, modern look

### 2. **Absurd Design**
- **URL**: https://absurd.design
- **Style**: Unique, abstract, hand-drawn
- **License**: Free for personal/commercial
- **Best for**: Standout, creative designs

### 3. **Streamline Illustrations**
- **URL**: https://www.streamlinehq.com/illustrations
- **Style**: Professional, consistent sets
- **License**: Free and premium options
- **Best for**: Cohesive design systems

### 4. **ManyPixels**
- **URL**: https://www.manypixels.co/gallery
- **Style**: Modern, customizable
- **License**: Free for commercial use
- **Best for**: Customizable illustrations

### 5. **DrawKit**
- **URL**: https://www.drawkit.io
- **Style**: Hand-drawn, modern
- **License**: Free for commercial use
- **Best for**: Friendly, approachable designs

## Workflow for Freepik Images

1. **Download from Freepik**
   - Search for illustrations matching your theme
   - Download in highest quality (PNG or SVG if available)

2. **Remove Background**
   - Use Remove.bg API (if automating)
   - Or use Photopea/Canva for manual removal
   - Save as PNG with transparency

3. **Optimize**
   - Use tools like TinyPNG or ImageOptim
   - For SVGs, use SVGO

4. **Organize**
   - Save to appropriate folder in `/public/illustrations/`
   - Use descriptive filenames

5. **Use in Components**
   - Import using Next.js Image component
   - Or use as inline SVG for better control

## Recommended Search Terms for Domax

- "education technology"
- "grading papers"
- "teacher student"
- "online learning"
- "document review"
- "academic assessment"
- "digital classroom"

## Color Matching

When using illustrations, ensure colors match Domax brand:
- Primary Blue: `#005ffe`
- Teal: `#00cd90`
- Navy: `#0A3059`

You can adjust colors in:
- SVG files (edit directly)
- PNG files (use image editors or CSS filters)

