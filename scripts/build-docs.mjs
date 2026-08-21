import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const services = [
  'user-service',
  'shop-service',
  'product-service',
  'order-service',
  'agent-service',
  // 'agent-orchestrator-service',
]

const specsDir = path.join(process.cwd(), 'openapi')
const tmpDir = path.join(process.cwd(), 'tmp-docs')
const outputHtml = path.join(process.cwd(), 'src', 'gen', 'index.html')

async function buildDocs() {
  try {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true })
    fs.mkdirSync(tmpDir, { recursive: true })

    const filePaths = []
    for (const name of services) {
      const filePath = path.join(specsDir, `${name}.json`)
      if (!fs.existsSync(filePath)) {
        throw new Error(`Missing OpenAPI spec for ${name}: ${path.relative(process.cwd(), filePath)}. Run "npm run gen:specs" first.`)
      }
      filePaths.push(`"${filePath}"`)
    }

    const combinedJson = path.join(tmpDir, 'combined-openapi.json')
    console.log('Merging OpenAPI schemas via Redocly CLI...')

    execSync(`npx @redocly/cli join ${filePaths.join(' ')} --prefix-components-with-info-prop title -o "${combinedJson}"`, { stdio: 'inherit' })

    console.log('Building consolidated HTML documentation page...')
    fs.mkdirSync(path.dirname(outputHtml), { recursive: true })
    execSync(`npx @redocly/cli build-docs "${combinedJson}" -o "${outputHtml}"`, { stdio: 'inherit' })

    console.log('\nSuccess! Consolidated API Documentation built at:', outputHtml)
  } catch (error) {
    console.error('\nBuild failed:', error.message)
    process.exit(1)
  } finally {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true })
  }
}

buildDocs()
