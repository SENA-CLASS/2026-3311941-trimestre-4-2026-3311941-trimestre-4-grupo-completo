import { ICourse } from 'app/entities/course/course.model';
import { ITrimester } from 'app/entities/trimester/trimester.model';

export interface ICourseTrimester {
  id: string;
  course?: Pick<ICourse, 'id' | 'courseNumber'> | null;
  trimester?: Pick<ITrimester, 'id'> | null;
}

export type NewCourseTrimester = Omit<ICourseTrimester, 'id'> & { id: null };
