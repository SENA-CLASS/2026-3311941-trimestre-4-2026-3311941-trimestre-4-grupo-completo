import { State } from 'app/entities/enumerations/state.model';

export interface IWorkingDayCourse {
  id: string;
  workingDayAcronym?: string | null;
  workingDayName?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  stateWorkingDay?: keyof typeof State | null;
}

export type NewWorkingDayCourse = Omit<IWorkingDayCourse, 'id'> & { id: null };
