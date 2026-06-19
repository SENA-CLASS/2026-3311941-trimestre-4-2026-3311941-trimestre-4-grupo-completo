import { State } from 'app/shared/model/enumerations/state.model';

export interface ILevelEducation {
  id?: string;
  levelName?: string;
  stateLevelEducation?: keyof typeof State;
}

export const defaultValue: Readonly<ILevelEducation> = {};
