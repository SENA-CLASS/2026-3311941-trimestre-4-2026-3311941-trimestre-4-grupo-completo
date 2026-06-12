import { State } from 'app/shared/model/enumerations/state.model';
import { ITrainingProgram } from 'app/shared/model/training-program.model';

export interface IProject {
  id?: string;
  projectCode?: string;
  projectName?: string;
  projectState?: keyof typeof State;
  trainingProgram?: ITrainingProgram;
}

export const defaultValue: Readonly<IProject> = {};
