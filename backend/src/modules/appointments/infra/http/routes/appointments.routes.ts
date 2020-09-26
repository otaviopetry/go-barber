import { Router } from 'express';

import { celebrate, Segments, Joi } from 'celebrate';

// check authentication middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

// create instance of controller
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

// create instance of express Router
const appointmentsRouter = Router();

// set appointments router to always check for authentication
appointmentsRouter.use(ensureAuthenticated);

// create appointment route
appointmentsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date(),
        },
    }),
    appointmentsController.create,
);

appointmentsRouter.get('/scheduled', providerAppointmentsController.index);

export default appointmentsRouter;
