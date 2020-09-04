import { EntityRepository, Repository } from 'typeorm';
import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
    // public method to find appointments in same slot
    public async findByDate(date: Date): Promise<Appointment | null> {
        // check if date is not booked
        const findAppointment = await this.findOne({
            where: { date },
        });

        // if a conflict is found, show appointment
        return findAppointment || null;
    }
}

export default AppointmentsRepository;
