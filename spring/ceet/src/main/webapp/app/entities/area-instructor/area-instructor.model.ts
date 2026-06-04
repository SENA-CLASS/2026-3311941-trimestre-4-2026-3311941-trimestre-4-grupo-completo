import { IArea } from 'app/entities/area/area.model';
import { State } from 'app/entities/enumerations/state.model';
import { IInstructor } from 'app/entities/instructor/instructor.model';

export interface IAreaInstructor {
  id: string;
  areaInstructorState?: keyof typeof State | null;
  area?: Pick<IArea, 'id' | 'areaName'> | null;
  instructor?: Pick<IInstructor, 'id'> | null;
}

export type NewAreaInstructor = Omit<IAreaInstructor, 'id'> & { id: null };
