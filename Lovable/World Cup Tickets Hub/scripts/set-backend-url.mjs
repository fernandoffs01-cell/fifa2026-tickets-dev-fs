// =====================================================
// set-backend-url.mjs
// Substitui __BACKEND_URL__ no dist/web.config pela env var BACKEND_URL.
// Rodado automaticamente após `npm run build`.
//
// Uso:
//   BACKEND_URL=http://10.20.1.5:3001 npm run build           # VM
//   BACKEND_URL=https://fifa2026-back.azurewebsites.net npm run build  # Web App
//   (sem env)                                                  # mantém localhost:3001
// =====================================================
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const webConfigPath = resolve(__dirname, '..', 'dist', 'web.config');

if (!existsSync(webConfigPath)) {
  console.warn(`[set-backend-url] dist/web.config não encontrado — pulando.`);
  process.exit(0);
}

const placeholder = '__BACKEND_URL__';
const backendUrl = (process.env.BACKEND_URL || 'http://localhost:3001').replace(/\/+$/, '');

const original = readFileSync(webConfigPath, 'utf8');
if (!original.includes(placeholder)) {
  console.warn(`[set-backend-url] Placeholder ${placeholder} não encontrado em web.config — pulando.`);
  process.exit(0);
}

const replaced = original.split(placeholder).join(backendUrl);
writeFileSync(webConfigPath, replaced);

console.log(`[set-backend-url] BACKEND_URL = ${backendUrl}`);
console.log(`[set-backend-url] dist/web.config atualizado.`);
