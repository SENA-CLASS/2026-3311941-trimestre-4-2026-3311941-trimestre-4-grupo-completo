import { ICampus } from 'app/shared/model/campus.model';
import { IClassroomType } from 'app/shared/model/classroom-type.model';
import { Limitation } from 'app/shared/model/enumerations/limitation.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IClassroom {
  id?: string;
  classroomNumber?: string;
  classroomDescription?: string;
  classroomState?: keyof typeof State;
  limitation?: keyof typeof Limitation;
  classroomType?: IClassroomType;
  campus?: ICampus;
}

export const defaultValue: Readonly<IClassroom> = {};
