import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

// create instance of controller
const sessionsController = new SessionsController();

// create instance of express Router
const sessionsRouter = Router();

// login route
sessionsRouter.post('/', sessionsController.create);

export default sessionsRouter;
