import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';

export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    // get data from body and request (provided by Ensure Authenticated middleware)
    const { day, month, year } = request.query;
    const provider_id = request.user.id;

    // ## CALL SPECIFIC SERVICE

    // create an instance of the service
    const listProviderAppointments = container.resolve(
      ListProviderAppointmentsService,
    );

    // execute the service
    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    // ## RETURN THE RESULT

    // send appointment as response
    return response.json(appointments);
  }
}
