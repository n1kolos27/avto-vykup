#!/usr/bin/env node
/**
 * Кросс-платформенный скрипт для освобождения портов 3000 и 3001
 * Работает на Windows, Linux и macOS
 */

import { execSync } from 'child_process';
import { platform } from 'os';

const ports = [3000, 3001];
let stoppedCount = 0;

console.log('Checking ports 3000 and 3001...\n');

for (const port of ports) {
  try {
    let command;
    let processIds = [];

    if (platform() === 'win32') {
      // Windows: используем netstat и taskkill
      try {
        const netstatOutput = execSync(
          `netstat -ano | findstr :${port}`,
          { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
        );
        
        const lines = netstatOutput.split('\n').filter(line => line.trim());
        const pids = new Set();
        
        for (const line of lines) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && /^\d+$/.test(pid)) {
            pids.add(pid);
          }
        }
        
        processIds = Array.from(pids);
      } catch (error) {
        // Порт свободен, если netstat ничего не нашел
        console.log(`  Port ${port} is free`);
        continue;
      }

      if (processIds.length > 0) {
        for (const pid of processIds) {
          try {
            execSync(`taskkill /F /PID ${pid}`, { stdio: 'ignore' });
            console.log(`  Stopped process ${pid} (port ${port})`);
            stoppedCount++;
          } catch (error) {
            // Процесс уже завершен, игнорируем
          }
        }
      } else {
        console.log(`  Port ${port} is free`);
      }
    } else {
      // Linux/macOS: используем lsof
      try {
        const lsofOutput = execSync(
          `lsof -ti:${port}`,
          { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'ignore'] }
        );
        
        processIds = lsofOutput.trim().split('\n').filter(Boolean);
      } catch (error) {
        // Порт свободен, если lsof ничего не нашел
        console.log(`  Port ${port} is free`);
        continue;
      }

      if (processIds.length > 0) {
        for (const pid of processIds) {
          try {
            execSync(`kill -9 ${pid}`, { stdio: 'ignore' });
            console.log(`  Stopped process ${pid} (port ${port})`);
            stoppedCount++;
          } catch (error) {
            // Процесс уже завершен, игнорируем
          }
        }
      } else {
        console.log(`  Port ${port} is free`);
      }
    }
  } catch (error) {
    console.log(`  Port ${port} is free`);
  }
}

console.log('');
if (stoppedCount > 0) {
  console.log(`Freed ports: ${stoppedCount} process(es)`);
} else {
  console.log('All ports are free');
}
console.log('');

