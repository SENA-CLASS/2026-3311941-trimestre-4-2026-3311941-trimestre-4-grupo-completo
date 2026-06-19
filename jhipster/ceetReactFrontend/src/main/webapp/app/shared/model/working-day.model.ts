import { IDay } from 'app/shared/model/day.model';
import { IInstructorWorkingDay } from 'app/shared/model/instructor-working-day.model';

export interface IWorkingDay {
  id?: string;
  startTime?: string;
  endTime?: string;
  instructorWorkingDay?: IInstructorWorkingDay;
  day?: IDay;
}

export const defaultValue: Readonly<IWorkingDay> = {};
