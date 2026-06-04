import { ILevelEducation } from 'app/entities/level-education/level-education.model';
import { IWorkingDayCourse } from 'app/entities/working-day-course/working-day-course.model';

export interface ITrimester {
  id: string;
  trimesterName?: number | null;
  trimesterState?: string | null;
  workingDayCourse?: Pick<IWorkingDayCourse, 'id' | 'workingDayName'> | null;
  levelEducations?: Pick<ILevelEducation, 'id' | 'levelName'> | null;
}

export type NewTrimester = Omit<ITrimester, 'id'> & { id: null };
