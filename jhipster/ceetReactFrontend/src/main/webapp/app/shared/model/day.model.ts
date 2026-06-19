import { State } from 'app/shared/model/enumerations/state.model';

export interface IDay {
  id?: string;
  dayName?: string;
  dayState?: keyof typeof State;
}

export const defaultValue: Readonly<IDay> = {};
