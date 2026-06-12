import { IProjectActivity } from 'app/shared/model/project-activity.model';
import { IQuarterSchedule } from 'app/shared/model/quarter-schedule.model';

export interface IPlanningActivity {
  id?: string;
  quarterSchedule?: IQuarterSchedule;
  projectActivity?: IProjectActivity;
}

export const defaultValue: Readonly<IPlanningActivity> = {};
