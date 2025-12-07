# Button Component Usage Guide

## Import

```javascript
import Button from '@/components/atoms/Button'
```

## Basic Usage

### 1. Button with Link (href prop)

When you provide an `href` prop, the Button automatically renders as a Next.js Link:

```javascript
<Button href="/signup" variant="primary" size="md">
  Get Started
</Button>
```

### 2. Button with onClick (no href)

When you don't provide `href`, it renders as a button element:

```javascript
<Button 
  variant="primary" 
  size="md"
  onClick={() => console.log('Clicked!')}
>
  Click Me
</Button>
```

## Variants

### Primary (Default)
Teal gradient - for main CTAs:
```javascript
<Button variant="primary" href="/signup">
  Start Free Trial
</Button>
```

### Primary Blue
Blue gradient - alternative primary:
```javascript
<Button variant="primary-blue" href="/signup">
  Get Started
</Button>
```

### Secondary
White background with border:
```javascript
<Button variant="secondary" href="/demo">
  Watch Demo
</Button>
```

### Outline
Transparent with colored border:
```javascript
<Button variant="outline" href="/learn-more">
  Learn More
</Button>
```

### Ghost
Text only, no background:
```javascript
<Button variant="ghost" href="/login">
  Login
</Button>
```

### Dark
Navy background:
```javascript
<Button variant="dark" href="/contact">
  Contact Us
</Button>
```

### Light
Light gray background:
```javascript
<Button variant="light" href="/login">
  Login
</Button>
```

## Sizes

```javascript
<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra Large</Button>
```

## Complete Examples

### Example 1: Navbar Login Button
```javascript
<Button
  href="/login"
  variant="ghost"
  size="sm"
>
  Login
</Button>
```

### Example 2: Navbar CTA Button
```javascript
<Button
  href="/signup"
  variant="primary"
  size="sm"
>
  Get Started
</Button>
```

### Example 3: Hero Section CTA
```javascript
<Button
  href="/signup"
  variant="primary"
  size="lg"
>
  Start Free Trial
</Button>
```

### Example 4: Secondary Action
```javascript
<Button
  href="/demo"
  variant="outline"
  size="lg"
>
  Watch Demo
</Button>
```

### Example 5: Full Width Button (Mobile)
```javascript
<Button
  href="/signup"
  variant="primary"
  size="md"
  className="w-full"
>
  Get Started
</Button>
```

### Example 6: Button with Custom Styling
```javascript
<Button
  href="/contact"
  variant="primary"
  size="lg"
  className="bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20"
>
  Contact Sales
</Button>
```

### Example 7: Disabled Button
```javascript
<Button
  variant="primary"
  size="md"
  disabled={true}
  onClick={handleSubmit}
>
  Submit
</Button>
```

### Example 8: Button with Icon
```javascript
<Button
  href="/signup"
  variant="primary"
  size="lg"
>
  <span className="flex items-center gap-2">
    Start Free Trial
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
    </svg>
  </span>
</Button>
```

## Hover Effect

All buttons automatically include the **bunny.net-style skeleton flash effect**:
- Two diagonal flashes sweep from top-left to bottom-right on hover
- No color or opacity changes
- Smooth 500ms animation
- Works automatically - no extra configuration needed!

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | ReactNode | - | Button content |
| `variant` | string | `'primary'` | Button style variant |
| `size` | string | `'md'` | Button size |
| `href` | string | - | If provided, renders as Link |
| `onClick` | function | - | Click handler (when no href) |
| `type` | string | `'button'` | Button type |
| `disabled` | boolean | `false` | Disabled state |
| `className` | string | `''` | Additional CSS classes |

## Notes

- When `href` is provided, the button automatically becomes a Next.js Link
- The skeleton flash effect is built-in and works on all variants
- All buttons have proper focus states for accessibility
- Disabled buttons have reduced opacity and no pointer events
- You can combine `className` with variants for custom styling










