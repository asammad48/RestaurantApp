#!/usr/bin/env node
// Simple dev server that starts Vite for the client directory
import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Change to client directory and run vite
const clientDir = path.resolve(__dirname, '../client')
console.log('Starting Vite dev server in:', clientDir)

const viteProcess = spawn('npx', ['vite', '--port', '5000', '--host', '0.0.0.0'], {
  cwd: clientDir,
  stdio: 'inherit',
  shell: true
})

viteProcess.on('close', (code) => {
  console.log(`Vite process exited with code ${code}`)
  process.exit(code || 0)
})