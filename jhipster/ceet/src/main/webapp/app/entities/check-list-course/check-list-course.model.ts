import { ICheckList } from 'app/entities/check-list/check-list.model';
import { ICourse } from 'app/entities/course/course.model';
import { State } from 'app/entities/enumerations/state.model';

export interface ICheckListCourse {
  id: string;
  checkListState?: keyof typeof State | null;
  course?: Pick<ICourse, 'id'> | null;
  checkList?: Pick<ICheckList, 'id'> | null;
}

export type NewCheckListCourse = Omit<ICheckListCourse, 'id'> & { id: null };
