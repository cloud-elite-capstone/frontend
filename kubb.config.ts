import { defineConfig } from 'kubb/config'
import { pluginTs } from '@kubb/plugin-ts'
import { pluginFetch } from '@kubb/plugin-fetch'
import { pluginReactQuery } from '@kubb/plugin-react-query'
import { pluginZod } from '@kubb/plugin-zod'
import { pluginFaker } from '@kubb/plugin-faker'
// import { pluginRedoc } from '@kubb/plugin-redoc'

const services = [
  'user-service',
  'shop-service',
  'product-service',
  'order-service',
  'agent-service',
  // 'agent-orchestrator-service',
]

export default defineConfig(
  services.map((name) => {
    return {
      name,
      input: `./openapi/${name}.json`,
      output: {
        path: `./src/gen/${name}`,
        clean: true,
      },
      plugins: [
        pluginTs(),
        pluginZod(),
        pluginFetch(),
        pluginReactQuery(),
        pluginFaker()
      ],
    }
  })
)
