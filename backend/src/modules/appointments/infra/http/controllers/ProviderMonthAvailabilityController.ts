import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderMonthAvailabilityService from '@modules/appointments/services/ListProviderMonthAvailabilityService';

export default class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // get data from body and request
        const provider_id = request.params.id;
        const { month, year } = request.body;

        // create an instance of the service
        const listProviderMonthAvailability = container.resolve(
            ListProviderMonthAvailabilityService,
        );

        // execute the service
        const availability = await listProviderMonthAvailability.execute({
            provider_id,
            month,
            year,
        });

        // ## RETURN THE RESULT

        // send appointment as response
        return response.json(availability);
    }
}
