import { IProjectPhase } from 'app/shared/model/project-phase.model';

export interface IProjectActivity {
  id?: string;
  activityNumber?: number;
  activityDescription?: string;
  projectActivityState?: string;
  projectPhase?: IProjectPhase;
}

export const defaultValue: Readonly<IProjectActivity> = {};
