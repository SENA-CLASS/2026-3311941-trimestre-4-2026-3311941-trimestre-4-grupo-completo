import { ICourse } from 'app/shared/model/course.model';
import { State } from 'app/shared/model/enumerations/state.model';
import { IPlanning } from 'app/shared/model/planning.model';

export interface ICoursePlanning {
  id?: string;
  stateCoursePlanning?: keyof typeof State;
  course?: ICourse;
  planning?: IPlanning;
}

export const defaultValue: Readonly<ICoursePlanning> = {};
