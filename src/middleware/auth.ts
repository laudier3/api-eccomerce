import { Request, Response, NextFunction } from "express";

const TOKEN_FIXO = process.env.TOKEN_PROTECTION || "MEU_TOKEN_FIXO_EXEMPLO";

export function autenticarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ mensagem: 'Token não fornecido' });

  if (token !== TOKEN_FIXO) {
    return res.status(403).json({ mensagem: 'Token inválido' });
  }

  next();
}
