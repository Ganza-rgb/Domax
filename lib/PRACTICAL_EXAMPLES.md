# Practical Examples: Before & After

## Example 1: Using Illustrations in Your Signup Page

### ❌ WITHOUT `illustrationUtils.js` (Manual way)
```jsx
// app/signup/page.js
import Image from 'next/image'

export default function SignupPage() {
  return (
    <div>
      {/* You have to type the full path every time */}
      <Image 
        src="/illustrations/onboarding/signup-illustration.png" 
        alt="Sign up"
        width={500}
        height={400}
      />
      
      {/* Easy to make typos! */}
      <Image 
        src="/illustrations/onboarding/login-illustration.png"  // Typo? Who knows!
        alt="Login"
        width={500}
        height={400}
      />
    </div>
  )
}
```

### ✅ WITH `illustrationUtils.js` (Clean way)
```jsx
// app/signup/page.js
import Image from 'next/image'
import { illustrationPaths } from '@/lib/illustrationUtils'

export default function SignupPage() {
  return (
    <div>
      {/* Clean, no typos possible! */}
      <Image 
        src={illustrationPaths.signup}  // Automatically: /illustrations/onboarding/signup.svg
        alt="Sign up"
        width={500}
        height={400}
      />
      
      <Image 
        src={illustrationPaths.login}  // Automatically: /illustrations/onboarding/login.svg
        alt="Login"
        width={500}
        height={400}
      />
    </div>
  )
}
```

**Benefits:**
- ✅ No typos (autocomplete helps)
- ✅ If you rename a folder, change it once in utils
- ✅ Cleaner code

---

## Example 2: Removing Backgrounds

### ❌ WITHOUT `remove-background.js` (Manual way)
1. Download Freepik image
2. Open Remove.bg website
3. Upload image
4. Wait for processing
5. Download result
6. Rename file
7. Move to project folder
8. Repeat for each image... 😫

**Time:** ~2 minutes per image

### ✅ WITH `remove-background.js` (Automated way)
```bash
# One command per image:
node scripts/remove-background.js \
  ~/Downloads/freepik-image.png \
  public/illustrations/onboarding/signup.png
```

**Time:** ~10 seconds per image

**Benefits:**
- ✅ Fast (especially for many images)
- ✅ Consistent output location
- ✅ Can be scripted for batch processing

---

## Example 3: Processing Multiple Images

### Scenario: You downloaded 5 Freepik illustrations

**Manual way:**
1. Image 1: Remove.bg website → download → rename → move (2 min)
2. Image 2: Remove.bg website → download → rename → move (2 min)
3. Image 3: Remove.bg website → download → rename → move (2 min)
4. Image 4: Remove.bg website → download → rename → move (2 min)
5. Image 5: Remove.bg website → download → rename → move (2 min)

**Total: ~10 minutes** 😴

**Automated way:**
```bash
# Create a simple script (process-all.sh):
node scripts/remove-background.js ~/Downloads/signup.png public/illustrations/onboarding/signup.png
node scripts/remove-background.js ~/Downloads/login.png public/illustrations/onboarding/login.png
node scripts/remove-background.js ~/Downloads/grading.png public/illustrations/features/grading.png
node scripts/remove-background.js ~/Downloads/analytics.png public/illustrations/features/analytics.png
node scripts/remove-background.js ~/Downloads/teacher.png public/illustrations/educational/teacher.png
```

**Total: ~1 minute** ⚡

---

## Real-World Usage Example

### Your Signup Page with Utilities:

```jsx
// app/signup/page.js
'use client'

import { illustrationPaths } from '@/lib/illustrationUtils'
import Illustration from '@/components/atoms/Illustration'

export default function SignupPage() {
  return (
    <div className="flex">
      {/* Left: Form */}
      <div className="flex-1">
        {/* Your form here */}
      </div>
      
      {/* Right: Illustration */}
      <div className="flex-1 bg-[#0A3059]">
        <Illustration
          src={illustrationPaths.signup}  // Clean, organized!
          alt="Sign up illustration"
          width={600}
          height={500}
          priority
        />
      </div>
    </div>
  )
}
```

**What `illustrationPaths.signup` does:**
- Returns: `/illustrations/onboarding/signup.svg`
- You don't have to remember the exact path
- If you reorganize folders, update once in utils file

---

## When You DON'T Need These Files

### Simple Project (1-2 illustrations):
```jsx
// Just use direct paths - it's fine!
<Image src="/illustrations/signup.png" />
```

### Manual Background Removal:
- Use Remove.bg website directly
- No need for the script

**These utilities are helpers, not requirements!** Use them when they make your life easier. 😊











