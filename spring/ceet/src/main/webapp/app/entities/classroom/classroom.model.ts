import { ICampus } from 'app/entities/campus/campus.model';
import { IClassroomType } from 'app/entities/classroom-type/classroom-type.model';
import { Limitation } from 'app/entities/enumerations/limitation.model';
import { State } from 'app/entities/enumerations/state.model';

export interface IClassroom {
  id: string;
  classroomNumber?: string | null;
  classroomDescription?: string | null;
  classroomState?: keyof typeof State | null;
  limitation?: keyof typeof Limitation | null;
  classroomType?: Pick<IClassroomType, 'id' | 'typeClassroom'> | null;
  campus?: Pick<ICampus, 'id' | 'campusName'> | null;
}

export type NewClassroom = Omit<IClassroom, 'id'> & { id: null };
