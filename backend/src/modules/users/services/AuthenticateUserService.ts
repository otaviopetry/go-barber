import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';

import AppError from '@shared/errors/AppError';

// import user model to use as data type
import User from '../infra/typeorm/entities/User';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // create repository instance
        const usersRepository = getRepository(User);

        // check if user exists
        const user = await usersRepository.findOne({ where: { email } });

        // if doesnt exist, throw error
        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // check if informed password matches encrypted password using bcryptjs compare
        const passwordMatched = await compare(password, user.password);

        // if doesnt match, throw error
        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // destructuring jwt config
        const { secret, expiresIn } = authConfig.jwt;

        // first parameter is the PAYLOAD (public), second is any secret key (md5 hash), third is configs
        const token = sign({}, secret, {
            subject: user.id,
            expiresIn,
        });

        // if matches, return user
        return {
            user,
            token,
        };
    }
}

export default AuthenticateUserService;
