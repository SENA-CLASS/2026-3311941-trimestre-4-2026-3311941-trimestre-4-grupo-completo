import { State } from 'app/shared/model/enumerations/state.model';

export interface IBonding {
  id?: string;
  bondingType?: string;
  workingHours?: number;
  bondingState?: keyof typeof State;
}

export const defaultValue: Readonly<IBonding> = {};
