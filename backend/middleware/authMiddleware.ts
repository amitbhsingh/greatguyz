// import { Request,Response } from "express"

// export const protect = (req: Request, res: Response, next: () => void) => {
//   if (!req.user) {
//     res.status(401)
//     throw new Error('Please log in')
//   }

//   next()
// }
import { Request, Response, NextFunction } from "express";

export const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Please log in' });
  }

  next();
};
