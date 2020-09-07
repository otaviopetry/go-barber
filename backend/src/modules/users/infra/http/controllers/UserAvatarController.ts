import { Request, Response } from 'express';
import { container } from 'tsyringe';

// import user avatar service
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // create service instance
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);

        // execute the service passing received data
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        // hide password from response
        delete user.password;

        return response.json(user);
    }
}
