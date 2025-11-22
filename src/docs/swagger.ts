import swaggerJsdoc from "swagger-jsdoc";
import { version } from "../../package.json";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Ecommerce - Documentação",
      version,
      description: "Documentação oficial da API de Ecommerce (Products + Users)."
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor Local"
      }
    ]
  },
  apis: ["./src/components/**/*.ts"], // lê doc dos controllers e routes
};

export const swaggerSpec = swaggerJsdoc(options);
