/* eslint-disable camelcase */
import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentsService';

// check authentication middleware
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

// create express instance
const appointmentsRouter = Router();

// set appointments router to always check for authentication
appointmentsRouter.use(ensureAuthenticated);

// list appointments route
appointmentsRouter.get('/', async (request, response) => {
    // create typeORM custom repository
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    // access the method all() in appointments and store the response
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

// create appointment route
appointmentsRouter.post('/', async (request, response) => {
    try {
        // ## PROCESS REQUEST

        // get data from body
        const { provider_id, date } = request.body;

        // convert the date
        const parsedDate = parseISO(date);

        // ## CALL SPECIFIC SERVICE

        // create an instance of the service
        const createAppointment = new CreateAppointmentService();

        // execute the service
        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        // ## RETURN THE RESULT

        // send appointment as response
        return response.json(appointment);
    } catch (error) {
        return response
            .status(error.statusCode)
            .json({ erroror: error.message });
    }
});

export default appointmentsRouter;
