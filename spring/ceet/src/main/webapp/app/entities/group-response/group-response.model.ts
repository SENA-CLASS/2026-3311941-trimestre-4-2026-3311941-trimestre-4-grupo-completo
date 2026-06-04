import dayjs from 'dayjs/esm';

import { IAssessment } from 'app/entities/assessment/assessment.model';
import { IItemList } from 'app/entities/item-list/item-list.model';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';

export interface IGroupResponse {
  id: string;
  evaluationDate?: dayjs.Dayjs | null;
  projectGroup?: Pick<IProjectGroup, 'id'> | null;
  assessment?: Pick<IAssessment, 'id' | 'assessmentType'> | null;
  itemList?: Pick<IItemList, 'id'> | null;
}

export type NewGroupResponse = Omit<IGroupResponse, 'id'> & { id: null };
