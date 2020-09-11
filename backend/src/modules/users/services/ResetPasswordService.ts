import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

// import user model to use as data type
// import User from '../infra/typeorm/entities/User';

import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// create the user Request interface
interface IRequest {
    token: string;
    password: string;
}

// the service
@injectable()
class ResetPasswordService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.userTokensRepository.findByToken(token);

        if (!userToken) {
            throw new AppError('User token does not exist.');
        }

        const user = await this.usersRepository.findById(userToken?.user_id);

        if (!user) {
            throw new AppError('User does not exist.');
        }

        const tokenCreatedAt = userToken.created_at;
        const tokenExpireLimit = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), tokenExpireLimit)) {
            throw new AppError('Token expired.');
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordService;
