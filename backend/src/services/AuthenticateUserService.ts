import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

// import user model to use as data type
import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
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

        // first parameter is the PAYLOAD (public), second is any secret key (md5 hash), third is configs
        const token = sign({}, '2f5fb6eb78b9c2aa3f2876d7f14bb36b', {
            subject: user.id,
            expiresIn: '1d',
        });

        // if matches, return user
        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
