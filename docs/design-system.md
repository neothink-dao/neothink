# Neothink+ Design System

## Brand Identity

Neothink+ is built on three core pathways, each with its distinct visual identity while maintaining a cohesive brand experience.

### Brand Icons

| Pathway    | Icon     | Usage                                    | Color Scheme                |
|------------|----------|------------------------------------------|----------------------------|
| Neothink+  | Sparkles | Main brand, used in headers and logos    | Amber → Orange → Red gradient |
| Ascender   | Rocket   | Wealth creation and upward mobility      | Orange-based palette       |
| Neothinker | Brain    | Knowledge and intellectual development   | Amber-based palette        |
| Immortal   | Zap      | Innovation and transformative power      | Red-based palette          |

### Color System

#### Brand Colors
- **Neothink+ Primary**: Gradient from amber-500 through orange-500 to red-500
- **Dark Mode**: Gradient from amber-400 through orange-400 to red-400

#### Pathway-Specific Colors

**Ascender (Orange)**
```css
--ascender-50: #fff7ed
--ascender-500: #f97316
--ascender-900: #7c2d12
```

**Neothinker (Amber)**
```css
--neothinker-50: #fffbeb
--neothinker-500: #f59e0b
--neothinker-900: #78350f
```

**Immortal (Red)**
```css
--immortal-50: #fef2f2
--immortal-500: #ef4444
--immortal-900: #7f1d1d
```

### Component Guidelines

#### Icons
```typescript
import { Rocket, Brain, Zap, Sparkles } from 'lucide-react'

// Main brand
<Sparkles className="text-gradient-primary" />

// Pathway-specific
<Rocket className="text-ascender-500" />    // For Ascender content
<Brain className="text-neothinker-500" />   // For Neothinker content
<Zap className="text-immortal-500" />       // For Immortal content
```

#### Gradient Usage
```typescript
// Primary gradient (light mode)
"bg-gradient-to-r from-amber-500 via-orange-500 to-red-500"

// Primary gradient (dark mode)
"dark:from-amber-400 dark:via-orange-400 dark:to-red-400"

// Text gradient
"bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 bg-clip-text text-transparent"
```

#### Button Variants

```typescript
// Primary Brand Button
<button className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 hover:from-amber-600 hover:via-orange-600 hover:to-red-600">

// Ascender Button
<button className="bg-ascender-500 hover:bg-ascender-600">

// Neothinker Button
<button className="bg-neothinker-500 hover:bg-neothinker-600">

// Immortal Button
<button className="bg-immortal-500 hover:bg-immortal-600">
```

### Usage Guidelines

1. **Brand Hierarchy**
   - Use Sparkles icon for main Neothink+ branding
   - Use pathway-specific icons within their respective sections
   - Maintain consistent icon sizing (default: h-6 w-6)

2. **Color Application**
   - Use gradient for primary brand elements
   - Use solid colors for pathway-specific elements
   - Ensure proper dark mode support for all colors

3. **Component Consistency**
   - Maintain consistent spacing between icon and text (gap-2)
   - Use appropriate color variants based on context
   - Follow accessibility guidelines for color contrast

4. **Responsive Design**
   - Icons should scale appropriately on mobile devices
   - Maintain legibility of gradients at all screen sizes
   - Ensure touch targets are at least 44px for mobile

### Implementation Examples

```typescript
// Header Logo
<Link href="/" className="flex items-center gap-2">
  <Sparkles className="h-6 w-6 text-gradient-primary" />
  <span className="text-gradient-primary font-bold">Neothink+</span>
</Link>

// Pathway Card
<div className="pathway-card">
  <div className="icon-container">
    {pathway === 'ascender' && <Rocket className="text-ascender-500" />}
    {pathway === 'neothinker' && <Brain className="text-neothinker-500" />}
    {pathway === 'immortal' && <Zap className="text-immortal-500" />}
  </div>
  // ... rest of card content
</div>
```

## Best Practices

1. Always import icons from 'lucide-react'
2. Use appropriate color classes based on context
3. Maintain consistent sizing and spacing
4. Support both light and dark modes
5. Follow accessibility guidelines
6. Use semantic HTML elements
7. Implement proper aria labels for icons

## Updates and Maintenance

This design system is maintained in the following files:
- `lib/styles/design-system.ts` - Core design tokens
- `components/ui/*` - Reusable UI components
- `docs/design-system.md` - Documentation (this file)

When making updates:
1. Update the design tokens in design-system.ts
2. Update component implementations
3. Update this documentation
4. Create examples for new patterns 