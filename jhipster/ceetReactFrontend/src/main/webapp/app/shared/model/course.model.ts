import dayjs from 'dayjs';

import { ICourseStatus } from 'app/shared/model/course-status.model';
import { ITrainingProgram } from 'app/shared/model/training-program.model';
import { IWorkingDayCourse } from 'app/shared/model/working-day-course.model';

export interface ICourse {
  id?: string;
  courseNumber?: string;
  startDate?: dayjs.Dayjs;
  endDate?: dayjs.Dayjs;
  route?: string;
  courseStatus?: ICourseStatus;
  workingDayCourse?: IWorkingDayCourse;
  trainingProgram?: ITrainingProgram;
}

export const defaultValue: Readonly<ICourse> = {};
