import { IClassroom } from 'app/shared/model/classroom.model';
import { ICourseTrimester } from 'app/shared/model/course-trimester.model';
import { IDay } from 'app/shared/model/day.model';
import { IInstructor } from 'app/shared/model/instructor.model';
import { IModality } from 'app/shared/model/modality.model';
import { IScheduleVersion } from 'app/shared/model/schedule-version.model';

export interface ISchedule {
  id?: string;
  startTime?: string;
  endTime?: string;
  scheduleVersion?: IScheduleVersion;
  modality?: IModality;
  day?: IDay;
  courseTrimester?: ICourseTrimester;
  classroom?: IClassroom;
  instructor?: IInstructor;
}

export const defaultValue: Readonly<ISchedule> = {};
