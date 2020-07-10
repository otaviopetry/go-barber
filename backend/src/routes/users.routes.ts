import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

// create express instance
const usersRouter = Router();

// create appointment route
usersRouter.post('/', async (request, response) => {
    try {
        // capture user info from request
        const { name, email, password } = request.body;

        // create User service instance
        const createUser = new CreateUserService();

        // execute it
        const user = await createUser.execute({
            name,
            email,
            password,
        });

        // hide password from response
        delete user.password;

        // send response to client
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default usersRouter;
