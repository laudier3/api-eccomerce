import { Request, Response } from "express";
import { UserService } from "./user.service";

const service = new UserService();

export class UserController {
  async list(req: Request, res: Response) {
    return res.json(await service.getAll());
  }

  async show(req: Request, res: Response) {
    try {
      const user = await service.getById(req.params.id);
      return res.json(user);
    } catch (err: any) {
      return res.status(404).json({ msg: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user = await service.create(req.body);
      return res.status(201).json(user);
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user = await service.update(req.params.id, req.body);
      return res.json(user);
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      await service.delete(req.params.id);
      return res.json({ msg: "Usuário removido" });
    } catch (err: any) {
      return res.status(400).json({ msg: err.message });
    }
  }
}
