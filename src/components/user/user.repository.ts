import { prisma } from "../../prisma/prismaClient";

export class UserRepository {
  async findAll() {
    return prisma.user.findMany({
      include: {
        addresses: true,
        orders: true,
        cart: true,
        reviews: true,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        addresses: true,
        orders: true,
        cart: true,
        reviews: true,
      },
    });
  }

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  }

  async create(data: any) {
    return prisma.user.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.user.delete({ where: { id } });
  }
}
