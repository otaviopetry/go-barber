import { injectable, inject } from 'tsyringe';

// import AppError from '@shared/errors/AppError';

// import user model to use as data type
// import User from '../infra/typeorm/entities/User';

import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

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
    ) {}

    public async execute({ email }: IRequest): Promise<void> {
        this.mailProvider.sendMail(email, 'Password recover requested.');
    }
}

export default SendForgotPasswordEmailService;
