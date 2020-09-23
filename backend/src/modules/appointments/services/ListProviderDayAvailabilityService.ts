import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    provider_id: string;
    month: number;
    year: number;
    day: number;
}

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentsRepository: IAppointmentsRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<IResponse> {
        const appointments = await this.appointmentsRepository.checkProviderDayAvailability(
            {
                provider_id,
                day,
                month,
                year,
            },
        );

        const firstHour = 8;

        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => index + firstHour,
        );

        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hasAppointmentsInHour = appointments.find(
                appointment => getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    !hasAppointmentsInHour && isAfter(compareDate, currentDate),
            };
        });

        return availability;
    }
}

export default ListProviderDayAvailabilityService;