import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

// import create user service
import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // capture user info from request
        const { name, email, password } = request.body;

        // create User service instance
        const createUser = container.resolve(CreateUserService);

        // execute it
        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // send response to client
        return response.json(classToClass(user));
    }
}
