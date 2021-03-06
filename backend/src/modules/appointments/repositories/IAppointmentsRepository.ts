import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import ICheckProviderMonthAvailabilityDTO from '../dtos/ICheckProviderMonthAvailabilityDTO';
import ICheckProviderDayAvailabilityDTO from '../dtos/ICheckProviderDayAvailabilityDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  checkProviderMonthAvailability(
    data: ICheckProviderMonthAvailabilityDTO,
  ): Promise<Appointment[]>;
  checkProviderDayAvailability(
    data: ICheckProviderDayAvailabilityDTO,
  ): Promise<Appointment[]>;
}
