import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentsService';

export default class AppointmentController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // get data from body
        const { provider_id, date } = request.body;

        // convert the date
        const parsedDate = parseISO(date);

        // ## CALL SPECIFIC SERVICE

        // create an instance of the service
        const createAppointment = container.resolve(CreateAppointmentService);

        // execute the service
        const appointment = await createAppointment.execute({
            date: parsedDate,
            provider_id,
        });

        // ## RETURN THE RESULT

        // send appointment as response
        return response.json(appointment);
    }
}
