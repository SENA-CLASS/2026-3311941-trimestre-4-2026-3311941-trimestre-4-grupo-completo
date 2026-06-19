import dayjs from 'dayjs';

import { ICustomer } from 'app/shared/model/customer.model';
import { IProjectGroup } from 'app/shared/model/project-group.model';

export interface IGeneralObservation {
  id?: string;
  number?: number;
  observationGeneral?: string;
  jury?: string;
  dateAudit?: dayjs.Dayjs;
  projectGroup?: IProjectGroup;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IGeneralObservation> = {};
