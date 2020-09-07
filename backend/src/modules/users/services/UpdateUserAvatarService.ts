import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        // check if user exists
        const user = await this.usersRepository.findById(user_id);

        // if it doesnt, throw error
        if (!user) {
            throw new AppError(
                'Only authenticated user can change their Avatar.',
                401,
            );
        }

        // check if user already have an avatar image, and if so, delete it
        if (user.avatar) {
            // build file path
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            // check if file really is in file system
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            // if it is, delete it
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        // set user avatar to the new file
        user.avatar = avatarFilename;

        // save the table
        await this.usersRepository.save(user);

        // return the user
        return user;
    }
}

export default UpdateUserAvatarService;
