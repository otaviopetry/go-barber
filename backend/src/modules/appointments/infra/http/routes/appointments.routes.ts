/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

// check authentication middleware
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

// create express instance
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
appointmentsRouter.post('/', async (request, response) => {
    // ## PROCESS REQUEST

    // get data from body
    const { provider_id, date } = request.body;

    // convert the date
    const parsedDate = parseISO(date);

    // new instance of repository
    const appointmentsRepository = new AppointmentsRepository();

    // ## CALL SPECIFIC SERVICE

    // create an instance of the service
    const createAppointment = new CreateAppointmentService(
        appointmentsRepository,
    );

    // execute the service
    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
    });

    // ## RETURN THE RESULT

    // send appointment as response
    return response.json(appointment);
});

export default appointmentsRouter;
