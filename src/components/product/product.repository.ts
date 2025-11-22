import { prisma } from "../../prisma/prismaClient";

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany();
  }

  async findById(id: string) {
    return prisma.product.findUnique({ where: { id } });
  }

  async create(data: any) {
    return prisma.product.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.product.update({
      where: { id },
      data
    });
  }

  async delete(id: string) {
    return prisma.product.delete({ where: { id } });
  }
}
