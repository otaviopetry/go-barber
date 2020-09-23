/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

/**
 * Data receiving
 * Dealing with errors/exceptions
 * Access to repository
 */

interface IRequest {
    provider_id: string;
    user_id: string;
    date: Date;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        date,
        provider_id,
        user_id,
    }: IRequest): Promise<Appointment> {
        // force 1 hour blocks
        const appointmentDate = startOfHour(date);

        // use the findByDate method created in appointments repository
        const findAppointmentConflict = await this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        // if it is, return error
        if (findAppointmentConflict) {
            throw new AppError('This appointment is already booked.');
        }

        // create the appointment object
        const appointment = this.appointmentsRepository.create({
            provider_id,
            user_id,
            date: appointmentDate,
        });

        // create function result
        return appointment;
    }
}

export default CreateAppointmentService;
