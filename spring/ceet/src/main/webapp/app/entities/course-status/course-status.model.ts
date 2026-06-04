import { State } from 'app/entities/enumerations/state.model';

export interface ICourseStatus {
  id: string;
  nameCourseStatus?: string | null;
  stateCourse?: keyof typeof State | null;
}

export type NewCourseStatus = Omit<ICourseStatus, 'id'> & { id: null };
