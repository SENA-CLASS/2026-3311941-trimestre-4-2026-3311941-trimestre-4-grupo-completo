import { ICourse } from 'app/entities/course/course.model';
import { State } from 'app/entities/enumerations/state.model';

export interface IProjectGroup {
  id: string;
  groupNumber?: number | null;
  projectName?: string | null;
  projectGroupState?: keyof typeof State | null;
  course?: Pick<ICourse, 'id' | 'courseNumber'> | null;
}

export type NewProjectGroup = Omit<IProjectGroup, 'id'> & { id: null };
