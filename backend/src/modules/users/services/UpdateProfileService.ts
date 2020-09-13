import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    user_id: string;
    name: string;
    email: string;
    old_password?: string;
    password?: string;
}

@injectable()
class UpdateProfileService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({
        user_id,
        name,
        email,
        old_password,
        password,
    }: IRequest): Promise<User> {
        // check if the user exists
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User not found');
        }

        // check if the email being passed by the user is already in use
        const userWithDesiredEmail = await this.usersRepository.findByEmail(
            email,
        );

        // deny if the email is already in use and its not by the same user
        // (scenario where he'd be trying to update just the name)
        if (userWithDesiredEmail && userWithDesiredEmail.id !== user_id) {
            throw new AppError('E-mail already in use.');
        }

        user.name = name;
        user.email = email;

        if (password && old_password === user.password) {
            user.password = await this.hashProvider.generateHash(password);
        } else if (password && old_password !== user.password) {
            throw new AppError('Old password is not correct.');
        }

        await this.usersRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;
