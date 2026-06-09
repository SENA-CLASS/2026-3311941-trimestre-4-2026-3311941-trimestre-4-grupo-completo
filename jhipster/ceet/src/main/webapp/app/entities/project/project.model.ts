import { State } from 'app/entities/enumerations/state.model';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';

export interface IProject {
  id: string;
  projectCode?: string | null;
  projectName?: string | null;
  projectState?: keyof typeof State | null;
  trainingProgram?: Pick<ITrainingProgram, 'id'> | null;
}

export type NewProject = Omit<IProject, 'id'> & { id: null };
