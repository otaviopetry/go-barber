import ListProviderDayAvailabilityService from './ListProviderDayAvailabilityService';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailability: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProviderDayAvailability = new ListProviderDayAvailabilityService(
            fakeAppointmentsRepository,
        );
    });

    it('should be able to list the day availability from provider', async () => {
        // May 20, 8:00AM
        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 8, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 10, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        await fakeAppointmentsRepository.create({
            provider_id: 'user',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 20, 11).getTime();
        });

        // here we specify the month as the actual calendar number (may is 5, not 4 as above)
        const availability = await listProviderDayAvailability.execute({
            provider_id: 'user',
            day: 20,
            year: 2020,
            month: 5,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { hour: 8, available: false },
                { hour: 9, available: false },
                { hour: 10, available: false },
                { hour: 11, available: false },
                { hour: 12, available: true },
                { hour: 13, available: true },
                { hour: 14, available: false },
                { hour: 15, available: false },
                { hour: 16, available: true },
                { hour: 17, available: true },
            ]),
        );
    });
});
