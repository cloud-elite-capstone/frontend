import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const GEN_DIR = new URL('../src/gen', import.meta.url).pathname

function exportsType(source, name) {
  return (
    new RegExp(`export\\s+type\\s+${name}\\b`).test(source) ||
    new RegExp(`export\\s+type\\s+\\{[^}]*\\b${name}\\b[^}]*\\}`).test(source)
  )
}

let patched = 0

for (const service of readdirSync(GEN_DIR)) {
  const mocksDir = join(GEN_DIR, service, 'mocks')
  const typesDir = join(GEN_DIR, service, 'types')
  if (!existsSync(mocksDir) || !existsSync(typesDir)) continue

  const barrelFile = join(typesDir, 'index.ts')
  if (!existsSync(barrelFile)) continue
  const barrelSource = readFileSync(barrelFile, 'utf8')

  for (const file of readdirSync(mocksDir)) {
    if (!file.endsWith('.ts')) continue
    const path = join(mocksDir, file)
    const source = readFileSync(path, 'utf8')

    const match = source.match(
      /import type \{([^}]+)\} from '\.\.\/types\/([A-Za-z0-9_]+)'/
    )
    if (!match) continue

    const names = match[1].split(',').map((s) => s.trim())
    const moduleFile = join(typesDir, `${match[2]}.ts`)
    if (!existsSync(moduleFile)) continue

    const moduleSource = readFileSync(moduleFile, 'utf8')
    const missing = names.filter((n) => !exportsType(moduleSource, n))
    if (missing.length === 0) continue

    if (!missing.every((n) => exportsType(barrelSource, n))) continue

    const next = source.replace(
      `import type {${match[1]}} from '../types/${match[2]}'`,
      `import type {${match[1]}} from '../types'`
    )
    if (next !== source) {
      writeFileSync(path, next)
      patched++
      console.log(`patched ${path}`)
    }
  }
}

console.log(patched ? `patched ${patched} mock file(s)` : 'no mocks needed patching')
