import { State } from 'app/shared/model/enumerations/state.model';

export interface IInstructorWorkingDay {
  id?: string;
  nameWorkingDay?: string;
  descriptionWorkingDay?: string;
  workingDayState?: keyof typeof State;
}

export const defaultValue: Readonly<IInstructorWorkingDay> = {};
