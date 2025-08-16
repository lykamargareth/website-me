import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  base: '/website-me/',  // must match your repo name, with trailing slash
  plugins: [react()],
})
