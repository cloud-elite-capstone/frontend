import fs from 'node:fs'
import path from 'node:path'

const services = [
  { name: 'user-service', envVar: 'USER_SERVICE_URL', defaultPort: 8081 },
  { name: 'shop-service', envVar: 'SHOP_SERVICE_URL', defaultPort: 8082 },
  { name: 'product-service', envVar: 'PRODUCT_SERVICE_URL', defaultPort: 8083 },
  { name: 'order-service', envVar: 'ORDER_SERVICE_URL', defaultPort: 8084 },
  { name: 'agent-service', envVar: 'AGENT_SERVICE_URL', defaultPort: 8085 },
  // { name: 'agent-orchestrator-service', envVar: 'AGENT_ORCHESTRATOR_SERVICE_URL', defaultPort: 8086 },
]

function addUrl(service) {
  const baseUrl = process.env[service.envVar] || `http://localhost:${service.defaultPort}`
  return { ...service, url: `${baseUrl}/v3/api-docs` }
}

const specsDir = path.join(process.cwd(), 'openapi')

async function fetchSpecs() {
  fs.mkdirSync(specsDir, { recursive: true })

  for (const service of services.map(addUrl)) {
    console.log(`Downloading schema for ${service.name}...`)
    const res = await fetch(service.url)
    if (!res.ok) throw new Error(`Failed to fetch ${service.name} from ${service.url}`)

    const filePath = path.join(specsDir, `${service.name}.json`)
    fs.writeFileSync(filePath, await res.text())
    console.log(`  saved -> ${path.relative(process.cwd(), filePath)}`)
  }

  console.log('\nSuccess! OpenAPI specs saved to:', specsDir)
}

fetchSpecs().catch((error) => {
  console.error('\nFetch failed:', error.message)
  process.exit(1)
})
