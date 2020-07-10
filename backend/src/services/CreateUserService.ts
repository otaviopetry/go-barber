import { getRepository } from 'typeorm';
import User from '../models/User';

// create the user Request interface
interface Request {
    name: string;
    email: string;
    password: string;
}

// the service
class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<User> {
        // create the USERS repository locally, using TypeORM own repository
        const usersRepository = getRepository(User);

        // check if email is already registered
        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new Error('Email address already in use.');
        }

        // create USER instance
        const user = usersRepository.create({
            name,
            email,
            password,
        });

        // save it to db
        await usersRepository.save(user);

        // return the created user to the caller
        return user;
    }
}

export default CreateUserService;
