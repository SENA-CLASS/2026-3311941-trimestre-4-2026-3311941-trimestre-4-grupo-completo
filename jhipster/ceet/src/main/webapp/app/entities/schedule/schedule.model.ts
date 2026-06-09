import { IClassroom } from 'app/entities/classroom/classroom.model';
import { ICourseTrimester } from 'app/entities/course-trimester/course-trimester.model';
import { IDay } from 'app/entities/day/day.model';
import { IInstructor } from 'app/entities/instructor/instructor.model';
import { IModality } from 'app/entities/modality/modality.model';
import { IScheduleVersion } from 'app/entities/schedule-version/schedule-version.model';

export interface ISchedule {
  id: string;
  startTime?: string | null;
  endTime?: string | null;
  scheduleVersion?: Pick<IScheduleVersion, 'id'> | null;
  modality?: Pick<IModality, 'id' | 'modalityName'> | null;
  day?: Pick<IDay, 'id' | 'dayName'> | null;
  courseTrimester?: Pick<ICourseTrimester, 'id'> | null;
  classroom?: Pick<IClassroom, 'id'> | null;
  instructor?: Pick<IInstructor, 'id'> | null;
}

export type NewSchedule = Omit<ISchedule, 'id'> & { id: null };
