import { IArea } from 'app/shared/model/area.model';
import { State } from 'app/shared/model/enumerations/state.model';
import { IInstructor } from 'app/shared/model/instructor.model';

export interface IAreaInstructor {
  id?: string;
  areaInstructorState?: keyof typeof State;
  area?: IArea;
  instructor?: IInstructor;
}

export const defaultValue: Readonly<IAreaInstructor> = {};
