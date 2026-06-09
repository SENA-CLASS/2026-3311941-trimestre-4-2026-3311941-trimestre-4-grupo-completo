import { IBondingInstructor } from 'app/entities/bonding-instructor/bonding-instructor.model';
import { IInstructorWorkingDay } from 'app/entities/instructor-working-day/instructor-working-day.model';

export interface IBoundingSchedule {
  id: string;
  bondingInstructor?: Pick<IBondingInstructor, 'id'> | null;
  instructorWorkingDay?: Pick<IInstructorWorkingDay, 'id'> | null;
}

export type NewBoundingSchedule = Omit<IBoundingSchedule, 'id'> & { id: null };
