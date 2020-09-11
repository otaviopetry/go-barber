import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        // store email and password sent by user
        const { token, password } = request.body;

        // create service instance
        const resetPassword = container.resolve(ResetPasswordService);

        await resetPassword.execute({
            token,
            password,
        });

        // return success no content response
        return response.status(204).json();
    }
}
