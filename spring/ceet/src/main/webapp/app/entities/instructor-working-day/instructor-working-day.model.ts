import { State } from 'app/entities/enumerations/state.model';

export interface IInstructorWorkingDay {
  id: string;
  nameWorkingDay?: string | null;
  descriptionWorkingDay?: string | null;
  workingDayState?: keyof typeof State | null;
}

export type NewInstructorWorkingDay = Omit<IInstructorWorkingDay, 'id'> & { id: null };
