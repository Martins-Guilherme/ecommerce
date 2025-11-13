import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import pluginReact, { rules } from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    files: ['**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    rules: {
      semi: 'error',
      'prefer-const': 'error',
      'react/jsx-uses-vars': 'error'
    }
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended
])
