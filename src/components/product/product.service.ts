import { ProductRepository } from "./product.repository";

export class ProductService {
  private repo = new ProductRepository();

  async getAll() {
    return this.repo.findAll();
  }

  async getById(id: string) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error("Produto não encontrado");
    return product;
  }

  async create(data: any) {
    return this.repo.create(data);
  }

  async update(id: string, data: any) {
    await this.getById(id);
    return this.repo.update(id, data);
  }

  async delete(id: string) {
    await this.getById(id);
    return this.repo.delete(id);
  }
}
