import { State } from 'app/shared/model/enumerations/state.model';

export interface IWorkingDayCourse {
  id?: string;
  workingDayAcronym?: string;
  workingDayName?: string;
  description?: string;
  imageUrl?: string | null;
  stateWorkingDay?: keyof typeof State;
}

export const defaultValue: Readonly<IWorkingDayCourse> = {};
