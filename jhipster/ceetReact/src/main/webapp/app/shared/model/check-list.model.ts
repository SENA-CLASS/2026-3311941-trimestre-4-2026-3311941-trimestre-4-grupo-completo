import { State } from 'app/shared/model/enumerations/state.model';
import { ITrainingProgram } from 'app/shared/model/training-program.model';

export interface ICheckList {
  id?: string;
  listName?: string;
  listState?: keyof typeof State;
  trainingProgram?: ITrainingProgram;
}

export const defaultValue: Readonly<ICheckList> = {};
