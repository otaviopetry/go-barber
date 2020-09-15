import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // get data from body
        const user_id = request.user.id;

        // create an instance of the service
        const listProviders = container.resolve(ListProvidersService);

        // execute the service
        const providers = await listProviders.execute({
            user_id,
        });

        // ## RETURN THE RESULT

        // send appointment as response
        return response.json(providers);
    }
}
