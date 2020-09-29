import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    day,
    year,
    month,
  }: IRequest): Promise<Appointment[]> {
    const cacheData = await this.cacheProvider.recover('key');

    console.log(cacheData);

    const appointments = await this.appointmentsRepository.checkProviderDayAvailability(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    // just for testing the cache provider
    // await this.cacheProvider.save('key', 'value');

    return appointments;
  }
}

export default ListProviderAppointmentsService;
