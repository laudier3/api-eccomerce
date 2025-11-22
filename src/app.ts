import express from "express";
import productRoutes from "./components/product/product.routes";
import userRoutes from "./components/user/user.routes";
import swaggerUi from "swagger-ui-express";
import { openApiSpec } from "./docs/openapi";
//import { swaggerSpec } from "./docs/swagger"

const app = express();
app.use(express.json());

app.use("/users", userRoutes);
app.use("/products", productRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(openApiSpec));

export default app;
