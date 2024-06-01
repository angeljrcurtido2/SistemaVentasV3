module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    // Añade más reglas aquí según sea necesario
    '@typescript-eslint/no-explicit-any': 'warn', // Cambia 'error' a 'warn'
    '@typescript-eslint/explicit-module-boundary-types': 'warn', // Cambia 'error' a 'warn'
    '@typescript-eslint/no-unused-vars': 'warn', // Cambia 'error' a 'warn'
    // Puedes deshabilitar temporalmente reglas específicas
    // 'react-hooks/rules-of-hooks': 'off',
    // 'react-hooks/exhaustive-deps': 'off',
  },
};