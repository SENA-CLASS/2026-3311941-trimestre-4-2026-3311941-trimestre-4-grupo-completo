import { IProjectActivity } from 'app/entities/project-activity/project-activity.model';
import { IQuarterSchedule } from 'app/entities/quarter-schedule/quarter-schedule.model';

export interface IPlanningActivity {
  id: string;
  quarterSchedule?: Pick<IQuarterSchedule, 'id'> | null;
  projectActivity?: Pick<IProjectActivity, 'id'> | null;
}

export type NewPlanningActivity = Omit<IPlanningActivity, 'id'> & { id: null };
