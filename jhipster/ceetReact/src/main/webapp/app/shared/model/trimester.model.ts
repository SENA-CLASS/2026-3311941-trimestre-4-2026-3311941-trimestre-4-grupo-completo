import { ILevelEducation } from 'app/shared/model/level-education.model';
import { IWorkingDayCourse } from 'app/shared/model/working-day-course.model';

export interface ITrimester {
  id?: string;
  trimesterName?: number;
  trimesterState?: string | null;
  workingDayCourse?: IWorkingDayCourse;
  levelEducations?: ILevelEducation;
}

export const defaultValue: Readonly<ITrimester> = {};
