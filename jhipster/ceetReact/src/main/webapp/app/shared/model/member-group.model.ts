import { IApprentice } from 'app/shared/model/apprentice.model';
import { IProjectGroup } from 'app/shared/model/project-group.model';

export interface IMemberGroup {
  id?: string;
  projectGroup?: IProjectGroup;
  apprentice?: IApprentice;
}

export const defaultValue: Readonly<IMemberGroup> = {};
