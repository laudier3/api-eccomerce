import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prisma/prismaClient";

let productId: string;
let categoryId: string;

describe("Product CRUD", () => {
  beforeAll(async () => {
    // limpa antes dos testes
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();

    // cria uma categoria válida obrigatória
    const category = await prisma.category.create({
      data: {
        name: "Categoria Teste",
        slug: "categoria-teste"
      }
    });

    categoryId = category.id;
  });

  it("should create a product", async () => {
    const res = await request(app).post("/products").send({
      name: "Produto Teste",
      slug: "produto-teste",
      price: 99.9,
      categoryId // ← obrigatório no schema
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    productId = res.body.id;
  });

  it("should list products", async () => {
    const res = await request(app).get("/products");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a single product", async () => {
    const res = await request(app).get(`/products/${productId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(productId);
  });

  it("should update a product", async () => {
    const res = await request(app)
      .put(`/products/${productId}`)
      .send({ price: 79.9 });

    expect(res.status).toBe(200);
    expect(res.body.price).toBe("79.9"); // Decimal retorna string no Prisma
  });

  it("should delete a product", async () => {
    const res = await request(app).delete(`/products/${productId}`);
    expect(res.status).toBe(200);
  });
});
