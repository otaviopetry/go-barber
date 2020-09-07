import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

// import user model to use as data type
import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

@injectable()
class AuthenticateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        // check if user exists
        const user = await this.usersRepository.findByEmail(email);

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
