import { State } from 'app/shared/model/enumerations/state.model';

export interface ICourseStatus {
  id?: string;
  nameCourseStatus?: string;
  stateCourse?: keyof typeof State;
}

export const defaultValue: Readonly<ICourseStatus> = {};
