import { State } from 'app/shared/model/enumerations/state.model';

export interface IYear {
  id?: string;
  yearNumber?: number;
  yearState?: keyof typeof State;
}

export const defaultValue: Readonly<IYear> = {};
