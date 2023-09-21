import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ command}) => ({
  base: command === 'serve'
    ? ''
    : '/chuck-jokes-react/',
  plugins: [react()],
}))
