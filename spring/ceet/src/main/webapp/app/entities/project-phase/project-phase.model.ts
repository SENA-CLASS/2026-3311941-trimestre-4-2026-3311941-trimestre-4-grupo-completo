import { IProject } from 'app/entities/project/project.model';

export interface IProjectPhase {
  id: string;
  projectPhaseCode?: string | null;
  projectPhaseState?: string | null;
  project?: Pick<IProject, 'id' | 'projectCode'> | null;
}

export type NewProjectPhase = Omit<IProjectPhase, 'id'> & { id: null };
