import { IProject } from 'app/shared/model/project.model';

export interface IProjectPhase {
  id?: string;
  projectPhaseCode?: string;
  projectPhaseState?: string;
  project?: IProject;
}

export const defaultValue: Readonly<IProjectPhase> = {};
