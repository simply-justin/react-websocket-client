import tseslint from 'typescript-eslint'
import pluginReact from 'eslint-plugin-react'
import pluginJest from 'eslint-plugin-jest'
import prettierEslint from 'eslint-config-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
    { files: ['src**/*.{js,mjs,cjs,ts,jsx,tsx}'] },
    { ignores: ['coverage/', 'dist/'] },
    ...tseslint.configs.recommended,
    pluginReact.configs.flat.recommended,
    pluginJest.configs['flat/recommended'],
    prettierEslint,
]
