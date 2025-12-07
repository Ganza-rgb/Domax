# Domax Illustration Ecosystem Plan

## Overview
A comprehensive illustration system focused on education, paper correction, grading, and feedback workflows. All illustrations should be SVG-based, themeable via CSS variables, and optimized for web performance.

## Brand Colors (from favicon.svg)
- **Primary Blue**: `#005ffe` - Main brand color, used for primary actions and key elements
- **Teal/Green**: `#00cd90` - Success, checkmarks, positive feedback
- **Navy**: `#0A3059` - Headings, text (kept for readability)

## Illustration Categories

### 1. Core Workflow Illustrations (Priority: High)

#### Paper Correction Flow
- **Paper Upload**: Teacher/student uploading paper to platform
  - Style: Clean, modern, friendly
  - Elements: Paper/document icon, upload arrow, cloud storage
  - Colors: Blue primary, teal accents
  
- **Automated Grading**: AI/ML processing paper
  - Style: Abstract, tech-forward but approachable
  - Elements: Paper with checkmarks appearing, sparkles/particles
  - Colors: Blue gradient, teal highlights
  
- **Annotation Process**: Teacher adding comments/highlights
  - Style: Detailed, showing interaction
  - Elements: Paper with highlighted text, comment bubbles, pen/cursor
  - Colors: Blue for highlights, teal for checkmarks
  
- **Feedback Delivery**: Student receiving graded paper
  - Style: Positive, encouraging
  - Elements: Student viewing feedback, progress indicators, celebration elements
  - Colors: Teal success colors, blue accents

#### Rubric System
- **Rubric Creation**: Teacher building rubric
  - Elements: Checklist, criteria boxes, scoring scale
  - Colors: Blue for structure, teal for completed items
  
- **Rubric Application**: Applying rubric to submission
  - Elements: Rubric overlay on paper, scoring interface
  - Colors: Blue/teal gradient

### 2. Feature Illustrations (Priority: High)

#### Grading Automation
- Illustration: Abstract representation of automation
- Elements: Papers flowing through system, checkmarks appearing automatically
- Style: Clean, modern, tech-forward
- Size: Hero size (600x400px), card size (400x300px)

#### In-Document Annotations
- Illustration: Paper with inline comments and highlights
- Elements: Document with colored highlights, comment threads, suggestion markers
- Style: Detailed but clean
- Size: Feature section (500x400px)

#### Analytics Dashboard
- Illustration: Charts and graphs with educational metrics
- Elements: Performance charts, trend lines, class overview
- Style: Data visualization aesthetic
- Size: Dashboard preview (600x400px)

#### Plagiarism Detection
- Illustration: Document scanning with match indicators
- Elements: Paper with highlighted matches, source links, originality score
- Style: Security-focused but friendly
- Size: Feature card (400x300px)

### 3. User Personas (Priority: Medium)

#### Teacher/Professor
- Multiple variations: Different ages, genders, ethnicities
- Scenarios: Grading at desk, reviewing on tablet, presenting to class
- Style: Professional but approachable
- Size: Avatar (200x200px), full body (400x600px)

#### Student
- Multiple variations: Diverse representation
- Scenarios: Submitting work, viewing feedback, celebrating improvement
- Style: Energetic, positive
- Size: Avatar (200x200px), full body (400x600px)

#### Administrator
- Scenarios: Managing school settings, viewing reports, configuring integrations
- Style: Professional, authoritative
- Size: Avatar (200x200px)

### 4. Educational Context Illustrations (Priority: High)

#### Classroom Scenarios
- Teacher grading papers at desk
- Students submitting assignments
- Class performance overview
- Group collaboration on feedback

#### Paper/Assignment Types
- Essay papers
- Research papers
- Lab reports
- Creative writing
- Multiple choice (with annotations)

#### Grading Tools
- Highlighters (different colors for different feedback types)
- Comment bubbles
- Rubric checklists
- Score calculators
- Version comparison

### 5. Empty States & Onboarding (Priority: Medium)

#### Empty States
- No submissions yet
- No courses created
- No rubrics available
- No feedback received (student view)

#### Onboarding Steps
- Welcome illustration
- First assignment creation
- First rubric setup
- First submission graded

### 6. Success & Celebration (Priority: Medium)

#### Achievement Illustrations
- Grading milestone reached
- Time saved indicator
- Improvement trends
- Class performance boost

