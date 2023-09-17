import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  const config = {
    plugins: [react()],
    base: "/"
  };

  if (command == "build") {
    config.base = "/web-development-snack-bar/"
  }

  return config
});
