import { Router } from 'express';

// file upload dependencies
import multer from 'multer';
import uploadConfig from '@config/upload';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

// import create user service
import CreateUserService from '@modules/users/services/CreateUserService';

// import user avatar service
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

// import middleware to be used on needed routes
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// create express instance
const usersRouter = Router();

// create Multer instance
const upload = multer(uploadConfig);

// create appointment route
usersRouter.post('/', async (request, response) => {
    // capture user info from request
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();

    // create User service instance
    const createUser = new CreateUserService(usersRepository);

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
        const usersRepository = new UsersRepository();

        // create service instance
        const updateUserAvatar = new UpdateUserAvatarService(usersRepository);

        // execute the service passing received data
        const user = await updateUserAvatar.execute({
            user_id: request.user.id,
            avatarFilename: request.file.filename,
        });

        // hide password from response
        delete user.password;

        return response.json(user);
    },
);

export default usersRouter;
