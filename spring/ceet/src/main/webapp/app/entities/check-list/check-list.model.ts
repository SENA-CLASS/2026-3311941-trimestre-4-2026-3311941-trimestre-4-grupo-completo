import { State } from 'app/entities/enumerations/state.model';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';

export interface ICheckList {
  id: string;
  listName?: string | null;
  listState?: keyof typeof State | null;
  trainingProgram?: Pick<ITrainingProgram, 'id'> | null;
}

export type NewCheckList = Omit<ICheckList, 'id'> & { id: null };
