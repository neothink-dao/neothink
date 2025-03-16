# Pathway Components Documentation

## Overview

Each pathway in Neothink+ (Ascender, Neothinker, Immortal) has its own distinct visual identity while maintaining cohesion with the overall brand. This document outlines the components and patterns specific to pathway-related features.

## Pathway Cards

### Basic Structure
```typescript
interface PathwayProps {
  type: 'ascender' | 'neothinker' | 'immortal'
  title: string
  subtitle: string
  description: string
  features: string[]
  benefits: string[]
}
```

### Icon & Color Mapping

```typescript
const PATHWAY_CONFIG = {
  ascender: {
    icon: Rocket,
    color: 'orange',
    gradient: {
      light: 'from-orange-500 to-orange-600',
      dark: 'dark:from-orange-400 dark:to-orange-500'
    }
  },
  neothinker: {
    icon: Brain,
    color: 'amber',
    gradient: {
      light: 'from-amber-500 to-amber-600',
      dark: 'dark:from-amber-400 dark:to-amber-500'
    }
  },
  immortal: {
    icon: Zap,
    color: 'red',
    gradient: {
      light: 'from-red-500 to-red-600',
      dark: 'dark:from-red-400 dark:to-red-500'
    }
  }
}
```

## Component Examples

### Pathway Selection Card
```typescript
<div className={cn(
  "pathway-card group relative rounded-2xl border p-8",
  pathway === 'ascender' && 'hover:border-orange-900/50',
  pathway === 'neothinker' && 'hover:border-amber-900/50',
  pathway === 'immortal' && 'hover:border-red-900/50'
)}>
  <div className="flex items-center gap-4">
    <div className={cn(
      "flex h-12 w-12 items-center justify-center rounded-xl",
      pathway === 'ascender' && 'bg-orange-900/30',
      pathway === 'neothinker' && 'bg-amber-900/30',
      pathway === 'immortal' && 'bg-red-900/30'
    )}>
      {PATHWAY_CONFIG[pathway].icon}
    </div>
    <div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-zinc-400">{subtitle}</p>
    </div>
  </div>
</div>
```

### Pathway Progress Indicator
```typescript
<div className="pathway-progress">
  <div className={cn(
    "h-2 rounded-full",
    pathway === 'ascender' && 'bg-orange-500',
    pathway === 'neothinker' && 'bg-amber-500',
    pathway === 'immortal' && 'bg-red-500'
  )} style={{ width: `${progress}%` }} />
</div>
```

## Dashboard Integration

### Pathway-Specific Sections
```typescript
const PathwaySection = ({ pathway }: { pathway: PathwayType }) => {
  const config = PATHWAY_CONFIG[pathway]
  const Icon = config.icon

  return (
    <section className={cn(
      "rounded-lg border p-6",
      pathway === 'ascender' && 'border-orange-900/20',
      pathway === 'neothinker' && 'border-amber-900/20',
      pathway === 'immortal' && 'border-red-900/20'
    )}>
      <div className="flex items-center gap-3">
        <Icon className={cn(
          "h-6 w-6",
          pathway === 'ascender' && 'text-orange-500',
          pathway === 'neothinker' && 'text-amber-500',
          pathway === 'immortal' && 'text-red-500'
        )} />
        <h2 className="text-xl font-semibold">{pathway} Dashboard</h2>
      </div>
    </section>
  )
}
```

## Best Practices

1. **Consistent Icon Usage**
   - Always use the designated icon for each pathway
   - Maintain consistent icon sizes within similar contexts
   - Apply appropriate color schemes based on pathway

2. **Color Application**
   - Use pathway-specific colors for accents and highlights
   - Apply gradients consistently within pathway sections
   - Ensure sufficient contrast in both light and dark modes

3. **Component Structure**
   - Keep pathway-specific logic contained in dedicated components
   - Use TypeScript interfaces to ensure proper pathway typing
   - Implement consistent spacing and layout patterns

4. **Accessibility**
   - Include proper ARIA labels for pathway icons
   - Maintain color contrast ratios for text and backgrounds
   - Provide clear visual indicators for interactive elements

## Common Patterns

### Pathway Navigation
```typescript
const PathwayNav = ({ activePath }: { activePath: PathwayType }) => {
  return (
    <nav className="flex space-x-4">
      {Object.entries(PATHWAY_CONFIG).map(([path, config]) => {
        const Icon = config.icon
        return (
          <Link
            key={path}
            href={`/dashboard/${path}`}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg",
              activePath === path ? `bg-${config.color}-500/10 text-${config.color}-500` : 'text-zinc-400'
            )}
          >
            <Icon className="h-5 w-5" />
            <span>{path}</span>
          </Link>
        )
      })}
    </nav>
  )
}
```

### Pathway Progress Tracking
```typescript
const PathwayProgress = ({ pathway, progress }: { pathway: PathwayType; progress: number }) => {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>{pathway} Progress</span>
        <span>{progress}%</span>
      </div>
      <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800">
        <div
          className={cn(
            "h-full rounded-full transition-all",
            pathway === 'ascender' && 'bg-orange-500',
            pathway === 'neothinker' && 'bg-amber-500',
            pathway === 'immortal' && 'bg-red-500'
          )}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}
```

## Maintenance

When updating pathway-related components:

1. Ensure changes maintain visual consistency
2. Update documentation with new patterns
3. Test in both light and dark modes
4. Verify accessibility compliance
5. Update TypeScript types as needed 