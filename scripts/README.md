# Scripts

## Background Removal Script

Remove backgrounds from Freepik images using Remove.bg API.

### Setup

1. Get a free API key from https://www.remove.bg/api (50 free images/month)
2. Set environment variable:
   ```bash
   export REMOVE_BG_API_KEY=your_api_key_here
   ```

### Usage

```bash
node scripts/remove-background.js <input-image> <output-image>
```

### Example

```bash
# Remove background from a Freepik image
node scripts/remove-background.js \
  ~/Downloads/freepik-illustration.png \
  public/illustrations/onboarding/signup-no-bg.png
```

### Alternative: Manual Tools

If you prefer manual control or don't want to use the API:

1. **Photopea** (Free): https://www.photopea.com
   - Open image
   - Use Magic Wand or Select Subject
   - Delete background
   - Export as PNG with transparency

2. **Canva** (Free): https://www.canva.com
   - Upload image
   - Use "Remove background" tool
   - Download as PNG

3. **GIMP** (Free Desktop): https://www.gimp.org
   - Professional-grade free alternative to Photoshop











