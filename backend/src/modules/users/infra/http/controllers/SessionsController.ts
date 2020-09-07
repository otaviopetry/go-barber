import { Request, Response } from 'express';
import { container } from 'tsyringe';

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

        // if service is sucessful, delete user password from response
        delete user.password;

        // return user found without password
        return response.json({ user, token });
    }
}
