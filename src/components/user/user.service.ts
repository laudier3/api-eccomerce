import { UserRepository } from "./user.repository";
import bcrypt from "bcryptjs";

export class UserService {
  private repo = new UserRepository();

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const user = await this.repo.findById(id);
    if (!user) throw new Error("Usuário não encontrado");
    return user;
  }

  async create(data: any) {
    const exists = await this.repo.findByEmail(data.email);
    if (exists) throw new Error("E-mail já está em uso");

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return this.repo.create({
      ...data,
      password: hashedPassword,
    });
  }

  async update(id: string, data: any) {
    await this.getById(id);

    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    return this.repo.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);
    return this.repo.delete(id);
  }
}
