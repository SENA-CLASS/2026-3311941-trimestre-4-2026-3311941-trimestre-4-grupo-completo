import { IBondingInstructor } from 'app/shared/model/bonding-instructor.model';
import { IInstructorWorkingDay } from 'app/shared/model/instructor-working-day.model';

export interface IBoundingSchedule {
  id?: string;
  bondingInstructor?: IBondingInstructor;
  instructorWorkingDay?: IInstructorWorkingDay;
}

export const defaultValue: Readonly<IBoundingSchedule> = {};
