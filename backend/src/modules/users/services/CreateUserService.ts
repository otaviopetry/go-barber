import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

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
@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    // check if email is already registered
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already in use.');
    }

    // encrypt the password
    const hashedPassword = await this.hashProvider.generateHash(password);

    // create USER instance
    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // delete the providers cache from db since a new user has been created
    await this.cacheProvider.invalidatePrefix('providers-list');

    // return the created user to the caller
    return user;
  }
}

export default CreateUserService;
