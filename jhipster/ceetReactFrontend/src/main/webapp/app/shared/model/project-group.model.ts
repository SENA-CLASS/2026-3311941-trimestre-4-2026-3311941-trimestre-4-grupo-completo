import { ICourse } from 'app/shared/model/course.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IProjectGroup {
  id?: string;
  groupNumber?: number;
  projectName?: string;
  projectGroupState?: keyof typeof State;
  course?: ICourse;
}

export const defaultValue: Readonly<IProjectGroup> = {};
