# Features Dropdown Section - Guide

## What Was Added

An interactive dropdown section on the homepage with:
- **3 clickable dropdowns** that expand to show details
- **Dynamic illustration** on the right that changes based on which dropdown is selected
- **Pricing features section** at the bottom with checkmarks

## How It Works

1. Click any dropdown to expand it and see full details
2. The illustration on the right automatically changes to match the selected feature
3. Only one dropdown can be open at a time

## Adding Your Freepik Illustrations

Once you download and remove backgrounds from your Freepik images:

### Step 1: Save Illustrations
Save your illustrations to these paths:
```
public/illustrations/features/connect-faster.png
public/illustrations/features/protect-against.png
public/illustrations/features/ship-smarter.png
```

### Step 2: Update Component (if needed)
The component is already configured to use these paths. If you use different filenames, update `components/organisms/FeaturesDropdown.js`:

```jsx
const features = [
  {
    id: 'connect',
    title: 'Connect faster. Anywhere.',
    illustration: '/illustrations/features/connect-faster.png', // ← Update this
    // ...
  },
  // ...
]
```

### Step 3: Test
1. Visit your homepage
2. Click each dropdown
3. Verify the illustration changes correctly

## Current Features

1. **Connect faster. Anywhere.**
   - Illustration: `connect-faster.png`
   - About: Fast page loads and edge network

2. **Protect against the worst**
   - Illustration: `protect-against.png`
   - About: Downtime protection and security

3. **Ship smarter. Everywhere.**
   - Illustration: `ship-smarter.png`
   - About: Fast deployment and global scaling

## Customization

### Change Default Open Feature
In `FeaturesDropdown.js`, change:
```jsx
const [expandedId, setExpandedId] = useState('connect') // Change 'connect' to 'protect' or 'ship'
```

### Add More Features
Add to the `features` array:
```jsx
{
  id: 'new-feature',
  title: 'Your Title',
  description: 'Your description...',
  illustration: '/illustrations/features/new-feature.png',
}
```

### Styling
The component uses your existing design system colors:
- Primary: `#ff7a18` (orange)
- Text: `#10143a` (navy)
- Background: `#eff3ff` (light blue)

## Notes

- The illustration placeholder will show until you add actual images
- Illustrations should be square or close to square for best display
- Recommended size: 500x500px to 800x800px
- Format: PNG with transparent background (after removing background from Freepik)











