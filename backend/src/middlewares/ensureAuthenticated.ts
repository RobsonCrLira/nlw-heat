import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';
import { AppError } from '../errors/AppError';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        throw new AppError('Token Invalid', 401);
    }

    const [, token] = authToken.split(' ');

    try {
        const { sub } = verify(token, auth.secret) as IPayload;
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.json(new AppError('Token Expired'));
    }
}
