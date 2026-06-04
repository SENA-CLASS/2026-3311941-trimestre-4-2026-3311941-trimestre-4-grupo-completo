import { IDay } from 'app/entities/day/day.model';
import { IInstructorWorkingDay } from 'app/entities/instructor-working-day/instructor-working-day.model';

export interface IWorkingDay {
  id: string;
  startTime?: string | null;
  endTime?: string | null;
  instructorWorkingDay?: Pick<IInstructorWorkingDay, 'id' | 'nameWorkingDay'> | null;
  day?: Pick<IDay, 'id' | 'dayName'> | null;
}

export type NewWorkingDay = Omit<IWorkingDay, 'id'> & { id: null };
