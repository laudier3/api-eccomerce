import { Request, Response } from "express";
import { ProductService } from "./product.service";

const service = new ProductService();

export class ProductController {
  async list(req: Request, res: Response) {
    const products = await service.getAll();
    return res.json(products);
  }

  async show(req: Request, res: Response) {
    try {
      const product = await service.getById(req.params.id);
      return res.json(product);
    } catch (err: any) {
      return res.status(404).json({ msg: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const product = await service.create(req.body);
      return res.status(201).json(product);
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const product = await service.update(req.params.id, req.body);
      return res.json(product);
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await service.delete(req.params.id);
      return res.json({ msg: "Produto removido" });
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }
}
