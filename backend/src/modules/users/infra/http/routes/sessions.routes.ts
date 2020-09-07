import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    // store email and password sent by user
    const { email, password } = request.body;

    const usersRepository = new UsersRepository();

    // create service instance
    const authenticateUser = new AuthenticateUserService(usersRepository);

    // execute service passing informed data
    const { user, token } = await authenticateUser.execute({
        email,
        password,
    });

    // if service is sucessful, delete user password from response
    delete user.password;

    // return user found without password
    return response.json({ user, token });
});

export default sessionsRouter;
