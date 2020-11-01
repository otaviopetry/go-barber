import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    // get data from body and request
    const { provider_id } = request.params;
    const { day, month, year } = request.query;

    // create an instance of the service
    const listProviderDayAvailability = container.resolve(
      ListProviderDayAvailabilityService,
    );

    // execute the service
    const availability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    // ## RETURN THE RESULT

    // send appointment as response
    return response.json(availability);
  }
}
