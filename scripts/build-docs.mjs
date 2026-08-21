import fs from 'node:fs'
import path from 'node:path'
import { execSync } from 'node:child_process'

const services = [
  { name: 'user-service', envVar: 'USER_SERVICE_URL', defaultPort: 8081 },
  { name: 'shop-service', envVar: 'SHOP_SERVICE_URL', defaultPort: 8082 },
  { name: 'product-service', envVar: 'PRODUCT_SERVICE_URL', defaultPort: 8083 },
  { name: 'order-service', envVar: 'ORDER_SERVICE_URL', defaultPort: 8084 },
  { name: 'agent-service', envVar: 'AGENT_SERVICE_URL', defaultPort: 8085 },
  // { name: 'agent-orchestrator-service', envVar: 'AGENT_ORCHESTRATOR_SERVICE_URL', defaultPort: 8086 },
]

function addUrl(service) {
  const serviceUrl = process.env[service.envVar] || `http://localhost:${service.defaultPort}/v3/api-docs`
  return { ...service, url: serviceUrl }
}

const tmpDir = path.join(process.cwd(), 'tmp-docs')
const outputHtml = path.join(process.cwd(), 'src', 'gen', 'index.html')

async function buildDocs() {
  try {
    if (fs.existsSync(tmpDir)) fs.rmSync(tmpDir, { recursive: true, force: true })
    fs.mkdirSync(tmpDir, { recursive: true })

    const filePaths = []
    for (const service of services.map(addUrl)) {
      console.log(`Downloading schema for ${service.name}-service...`)
      const res = await fetch(service.url)
      if (!res.ok) throw new Error(`Failed to fetch ${service.name} from ${service.url}`)
      
      const filePath = path.join(tmpDir, `${service.name}.json`)
      fs.writeFileSync(filePath, await res.text())
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
