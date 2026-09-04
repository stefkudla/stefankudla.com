import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import prettier from 'eslint-config-prettier/flat'

// eslint-config-next >= 15 ships a flat config directly, so we consume it
// as-is. The previous FlatCompat bridge crashed on ESLint 10 while
// serialising the (circular) plugin object during eslintrc validation.
const eslintConfig = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'coverage/**', 'node_modules/**'],
  },
  ...nextCoreWebVitals,
  prettier,
]

export default eslintConfig
