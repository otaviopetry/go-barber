import { Router } from 'express';

// file upload dependencies
import multer from 'multer';
import uploadConfig from '../config/upload';

// import create user service
import CreateUserService from '../services/CreateUserService';

// import middleware to be used on needed routes
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// create express instance
const usersRouter = Router();

// create Multer instance
const upload = multer(uploadConfig);

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

// update user avatar route
usersRouter.patch(
    '/avatar',

    // middleware 1 - check auth
    ensureAuthenticated,

    // midleware 2 - use multer to deal with sent file
    upload.single('avatar'),

    // final middleware
    async (request, response) => {
        return response.json({ ok: true });
    },
);

export default usersRouter;
