import { Router } from 'express';

// file upload dependencies
import multer from 'multer';
import uploadConfig from '@config/upload';

// import middleware to be used on needed routes
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

// create instances of controllers
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

// create express instance
const usersRouter = Router();

// create Multer instance
const upload = multer(uploadConfig);

// create user route
usersRouter.post('/', usersController.create);

// update user avatar route
usersRouter.patch(
    '/avatar',

    // middleware 1 - check auth
    ensureAuthenticated,

    // midleware 2 - use multer to deal with sent file
    upload.single('avatar'),

    // final middleware
    userAvatarController.update,
);

export default usersRouter;
