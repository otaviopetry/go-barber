import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // JWT token validation
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error('JWT token is missing');
    }

    // split token from Bearer keyword
    const [, token] = authHeader.split(' ');

    try {
        // verify if the informed token was generated with our secret key
        const decoded = verify(token, authConfig.jwt.secret);

        // destructure Payload
        const { sub } = decoded as TokenPayload;

        // pass along user id
        request.user = {
            id: sub,
        };

        // if it was, user may proceed
        return next();
    } catch {
        throw new Error('Invalid JWT token');
    }
}
