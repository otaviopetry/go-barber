/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../infra/typeorm/repositories/AppointmentsRepository';

/**
 * Data receiving
 * Dealing with errors/exceptions
 * Access to repository
 */

interface Request {
    provider_id: string;
    date: Date;
}

class CreateAppointmentService {
    public async execute({ date, provider_id }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        // force 1 hour blocks
        const appointmentDate = startOfHour(date);

        // use the findByDate method created in appointments repository
        const findAppointmentConflict = await appointmentsRepository.findByDate(
            appointmentDate,
        );

        // if it is, return error
        if (findAppointmentConflict) {
            throw new AppError('This appointment is already booked.');
        }

        // create the appointment object
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });

        // create function result
        return appointment;
    }
}

export default CreateAppointmentService;
