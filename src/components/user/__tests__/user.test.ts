import request from "supertest";
import app from "../../../app";
import { prisma } from "../../../prisma/prismaClient";

let userId: string;

describe("User CRUD", () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  it("should create a user", async () => {
    const res = await request(app).post("/users").send({
      name: "User Test",
      email: "user@test.com",
      password: "123456"
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    userId = res.body.id;
  });

  it("should list users", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a user by ID", async () => {
    const res = await request(app).get(`/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  it("should update a user", async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({ name: "Updated User" });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("Updated User");
  });

  it("should delete a user", async () => {
    const res = await request(app).delete(`/users/${userId}`);
    expect(res.status).toBe(200);
  });
});
