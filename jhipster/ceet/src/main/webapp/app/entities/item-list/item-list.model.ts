import { ICheckList } from 'app/entities/check-list/check-list.model';
import { ILearningResult } from 'app/entities/learning-result/learning-result.model';

export interface IItemList {
  id: string;
  itemNumber?: number | null;
  question?: string | null;
  checkList?: Pick<ICheckList, 'id' | 'listName'> | null;
  learningResult?: Pick<ILearningResult, 'id'> | null;
}

export type NewItemList = Omit<IItemList, 'id'> & { id: null };
