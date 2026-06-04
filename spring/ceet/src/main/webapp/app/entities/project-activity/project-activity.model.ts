import { IProjectPhase } from 'app/entities/project-phase/project-phase.model';

export interface IProjectActivity {
  id: string;
  activityNumber?: number | null;
  activityDescription?: string | null;
  projectActivityState?: string | null;
  projectPhase?: Pick<IProjectPhase, 'id'> | null;
}

export type NewProjectActivity = Omit<IProjectActivity, 'id'> & { id: null };
