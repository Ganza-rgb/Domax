# Example: Using Illustrations in Your Components

## Quick Start

Once you've downloaded and removed backgrounds from Freepik illustrations, here's how to use them:

## Example 1: Using in Signup Page

```jsx
// app/signup/page.js
import Illustration from '@/components/atoms/Illustration'

// In your component:
<div className="hidden lg:flex flex-1 items-center justify-center bg-[#0A3059] p-12">
  <div className="max-w-md w-full">
    {/* Add illustration at the top */}
    <Illustration
      src="/illustrations/onboarding/signup-illustration.png"
      alt="Sign up illustration"
      width={500}
      height={400}
      className="mb-8"
      priority
    />
    
    {/* Rest of your content */}
  </div>
</div>
```

## Example 2: Using Next.js Image Directly

```jsx
import Image from 'next/image'

<Image
  src="/illustrations/features/automated-grading.png"
  alt="Automated grading illustration"
  width={600}
  height={400}
  className="object-contain"
  priority
/>
```

## Example 3: Using with Utility Functions

```jsx
import { illustrationPaths } from '@/lib/illustrationUtils'
import Illustration from '@/components/atoms/Illustration'

<Illustration
  src={illustrationPaths.signup}
  alt="Sign up"
  width={500}
  height={400}
/>
```

## Recommended Workflow

1. **Download from Freepik**
   - Search: "education sign up" or "teacher student"
   - Download high-quality PNG

2. **Remove Background**
   - Use Remove.bg (easiest): https://www.remove.bg
   - Or Canva/Photopea for manual control

3. **Save to Project**
   ```bash
   # Save to appropriate folder
   public/illustrations/onboarding/signup-illustration.png
   ```

4. **Use in Component**
   ```jsx
   <Illustration
     src="/illustrations/onboarding/signup-illustration.png"
     alt="Sign up"
     width={500}
     height={400}
   />
   ```

## Best Practices

- **File naming**: Use descriptive names (e.g., `signup-illustration.png`)
- **Organization**: Keep illustrations in category folders
- **Optimization**: Compress images before adding (use TinyPNG)
- **Alt text**: Always provide meaningful alt text for accessibility
- **Sizing**: Use appropriate dimensions (don't make images too large)

## Modern Illustration Resources (Better than unDraw)

1. **Ouch by Icons8**: https://icons8.com/illustrations
2. **Absurd Design**: https://absurd.design
3. **Streamline**: https://www.streamlinehq.com/illustrations
4. **ManyPixels**: https://www.manypixels.co/gallery

These offer more modern, professional illustrations that better match Domax's aesthetic.











