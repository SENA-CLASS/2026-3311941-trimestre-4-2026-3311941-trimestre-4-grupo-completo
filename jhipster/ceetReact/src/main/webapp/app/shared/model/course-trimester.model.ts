import { ICourse } from 'app/shared/model/course.model';
import { ITrimester } from 'app/shared/model/trimester.model';

export interface ICourseTrimester {
  id?: string;
  course?: ICourse;
  trimester?: ITrimester;
}

export const defaultValue: Readonly<ICourseTrimester> = {};
