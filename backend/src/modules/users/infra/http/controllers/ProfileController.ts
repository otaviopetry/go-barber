import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import ShowProfileService from '@modules/users/services/ShowProfileService';

export default class UsersController {
    public async show(request: Request, response: Response): Promise<Response> {
        // capture user info from request
        const user_id = request.user.id;

        // create User service instance
        const showProfile = container.resolve(ShowProfileService);

        const user = await showProfile.execute({ user_id });

        return response.json(classToClass(user));
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // capture user info from request
        const user_id = request.user.id;
        const { name, email, password, old_password } = request.body;

        // create User service instance
        const updateProfile = container.resolve(UpdateProfileService);

        // execute it
        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            old_password,
            password,
        });

        // send response to client
        return response.json(classToClass(user));
    }
}
