/* eslint-disable camelcase */
import { Router } from 'express';

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

// list appointments route
/* appointmentsRouter.get('/', async (request, response) => {
    // access the method all() in appointments and store the response
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
}); */

// create appointment route
appointmentsRouter.post('/', appointmentsController.create);

appointmentsRouter.get('/scheduled', providerAppointmentsController.index);

export default appointmentsRouter;
