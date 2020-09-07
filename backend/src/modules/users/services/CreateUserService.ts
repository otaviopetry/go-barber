import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import AppError from '@shared/errors/AppError';

// import user model to use as data type
import User from '../infra/typeorm/entities/User';

// create the user Request interface
interface IRequest {
    name: string;
    email: string;
    password: string;
}

// the service
class CreateUserService {
    public async execute({ name, email, password }: IRequest): Promise<User> {
        // create the USERS repository locally, using TypeORM own repository
        const usersRepository = getRepository(User);

        // check if email is already registered
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError('Email address already in use.');
        }

        // encrypt the password
        const hashedPassword = await hash(password, 8);

        // create USER instance
        const user = usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        // save it to db
        await usersRepository.save(user);

        // return the created user to the caller
        return user;
    }
}

export default CreateUserService;
