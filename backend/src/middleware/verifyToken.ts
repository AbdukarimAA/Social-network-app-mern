import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.method === 'OPTIONS') {
            return next()
        }

        const token = req.header('Authorization')?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({message: 'Not authorized, please log in first'})
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).send({msg: "You are not authenticated!"});
    }
};


//https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1