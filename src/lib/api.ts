import { client as userClient } from "@/gen/user-service/.kubb/client";
import { client as shopClient } from "@/gen/shop-service/.kubb/client";
import { client as productClient } from "@/gen/product-service/.kubb/client";
import { client as orderClient } from "@/gen/order-service/.kubb/client";
import { client as agentOrchestratorClient } from "@/gen/agent-orchestrator-service/.kubb/client";

userClient.setConfig({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL ?? "http://localhost:8081",
});

shopClient.setConfig({
  baseURL: process.env.NEXT_PUBLIC_SHOP_SERVICE_URL ?? "http://localhost:8082",
});

productClient.setConfig({
  baseURL: process.env.NEXT_PUBLIC_PRODUCT_SERVICE_URL ?? "http://localhost:8083",
});

orderClient.setConfig({
  baseURL: process.env.NEXT_PUBLIC_ORDER_SERVICE_URL ?? "http://localhost:8084",
});

agentOrchestratorClient.setConfig({
  baseURL:
    process.env.NEXT_PUBLIC_AGENT_ORCHESTRATOR_SERVICE_URL ??
    "http://localhost:8086",
});
