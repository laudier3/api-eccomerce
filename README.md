# 📦🚀 E-commerce API — Backend Completo, Escalável e Profissional

Esta é uma **API completa para e-commerce**, desenvolvida com foco em **escalabilidade**, **segurança**, **organização** e **performance**.  
O projeto segue padrões profissionais utilizados em aplicações reais, com arquitetura modular, documentação completa, testes automatizados e integração com banco de dados **PostgreSQL** através do **Prisma ORM**.

A API provê todos os recursos necessários para operar uma loja virtual moderna, incluindo:

- 👤 **Gerenciamento de usuários**  
- 🛍️ **Sistema de produtos e categorias**  
- 🛒 **Carrinho de compras**  
- 📦 **Pedidos**  
- 💳 **Pagamentos**  
- ⭐ **Avaliações**  
- ❤️ **Wishlist**  
- 📊 **Estoque**  
- 📝 **Logs internos**

---

## ⚙️ Como a API Funciona

A API foi construída com uma **arquitetura limpa**, dividida em camadas. Cada camada possui responsabilidade clara para facilitar manutenção e testes.

### 🔁 Fluxo da Requisição

```
HTTP Request → Controller → Service → Repository → Prisma → PostgreSQL → JSON Response
```

- **Controller:** recebe a requisição, valida dados básicos e envia para o Service.  
- **Service:** contém regras de negócio e orquestra chamadas aos repositories.  
- **Repository:** encapsula operações de banco (Prisma).  
- **Prisma:** ORM responsável pela comunicação com o PostgreSQL.

---

## 🛠️ Tecnologias Utilizadas

- Node.js + Express  
- TypeScript  
- Prisma ORM  
- PostgreSQL  
- Jest + Supertest (testes)  
- Swagger (OpenAPI 3.0)  

---

## 📘 Documentação Swagger

A documentação completa está disponível em:

```
http://localhost:3000/api-docs
```

A interface permite testar endpoints, ver schemas e exemplos.

---

## 🧪 Testes Automatizados

Para executar os testes:

```bash
npm run test
```

---

## ▶️ Como Rodar o Projeto

1. **Instalar dependências**

```bash
npm install
```

2. **Configurar `.env`**

Crie um arquivo `.env` na raiz com as variáveis:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/ecommerce"
PORT=3000
```

3. **Gerar Prisma Client**

```bash
npx prisma generate
```

4. **Executar migrações**

```bash
npx prisma migrate dev
```

5. **Iniciar o servidor**

```bash
npm run dev
```

Abra: `http://localhost:3000`

---

## 📂 Estrutura do Projeto

```
src/
  components/
    user/
    product/
    cart/
    order/
    payment/
    review/
    wishlist/
  prisma/
    schema.prisma
    prismaClient.ts
  docs/
    swagger.ts
app.ts
server.ts
```

---

## 🚩 Endpoints Principais

### 👤 Usuários
- `POST /users`  
- `GET /users/:id`  
- `PUT /users/:id`  
- `DELETE /users/:id`

### 🛍️ Produtos
- `POST /products`  
- `GET /products`  
- `GET /products/:id`  
- `PUT /products/:id`  
- `DELETE /products/:id`

### 🛒 Carrinho
- `GET /cart/:userId`  
- `POST /cart/add`  
- `POST /cart/remove`

### 🧾 Pedidos
- `POST /orders`  
- `GET /orders/:id`

### 💳 Pagamentos
- `POST /payments/confirm`

---

## 📄 Licença

Este projeto está sob a licença **MIT**.

---

Se este projeto foi útil, deixe uma ⭐ no repositório!  
Se quiser, posso adicionar badges, screenshots, ou transformar este README em versão em inglês.
