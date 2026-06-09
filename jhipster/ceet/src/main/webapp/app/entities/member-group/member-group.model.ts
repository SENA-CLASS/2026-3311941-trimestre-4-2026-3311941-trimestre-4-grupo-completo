import { IApprentice } from 'app/entities/apprentice/apprentice.model';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';

export interface IMemberGroup {
  id: string;
  projectGroup?: Pick<IProjectGroup, 'id'> | null;
  apprentice?: Pick<IApprentice, 'id'> | null;
}

export type NewMemberGroup = Omit<IMemberGroup, 'id'> & { id: null };
