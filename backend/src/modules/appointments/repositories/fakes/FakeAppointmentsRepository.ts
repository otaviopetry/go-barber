import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

import ICheckProviderMonthAvailabilityDTO from '@modules/appointments/dtos/ICheckProviderMonthAvailabilityDTO';
import ICheckProviderDayAvailabilityDTO from '@modules/appointments/dtos/ICheckProviderDayAvailabilityDTO';
import Appointment from '../../infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
    private appointments: Appointment[] = [];

    // public method to find appointments in same slot
    public async findByDate(date: Date): Promise<Appointment | undefined> {
        const findAppointment = this.appointments.find(appointment =>
            isEqual(appointment.date, date),
        );

        return findAppointment;
    }

    public async checkProviderMonthAvailability({
        provider_id,
        month,
        year,
    }: ICheckProviderMonthAvailabilityDTO): Promise<Appointment[]> {
        const appointments = await this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }

    public async checkProviderDayAvailability({
        provider_id,
        day,
        month,
        year,
    }: ICheckProviderDayAvailabilityDTO): Promise<Appointment[]> {
        const appointments = await this.appointments.filter(
            appointment =>
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year,
        );

        return appointments;
    }

    public async create({
        provider_id,
        date,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();

        Object.assign(appointment, { id: uuid(), date, provider_id });

        this.appointments.push(appointment);

        return appointment;
    }
}

export default FakeAppointmentsRepository;
