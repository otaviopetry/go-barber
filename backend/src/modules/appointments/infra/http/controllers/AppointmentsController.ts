import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentController {
  public async create(request: Request, response: Response): Promise<Response> {
    // get data from body and request (provided by Ensure Authenticated middleware)
    const { provider_id, date } = request.body;
    const user_id = request.user.id;

    // ## CALL SPECIFIC SERVICE

    // create an instance of the service
    const createAppointment = container.resolve(CreateAppointmentService);

    // execute the service
    const appointment = await createAppointment.execute({
      date,
      provider_id,
      user_id,
    });

    // ## RETURN THE RESULT

    // send appointment as response
    return response.json(appointment);
  }
}
