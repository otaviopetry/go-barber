import { getRepository, Raw, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import ICheckProviderMonthAvailabilityDTO from '@modules/appointments/dtos/ICheckProviderMonthAvailabilityDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
    private ormRepository: Repository<Appointment>;

    constructor() {
        this.ormRepository = getRepository(Appointment);
    }

    // public method to find appointments in same slot
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        // check if date is not booked
        const findAppointment = await this.ormRepository.findOne({
            where: { date },
        });

        // if a conflict is found, show appointment
        return findAppointment;
    }

    public async checkProviderMonthAvailability({
        provider_id,
        month,
        year,
    }: ICheckProviderMonthAvailabilityDTO): Promise<Appointment[]> {
        const parsedMonth = String(month).padStart(2, '0');

        const appointments = await this.ormRepository.find({
            where: {
                provider_id,
                date: Raw(
                    dateFieldName =>
                        `to_char(${dateFieldName}, 'MM-YYYY') = '${parsedMonth}-${year}'`,
                ),
            },
        });

        return appointments;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = this.ormRepository.create({ provider_id, date });

        await this.ormRepository.save(appointment);

        return appointment;
    }
}

export default AppointmentsRepository;
