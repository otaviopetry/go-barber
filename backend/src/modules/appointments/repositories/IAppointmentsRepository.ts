import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import ICheckProviderMonthAvailabilityDTO from '../dtos/ICheckProviderMonthAvailabilityDTO';

export default interface IAppointmentsRepository {
    create(data: ICreateAppointmentDTO): Promise<Appointment>;
    findByDate(date: Date): Promise<Appointment | undefined>;
    checkProviderMonthAvailability(
        data: ICheckProviderMonthAvailabilityDTO,
    ): Promise<Appointment[]>;
}
