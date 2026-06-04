import dayjs from 'dayjs/esm';

import { ICourseStatus } from 'app/entities/course-status/course-status.model';
import { ITrainingProgram } from 'app/entities/training-program/training-program.model';
import { IWorkingDayCourse } from 'app/entities/working-day-course/working-day-course.model';

export interface ICourse {
  id: string;
  courseNumber?: string | null;
  startDate?: dayjs.Dayjs | null;
  endDate?: dayjs.Dayjs | null;
  route?: string | null;
  courseStatus?: Pick<ICourseStatus, 'id' | 'nameCourseStatus'> | null;
  workingDayCourse?: Pick<IWorkingDayCourse, 'id' | 'workingDayName'> | null;
  trainingProgram?: Pick<ITrainingProgram, 'id'> | null;
}

export type NewCourse = Omit<ICourse, 'id'> & { id: null };
