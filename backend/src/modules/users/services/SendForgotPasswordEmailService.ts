import { injectable, inject } from 'tsyringe';

// import user model to use as data type
// import User from '../infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';

// create the user Request interface
interface IRequest {
    email: string;
}

// the service
@injectable()
class SendForgotPasswordEmailService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UserTokensRepository')
        private userTokensRepository: IUserTokensRepository,
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('User doesnt exist');
        }

        const { token } = await this.userTokensRepository.generate(user.id);

        this.mailProvider.sendMail(
            email,
            `Password recover requested: ${token}`,
        );
    }
}

export default SendForgotPasswordEmailService;
