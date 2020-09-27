import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // store email and password sent by user
        const { email, password } = request.body;

        // create service instance
        const authenticateUser = container.resolve(AuthenticateUserService);

        // execute service passing informed data
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        // return user found without password
        return response.json({ user: classToClass(user), token });
    }
}
