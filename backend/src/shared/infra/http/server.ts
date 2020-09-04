/* eslint-disable no-console */
import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';



import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import '@shared/infra/typeorm';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// Global exception handler (underline on last parameter is to eslint ignore unused var)
app.use(
    (error: Error, request: Request, response: Response, _: NextFunction) => {
        // if it is a known error, return it
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'error',
                message: error.message,
            });
        }

        console.error(error);

        // if its unknown, return generic error
        return response.status(500).json({
            status: 'error',
            message: 'Internal server error.',
        });
    },
);

app.listen(3333, () => {
    console.log('🚀  Server has launched on port 3333, dude!');
});
