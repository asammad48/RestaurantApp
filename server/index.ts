#!/usr/bin/env node
// Frontend-only server for .NET API integration
import { spawn } from 'child_process';
import { resolve } from 'path';

console.log('🚀 Starting Restaurant Ordering System (Frontend-only)');
console.log('📝 Backend removed - Ready for .NET API integration');
console.log('⚡ Starting Vite development server...');

const viteProcess = spawn('npx', ['vite', '--host', '0.0.0.0', '--port', '5000'], {
  cwd: resolve(process.cwd(), 'client'),
  stdio: 'inherit'
});

viteProcess.on('error', (error) => {
  console.error('❌ Failed to start Vite server:', error);
});

viteProcess.on('close', (code) => {
  console.log(`Vite server process exited with code ${code}`);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('Shutting down server...');
  viteProcess.kill();
});

process.on('SIGINT', () => {
  console.log('Shutting down server...');
  viteProcess.kill();
});