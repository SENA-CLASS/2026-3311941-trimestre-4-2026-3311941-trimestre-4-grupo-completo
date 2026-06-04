import { ICourse } from 'app/entities/course/course.model';
import { State } from 'app/entities/enumerations/state.model';
import { IPlanning } from 'app/entities/planning/planning.model';

export interface ICoursePlanning {
  id: string;
  stateCoursePlanning?: keyof typeof State | null;
  course?: Pick<ICourse, 'id' | 'courseNumber'> | null;
  planning?: Pick<IPlanning, 'id' | 'planningCode'> | null;
}

export type NewCoursePlanning = Omit<ICoursePlanning, 'id'> & { id: null };
