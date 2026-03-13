import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  // 对应你CloudBase的应用路径 /vstone004
  base: '/vstone004/',
  // 修复plugins数组的语法，确保括号完整闭合
  plugins: [react(), tailwindcss()],
})
