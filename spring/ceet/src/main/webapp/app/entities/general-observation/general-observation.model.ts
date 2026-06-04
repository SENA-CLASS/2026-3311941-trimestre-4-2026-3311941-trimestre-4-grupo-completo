import dayjs from 'dayjs/esm';

import { ICustomer } from 'app/entities/customer/customer.model';
import { IProjectGroup } from 'app/entities/project-group/project-group.model';

export interface IGeneralObservation {
  id: string;
  number?: number | null;
  observationGeneral?: string | null;
  jury?: string | null;
  dateAudit?: dayjs.Dayjs | null;
  projectGroup?: Pick<IProjectGroup, 'id'> | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewGeneralObservation = Omit<IGeneralObservation, 'id'> & { id: null };
