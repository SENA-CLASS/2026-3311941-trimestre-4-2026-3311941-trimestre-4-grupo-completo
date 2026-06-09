import { State } from 'app/entities/enumerations/state.model';

export interface ILevelEducation {
  id: string;
  levelName?: string | null;
  stateLevelEducation?: keyof typeof State | null;
}

export type NewLevelEducation = Omit<ILevelEducation, 'id'> & { id: null };
