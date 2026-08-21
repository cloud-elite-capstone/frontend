import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginRedoc } from '@kubb/plugin-redoc'

interface Service {
  name: string,
  envVar: string,
  defaultPort: number,
}

const services: Service[] = [
  { name: 'user-service', envVar: 'USER_SERVICE_URL', defaultPort: 8081 },
  { name: 'shop-service', envVar: 'SHOP_SERVICE_URL', defaultPort: 8082 },
  { name: 'product-service', envVar: 'PRODUCT_SERVICE_URL', defaultPort: 8083 },
  { name: 'order-service', envVar: 'ORDER_SERVICE_URL', defaultPort: 8084 },
  { name: 'agent-service', envVar: 'AGENT_SERVICE_URL', defaultPort: 8085 },
  // { name: 'agent-orchestrator-service', envVar: 'AGENT_ORCHESTRATOR_SERVICE_URL', defaultPort: 8086 },
]

export default defineConfig(
  services.map(({ name, envVar, defaultPort }) => {
    const baseUrl = process.env[envVar] || `http://localhost:${defaultPort}`

    return {
      name,
      input: `${baseUrl}/v3/api-docs`,
      output: {
        path: `./src/gen/${name}`,
        clean: true,
      },
      plugins: [
        pluginTs(),
        pluginZod(),
        pluginFetch(),
        pluginReactQuery(),
        pluginRedoc(),
      ],
    }
  })
)
