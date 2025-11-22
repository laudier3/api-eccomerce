// src/docs/openapi.ts
import { OpenAPIV3 } from "openapi-types";

export const openApiSpec: OpenAPIV3.Document = {
  openapi: "3.0.0",
  info: {
    title: "API E-commerce - Documentação   ",
    version: "1.0.0",
    description:
      "Documentação completa dos endpoints CRUD para todas as entidades.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  components: {
    schemas: {
      // ----------------------------
      // BASIC TYPES / REUSE
      // ----------------------------
      Id: { type: "string", example: "cjv1abcd1234" },
      DateTime: { type: "string", format: "date-time", example: "2025-11-22T12:00:00Z" },
      DecimalString: { type: "string", example: "99.90", description: "Decimal retornado pelo Prisma como string" },

      // ----------------------------
      // User
      // ----------------------------
      User: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          name: { type: "string", example: "João Silva" },
          email: { type: "string", format: "email", example: "joao@example.com" },
          password: { type: "string", example: "hashed_password", description: "hashed password — não retorna em responses reais" },
          role: { type: "string", enum: ["ADMIN", "CUSTOMER"], example: "CUSTOMER" },
          createdAt: { $ref: "#/components/schemas/DateTime" },
          updatedAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["name", "email", "password"]
      },

      // ----------------------------
      // Address
      // ----------------------------
      Address: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          userId: { $ref: "#/components/schemas/Id" },
          street: { type: "string" },
          number: { type: "string" },
          complement: { type: "string", nullable: true },
          district: { type: "string" },
          city: { type: "string" },
          state: { type: "string" },
          zipCode: { type: "string" },
          isDefault: { type: "boolean", example: false },
          createdAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["userId", "street", "number", "district", "city", "state", "zipCode"]
      },

      // ----------------------------
      // Category
      // ----------------------------
      Category: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          name: { type: "string", example: "Eletrônicos" },
          slug: { type: "string", example: "eletronicos" },
          parentId: { $ref: "#/components/schemas/Id", nullable: true },
          createdAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["name", "slug"]
      },

      // ----------------------------
      // Product
      // ----------------------------
      Product: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          name: { type: "string" },
          slug: { type: "string" },
          description: { type: "string", nullable: true },
          price: { $ref: "#/components/schemas/DecimalString" },
          discount: { $ref: "#/components/schemas/DecimalString", nullable: true },
          sku: { type: "string", nullable: true },
          categoryId: { $ref: "#/components/schemas/Id" },
          createdAt: { $ref: "#/components/schemas/DateTime" },
          updatedAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["name", "slug", "price", "categoryId"]
      },

      // ----------------------------
      // ProductImage
      // ----------------------------
      ProductImage: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
          url: { type: "string", format: "uri", example: "https://cdn.example.com/image.jpg" },
        },
        required: ["productId", "url"]
      },

      // ----------------------------
      // ProductVariation
      // ----------------------------
      ProductVariation: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
          name: { type: "string", example: "Tamanho" },
          value: { type: "string", example: "M" },
          price: { $ref: "#/components/schemas/DecimalString", nullable: true },
          stockQty: { type: "integer", nullable: true },
        },
        required: ["productId", "name", "value"]
      },

      // ----------------------------
      // Stock
      // ----------------------------
      Stock: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
          quantity: { type: "integer", example: 10 },
          updatedAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["productId", "quantity"]
      },

      // ----------------------------
      // Cart, CartItem
      // ----------------------------
      Cart: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          userId: { $ref: "#/components/schemas/Id" },
          updatedAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["userId"]
      },

      CartItem: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          cartId: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
          variationId: { $ref: "#/components/schemas/Id", nullable: true },
          quantity: { type: "integer", example: 1 }
        },
        required: ["cartId", "productId", "quantity"]
      },

      // ----------------------------
      // Order, OrderItem, Payment
      // ----------------------------
      Order: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          userId: { $ref: "#/components/schemas/Id" },
          addressId: { $ref: "#/components/schemas/Id" },
          status: { type: "string", enum: ["PENDING","PAID","SHIPPED","DELIVERED","CANCELED"], example: "PENDING" },
          total: { $ref: "#/components/schemas/DecimalString" },
          createdAt: { $ref: "#/components/schemas/DateTime" },
          updatedAt: { $ref: "#/components/schemas/DateTime" }
        },
        required: ["userId","addressId","total"]
      },

      OrderItem: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          orderId: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
          variationId: { $ref: "#/components/schemas/Id", nullable: true },
          quantity: { type: "integer" },
          price: { $ref: "#/components/schemas/DecimalString" }
        },
        required: ["orderId","productId","quantity","price"]
      },

      Payment: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          orderId: { $ref: "#/components/schemas/Id" },
          method: { type: "string", enum: ["PIX","CREDIT_CARD","BOLETO"], example: "PIX" },
          status: { type: "string", enum: ["PENDING","PAID","FAILED","REFUNDED"], example: "PENDING" },
          transactionId: { type: "string", nullable: true },
          amount: { $ref: "#/components/schemas/DecimalString" },
          createdAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["orderId","method","amount"]
      },

      // ----------------------------
      // Review
      // ----------------------------
      Review: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
          userId: { $ref: "#/components/schemas/Id" },
          rating: { type: "integer", example: 5 },
          comment: { type: "string", nullable: true },
          createdAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["productId","userId","rating"]
      },

      // ----------------------------
      // Log
      // ----------------------------
      Log: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          message: { type: "string" },
          level: { type: "string", enum: ["INFO","WARN","ERROR"] },
          createdAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["message","level"]
      },

      // ----------------------------
      // Wishlist
      // ----------------------------
      Wishlist: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          userId: { $ref: "#/components/schemas/Id" },
          createdAt: { $ref: "#/components/schemas/DateTime" },
        },
        required: ["userId"]
      },

      WishlistItem: {
        type: "object",
        properties: {
          id: { $ref: "#/components/schemas/Id" },
          wishlistId: { $ref: "#/components/schemas/Id" },
          productId: { $ref: "#/components/schemas/Id" },
        },
        required: ["wishlistId","productId"]
      }
    },
    responses: {
      NotFound: {
        description: "Recurso não encontrado",
        content: { "application/json": { schema: { type: "object", properties: { msg: { type: "string" } } } } }
      },
      ValidationError: {
        description: "Erro de validação",
        content: { "application/json": { schema: { type: "object", properties: { msg: { type: "string" } } } } }
      }
    },
    parameters: {
      IdParam: {
        name: "id",
        in: "path",
        required: true,
        schema: { $ref: "#/components/schemas/Id" }
      }
    }
  },

  // ----------------------------
  // Paths - para cada modelo geramos endpoints CRUD padrão
  // ----------------------------
  paths: {
    // USERS
    "/users": {
      get: {
        summary: "Listar usuários",
        tags: ["Users"],
        responses: {
          "200": {
            description: "Lista de usuários",
            content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/User" } } } }
          }
        }
      },
      post: {
        summary: "Criar usuário",
        tags: ["Users"],
        requestBody: {
          required: true,
          content: {
            "application/json": { schema: { $ref: "#/components/schemas/User" } }
          }
        },
        responses: { "201": { description: "Usuário criado" }, "400": { $ref: "#/components/responses/ValidationError" } }
      }
    },
    "/users/{id}": {
      get: {
        summary: "Retornar usuário por id",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: { "200": { description: "Usuário" , content: { "application/json": { schema: { $ref: "#/components/schemas/User" }}}}, "404": { $ref: "#/components/responses/NotFound" } }
      },
      put: {
        summary: "Atualizar usuário",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/User" } } } },
        responses: { "200": { description: "Usuário atualizado" }, "400": { $ref: "#/components/responses/ValidationError" } }
      },
      delete: {
        summary: "Remover usuário",
        tags: ["Users"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: { "200": { description: "Usuário removido" }, "404": { $ref: "#/components/responses/NotFound" } }
      }
    },

    // CATEGORIES
    "/categories": {
      get: {
        summary: "Listar categorias",
        tags: ["Categories"],
        responses: { "200": { description: "Lista categorias", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Category" } } } } } }
      },
      post: {
        summary: "Criar categoria",
        tags: ["Categories"],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
        responses: { "201": { description: "Categoria criada" }, "400": { $ref: "#/components/responses/ValidationError" } }
      }
    },
    "/categories/{id}": {
      get: {
        summary: "Get categoria por id",
        tags: ["Categories"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: { "200": { description: "Categoria", content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } }, "404": { $ref: "#/components/responses/NotFound" } }
      },
      put: {
        summary: "Atualizar categoria",
        tags: ["Categories"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Category" } } } },
        responses: { "200": { description: "Categoria atualizada" }, "400": { $ref: "#/components/responses/ValidationError" } }
      },
      delete: {
        summary: "Remover categoria",
        tags: ["Categories"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: { "200": { description: "Categoria removida" }, "404": { $ref: "#/components/responses/NotFound" } }
      }
    },

    // PRODUCTS
    "/products": {
      get: {
        summary: "Listar produtos",
        tags: ["Products"],
        responses: { "200": { description: "Lista de produtos", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Product" } } } } } }
      },
      post: {
        summary: "Criar produto",
        tags: ["Products"],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
        responses: { "201": { description: "Produto criado" }, "400": { $ref: "#/components/responses/ValidationError" } }
      }
    },
    "/products/{id}": {
      get: {
        summary: "Get produto por id",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: { "200": { description: "Produto", content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } }, "404": { $ref: "#/components/responses/NotFound" } }
      },
      put: {
        summary: "Atualizar produto",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Product" } } } },
        responses: { "200": { description: "Produto atualizado" }, "400": { $ref: "#/components/responses/ValidationError" } }
      },
      delete: {
        summary: "Remover produto",
        tags: ["Products"],
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: { "200": { description: "Produto removido" }, "404": { $ref: "#/components/responses/NotFound" } }
      }
    },

    // ProductImage
    "/product-images": {
      get: { summary: "Listar imagens", tags: ["ProductImage"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/ProductImage" } } } } } } },
      post: { summary: "Criar imagem", tags: ["ProductImage"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProductImage" } } } }, responses: { "201": { description: "Criado" } } }
    },
    "/product-images/{id}": {
      get: { summary: "Get imagem", tags: ["ProductImage"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Imagem", content: { "application/json": { schema: { $ref: "#/components/schemas/ProductImage" } } } } } },
      put: { summary: "Atualizar imagem", tags: ["ProductImage"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProductImage" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover imagem", tags: ["ProductImage"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // ProductVariation
    "/product-variations": {
      get: { summary: "Listar variações", tags: ["ProductVariation"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/ProductVariation" } } } } } } },
      post: { summary: "Criar variação", tags: ["ProductVariation"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProductVariation" } } } }, responses: { "201": { description: "Criado" } } }
    },
    "/product-variations/{id}": {
      get: { summary: "Get variação", tags: ["ProductVariation"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Variação", content: { "application/json": { schema: { $ref: "#/components/schemas/ProductVariation" } } } } } },
      put: { summary: "Atualizar variação", tags: ["ProductVariation"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/ProductVariation" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover variação", tags: ["ProductVariation"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Stock
    "/stocks": {
      get: { summary: "Listar estoques", tags: ["Stock"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Stock" } } } } } } },
      post: { summary: "Criar/ajustar estoque", tags: ["Stock"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Stock" } } } }, responses: { "201": { description: "Criado/Atualizado" } } }
    },
    "/stocks/{id}": {
      get: { summary: "Get estoque", tags: ["Stock"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Estoque", content: { "application/json": { schema: { $ref: "#/components/schemas/Stock" } } } } } },
      put: { summary: "Atualizar estoque", tags: ["Stock"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Stock" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover estoque", tags: ["Stock"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Cart & CartItem
    "/carts": {
      get: { summary: "Listar carrinhos", tags: ["Cart"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Cart" } } } } } } },
      post: { summary: "Criar/obter carrinho (por userId)", tags: ["Cart"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Cart" } } } }, responses: { "201": { description: "Criado/Retornado" } } }
    },
    "/carts/{id}": {
      get: { summary: "Get carrinho", tags: ["Cart"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Carrinho", content: { "application/json": { schema: { $ref: "#/components/schemas/Cart" } } } } } },
      put: { summary: "Atualizar carrinho", tags: ["Cart"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Cart" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover carrinho", tags: ["Cart"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    "/cart-items": {
      get: { summary: "Listar itens do carrinho", tags: ["CartItem"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/CartItem" } } } } } } },
      post: { summary: "Adicionar item ao carrinho", tags: ["CartItem"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CartItem" } } } }, responses: { "201": { description: "Adicionado" } } }
    },
    "/cart-items/{id}": {
      get: { summary: "Get cart item", tags: ["CartItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Item", content: { "application/json": { schema: { $ref: "#/components/schemas/CartItem" } } } } } },
      put: { summary: "Atualizar item", tags: ["CartItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/CartItem" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover item", tags: ["CartItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Orders, OrderItems, Payments
    "/orders": {
      get: { summary: "Listar pedidos", tags: ["Order"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Order" } } } } } } },
      post: { summary: "Criar pedido", tags: ["Order"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, responses: { "201": { description: "Pedido criado" } } }
    },
    "/orders/{id}": {
      get: { summary: "Get pedido", tags: ["Order"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Pedido", content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } } } },
      put: { summary: "Atualizar pedido", tags: ["Order"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Order" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover pedido", tags: ["Order"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    "/order-items": {
      get: { summary: "Listar itens do pedido", tags: ["OrderItem"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/OrderItem" } } } } } } },
      post: { summary: "Criar item do pedido", tags: ["OrderItem"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/OrderItem" } } } }, responses: { "201": { description: "Criado" } } }
    },
    "/order-items/{id}": {
      get: { summary: "Get order item", tags: ["OrderItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Item", content: { "application/json": { schema: { $ref: "#/components/schemas/OrderItem" } } } } } },
      put: { summary: "Atualizar item", tags: ["OrderItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/OrderItem" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover item", tags: ["OrderItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Payment
    "/payments": {
      get: { summary: "Listar pagamentos", tags: ["Payment"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Payment" } } } } } } },
      post: { summary: "Criar pagamento", tags: ["Payment"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } }, responses: { "201": { description: "Pagamento criado" } } }
    },
    "/payments/{id}": {
      get: { summary: "Get pagamento", tags: ["Payment"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Pagamento", content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } } } },
      put: { summary: "Atualizar pagamento", tags: ["Payment"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Payment" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover pagamento", tags: ["Payment"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Review
    "/reviews": {
      get: { summary: "Listar reviews", tags: ["Review"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Review" } } } } } } },
      post: { summary: "Criar review", tags: ["Review"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } }, responses: { "201": { description: "Criado" } } }
    },
    "/reviews/{id}": {
      get: { summary: "Get review", tags: ["Review"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Review", content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } } } },
      put: { summary: "Atualizar review", tags: ["Review"], parameters: [{ $ref: "#/components/parameters/IdParam" }], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Review" } } } }, responses: { "200": { description: "Atualizado" } } },
      delete: { summary: "Remover review", tags: ["Review"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Wishlist & WishlistItem
    "/wishlists": {
      get: { summary: "Listar wishlists", tags: ["Wishlist"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Wishlist" } } } } } } },
      post: { summary: "Criar wishlist", tags: ["Wishlist"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Wishlist" } } } }, responses: { "201": { description: "Criado" } } }
    },
    "/wishlists/{id}": {
      get: { summary: "Get wishlist", tags: ["Wishlist"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Wishlist", content: { "application/json": { schema: { $ref: "#/components/schemas/Wishlist" } } } } } },
      delete: { summary: "Remover wishlist", tags: ["Wishlist"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    "/wishlist-items": {
      get: { summary: "Listar itens da wishlist", tags: ["WishlistItem"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/WishlistItem" } } } } } } },
      post: { summary: "Adicionar item à wishlist", tags: ["WishlistItem"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/WishlistItem" } } } }, responses: { "201": { description: "Adicionado" } } }
    },
    "/wishlist-items/{id}": {
      get: { summary: "Get wishlist item", tags: ["WishlistItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Item", content: { "application/json": { schema: { $ref: "#/components/schemas/WishlistItem" } } } } } },
      delete: { summary: "Remover wishlist item", tags: ["WishlistItem"], parameters: [{ $ref: "#/components/parameters/IdParam" }], responses: { "200": { description: "Removido" } } }
    },

    // Logs
    "/logs": {
      get: { summary: "Listar logs", tags: ["Log"], responses: { "200": { description: "Lista", content: { "application/json": { schema: { type: "array", items: { $ref: "#/components/schemas/Log" } } } } } } },
      post: { summary: "Criar log", tags: ["Log"], requestBody: { required: true, content: { "application/json": { schema: { $ref: "#/components/schemas/Log" } } } }, responses: { "201": { description: "Criado" } } }
    }
  }
};