#### Celebration Elements
- Checkmarks (animated)
- Confetti/particles
- Progress bars
- Success badges

## Technical Specifications

### Format
- **Primary**: SVG (scalable, themeable)
- **Fallback**: WebP/AVIF for complex illustrations
- **Animation**: Lottie JSON for micro-interactions (<150KB)

### Sizing
- **Hero**: 1200x800px (export at 2x for retina)
- **Feature**: 800x600px
- **Card**: 600x400px
- **Icon**: 200x200px
- **Avatar**: 200x200px

### Theming
All SVGs should use CSS variables for colors:
```css
.fill-primary { fill: var(--brand-primary-blue); }
.fill-teal { fill: var(--brand-teal); }
.fill-navy { fill: var(--brand-navy); }
```

### Performance
- Optimize SVGs (SVGO)
- Remove unnecessary paths
- Use `<use>` for repeated elements
- Lazy load below-fold illustrations
- Use `loading="lazy"` for images

## Implementation Priority

### Phase 1 (MVP - Weeks 1-4)
1. ✅ Core workflow: Paper upload, grading, feedback delivery
2. ✅ Feature illustrations: Automation, annotations, analytics
3. ✅ Empty states for main views
4. ✅ Basic user personas (teacher, student)

### Phase 2 (Weeks 5-8)
1. Rubric system illustrations
2. Plagiarism detection visuals
3. Classroom scenarios
4. Success/celebration elements

### Phase 3 (Weeks 9-12)
1. Advanced analytics visualizations
2. Integration illustrations (LMS, Google Drive)
3. Onboarding flow illustrations
4. Achievement/celebration system

## Illustration Style Guide

### Visual Style
- **Clean & Modern**: Minimal, uncluttered
- **Friendly & Approachable**: Not intimidating, welcoming
- **Professional**: Trustworthy, credible
- **Educational Focus**: Clear connection to teaching/learning

### Color Usage
- **Primary Blue (#005ffe)**: Main actions, primary elements, CTAs
- **Teal (#00cd90)**: Success states, checkmarks, positive feedback
- **Navy (#0A3059)**: Text, headings, structural elements
- **Neutrals**: Gray scale for backgrounds, secondary elements

### Character Design
- Diverse representation (age, gender, ethnicity, ability)
- Professional but approachable
- Consistent style across all illustrations
- Expressive but not cartoonish

### Composition
- Generous white space
- Clear focal points
- Balanced layouts
- Responsive-friendly (work at multiple sizes)

## File Organization

```
public/
  illustrations/
    workflows/
      paper-upload.svg
      automated-grading.svg
      annotation-process.svg
      feedback-delivery.svg
    features/
      grading-automation.svg
      in-document-annotations.svg
      analytics-dashboard.svg
      plagiarism-detection.svg
    personas/
      teacher/
        teacher-grading.svg
        teacher-reviewing.svg
      student/
        student-submitting.svg
        student-viewing-feedback.svg
    educational/
      classroom-scenarios/
      paper-types/
      grading-tools/
    empty-states/
      no-submissions.svg
      no-courses.svg
    onboarding/
      welcome.svg
      first-assignment.svg
    celebrations/
      success-checkmark.svg
      milestone-achieved.svg
```

## Animation Guidelines

### Micro-interactions
- Hover effects: Subtle scale, glow, or color shift
- Loading states: Gentle pulse or fade
- Success states: Checkmark animation, particle effects

### Complex Animations
- Use Lottie for:
  - Paper upload flow
  - Grading process visualization
  - Progress indicators
  - Celebration sequences

### Performance
- Keep animations <150KB
- Use CSS transforms (GPU-accelerated)
- Respect `prefers-reduced-motion`
- Optimize frame rates (60fps target)

## Accessibility

- All illustrations have descriptive alt text
- Decorative illustrations marked as `aria-hidden="true"`
- Color contrast meets WCAG AA (4.5:1)
- Text alternatives for complex illustrations
- Focus states for interactive illustrations

## Next Steps

1. **Design Phase**: Create initial sketches/mockups for priority illustrations
2. **Asset Creation**: Generate SVG files following specifications
3. **Integration**: Add illustrations to components and pages
4. **Testing**: Verify performance, accessibility, responsiveness
5. **Iteration**: Refine based on user feedback










