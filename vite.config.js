import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync } from 'node:fs'

// Custom plugin to handle ?raw imports for .md, .html, .gitignore, .txt, .webmanifest
// The @base44/vite-plugin intercepts these file types before Vite's built-in ?raw handler,
// so we need to handle them ourselves.
function rawAssetPlugin() {
  return {
    name: 'raw-asset-fallback',
    enforce: 'pre',
    load(id) {
      if (!id.includes('?raw')) return null;
      const filePath = id.replace(/\?raw.*$/, '');
      if (
        /\.(md|html|txt|webmanifest)$/.test(filePath) ||
        filePath.endsWith('.gitignore')
      ) {
        try {
          const content = readFileSync(filePath, 'utf-8');
          return `export default ${JSON.stringify(content)};`;
        } catch (e) {
          return null;
        }
      }
      return null;
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // Suppress warnings, only show errors
  assetsInclude: ['**/*.md', '**/*.html', '**/.gitignore', '**/*.txt', '**/*.webmanifest'],
  plugins: [
    rawAssetPlugin(),
    base44({
      // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
      // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
      legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
      hmrNotifier: true,
      navigationNotifier: true,
      visualEditAgent: true
    }),
    react(),
  ]
});