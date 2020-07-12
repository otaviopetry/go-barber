import { Router } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
    try {
        // store email and password sent by user
        const { email, password } = request.body;

        // create service instance
        const authenticateUser = new AuthenticateUserService();

        // execute service passing informed data
        const { user, token } = await authenticateUser.execute({
            email,
            password,
        });

        // if service is sucessful, delete user password from response
        delete user.password;

        // return user found without password
        return response.json({ user, token });
    } catch (err) {
        // if service throws error, send error message
        return response.status(400).json({ error: err.message });
    }
});

export default sessionsRouter;
