#!/bin/bash

# v0 Integration Script
# Usage: ./scripts/v0-integrate.sh [feature-name]

if [ -z "$1" ]; then
    echo "Please provide a feature name"
    echo "Usage: ./scripts/v0-integrate.sh [feature-name]"
    exit 1
fi

FEATURE_NAME=$1

# Create necessary directories
echo "Creating directories..."
mkdir -p v0-components/{pages,components,types}/$FEATURE_NAME
mkdir -p app/components/$FEATURE_NAME

# Create feature branch
echo "Creating feature branch..."
git checkout -b v0/$FEATURE_NAME

# Create component template
echo "Creating component template..."
cat > app/components/$FEATURE_NAME/index.tsx << EOL
import { useState } from 'react'
import { useSupabase } from '@/hooks/useSupabase'
import { useAuth } from '@/hooks/useAuth'

export function ${FEATURE_NAME}() {
  const { supabase } = useSupabase()
  const { user } = useAuth()

  return (
    <div>
      {/* Add your component JSX here */}
    </div>
  )
}
EOL

# Create types template
echo "Creating types template..."
cat > types/$FEATURE_NAME.ts << EOL
export interface ${FEATURE_NAME}Props {
  // Add your type definitions here
}
EOL

# Create test template
echo "Creating test template..."
mkdir -p __tests__/components/$FEATURE_NAME
cat > __tests__/components/$FEATURE_NAME/index.test.tsx << EOL
import { render, screen } from '@testing-library/react'
import { ${FEATURE_NAME} } from '@/components/${FEATURE_NAME}'

describe('${FEATURE_NAME}', () => {
  it('renders correctly', () => {
    render(<${FEATURE_NAME} />)
    // Add your tests here
  })
})
EOL

echo "Setup complete! Next steps:"
echo "1. Design your component in v0"
echo "2. Export the code to v0-components/$FEATURE_NAME/"
echo "3. Adapt the component following the integration guide"
echo "4. Run tests and verify integration"
echo "5. Commit and push changes" 