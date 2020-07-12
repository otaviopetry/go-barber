import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';

// import user model to use as data type
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        // create repository instance
        const usersRepository = getRepository(User);

        // check if user exists
        const user = await usersRepository.findOne({ where: { email } });

        // if doesnt exist, throw error
        if (!user) {
            throw new Error('Incorrect email/password combination.');
        }

        // check if informed password matches encrypted password using bcryptjs compare
        const passwordMatched = await compare(password, user.password);

        // if doesnt match, throw error
        if (!passwordMatched) {
            throw new Error('Incorrect email/password combination.');
        }

        // if matches, return user
        return {
            user,
        };
    }
}

export default AuthenticateUserService;
