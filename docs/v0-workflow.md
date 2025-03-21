# v0 to Cursor Integration Workflow

## Quick Start

```bash
# 1. Create new feature branch
git checkout -b v0/feature-name

# 2. Export v0 component to temporary directory
mkdir -p v0-components/components/[feature-name]

# 3. After integration
git add .
git commit -m "feat: integrate [feature-name] component"
```

## Detailed Workflow

### 1. Pre-Integration Setup

```bash
# Create necessary directories if they don't exist
mkdir -p v0-components/{pages,components,types}
```

### 2. v0 Design Phase

1. Design your component in v0
2. Export the code
3. Save to appropriate directory:
   - Pages: `v0-components/pages/`
   - Components: `v0-components/components/`
   - Types: `v0-components/types/`

### 3. Component Adaptation

#### 3.1 Import Structure

Before (v0 export):
```typescript
import { useState } from 'react'
import { Button } from './Button'
```

After (Cursor integration):
```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { useSupabase } from '@/hooks/useSupabase'
import { useAuth } from '@/hooks/useAuth'
```

#### 3.2 Styling Adaptation

Before (v0 export):
```typescript
<div className="bg-gray-100 p-4 rounded">
```

After (matching your Tailwind config):
```typescript
<div className="bg-background p-4 rounded-lg">
```

#### 3.3 State Management Integration

Before (v0 export):
```typescript
const [data, setData] = useState([])
```

After (with Supabase):
```typescript
const { supabase } = useSupabase()
const { user } = useAuth()

useEffect(() => {
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
      .eq('user_id', user.id)
    if (data) setData(data)
  }
  fetchData()
}, [user])
```

### 4. Integration Process

1. **Copy Component**
```bash
# Create component directory in main project
mkdir -p app/components/[feature-name]

# Copy adapted component
cp v0-components/components/[feature-name]/index.tsx app/components/[feature-name]/
```

2. **Update Types**
```typescript
// types/[feature-name].ts
export interface FeatureProps {
  // Add your type definitions
}
```

3. **Add Tests**
```typescript
// __tests__/[feature-name].test.tsx
import { render, screen } from '@testing-library/react'
import YourComponent from '@/components/[feature-name]'

describe('YourComponent', () => {
  it('renders correctly', () => {
    render(<YourComponent />)
    // Add your tests
  })
})
```

### 5. Integration Verification

```bash
# 1. Type check
npm run type-check

# 2. Run tests
npm run test

# 3. Run linter
npm run lint

# 4. Start development server
npm run dev
```

### 6. Common Integration Patterns

#### 6.1 Data Fetching

```typescript
// v0-components/components/DataList.tsx
export function DataList() {
  const { supabase } = useSupabase()
  const { user } = useAuth()

  // Add your data fetching logic
  const fetchData = async () => {
    const { data, error } = await supabase
      .from('your_table')
      .select('*')
      .eq('user_id', user.id)
    return { data, error }
  }

  return (
    // Your component JSX
  )
}
```

#### 6.2 Form Handling

```typescript
// v0-components/components/Form.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from '@/lib/validations'

export function Form() {
  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  const onSubmit = async (data) => {
    // Add your form submission logic
  }

  return (
    // Your form JSX
  )
}
```

### 7. Troubleshooting

#### Style Conflicts
```bash
# Check for conflicting Tailwind classes
grep -r "className=" v0-components/components/[feature-name]
```

#### Missing Dependencies
```bash
# Check for required packages
grep -r "import" v0-components/components/[feature-name]
```

### 8. Post-Integration Cleanup

```bash
# Remove temporary files
rm -rf v0-components/temp/*

# Commit changes
git add .
git commit -m "feat: integrate [feature-name] component"
git push origin v0/feature-name
```

## Best Practices

1. **Component Organization**
   - Keep related components together
   - Use consistent file structure
   - Maintain type definitions

2. **State Management**
   - Use existing hooks and contexts
   - Avoid duplicate state management
   - Maintain data flow patterns

3. **Testing**
   - Write tests for new components
   - Test backend integration
   - Verify mobile responsiveness

4. **Documentation**
   - Update component documentation
   - Document any new props or types
   - Add usage examples

## Integration Checklist

Before merging:
- [ ] Component adapts to theme
- [ ] All types are properly defined
- [ ] Tests are passing
- [ ] Backend integration works
- [ ] Mobile responsive
- [ ] Documentation updated
- [ ] No console errors
- [ ] Performance verified 