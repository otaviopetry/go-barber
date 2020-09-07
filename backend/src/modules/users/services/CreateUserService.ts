import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

// import user model to use as data type
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

// create the user Request interface
interface IRequest {
    name: string;
    email: string;
    password: string;
}

// the service
class CreateUserService {
    constructor(private usersRepository: IUsersRepository) {}

    public async execute({ name, email, password }: IRequest): Promise<User> {
        // check if email is already registered
        const checkUserExists = await this.usersRepository.findByEmail(email);

        if (checkUserExists) {
            throw new AppError('Email address already in use.');
        }

        // encrypt the password
        const hashedPassword = await hash(password, 8);

        // create USER instance
        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // return the created user to the caller
        return user;
    }
}

export default CreateUserService;
