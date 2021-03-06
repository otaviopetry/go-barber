import { startOfHour, isBefore, getHours, format } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
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

    @inject('NotificationsRepository')
    private notificationsRepository: INotificationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    provider_id,
    user_id,
  }: IRequest): Promise<Appointment> {
    // force 1 hour blocks
    const appointmentDate = startOfHour(date);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError("You can't create an appointment in a past date");
    }

    if (user_id === provider_id) {
      throw new AppError("You can't create an appointment with yourself");
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new AppError(
        'You can only create an appointment between 8am and 5pm',
      );
    }

    // use the findByDate method created in appointments repository
    const findAppointmentConflict = await this.appointmentsRepository.findByDate(
      appointmentDate,
      provider_id,
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

    const dateFormatted = format(appointmentDate, "dd/MM/yyyy 'às' HH:mm'h'");

    await this.notificationsRepository.create({
      recipient_id: provider_id,
      content: `Novo agendamento para dia ${dateFormatted}`,
    });

    // delete the providers cache when a new appointment is created
    const cacheKey = `provider-appointments:${provider_id}:${format(
      appointmentDate,
      'yyyy-M-d',
    )}`;
    await this.cacheProvider.invalidate(cacheKey);

    // create function result
    return appointment;
  }
}

export default CreateAppointmentService;
