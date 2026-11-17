import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/sibusiso-3d-portfolio/' : '/',
  plugins: [react(), tailwindcss()],
})
