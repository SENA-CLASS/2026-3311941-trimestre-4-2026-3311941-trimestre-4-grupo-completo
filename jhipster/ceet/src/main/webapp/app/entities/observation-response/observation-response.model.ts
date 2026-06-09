import dayjs from 'dayjs/esm';

import { ICustomer } from 'app/entities/customer/customer.model';
import { IGroupResponse } from 'app/entities/group-response/group-response.model';

export interface IObservationResponse {
  id: string;
  numberObservation?: number | null;
  obsevation?: string | null;
  juries?: string | null;
  dateObservation?: dayjs.Dayjs | null;
  groupResponse?: Pick<IGroupResponse, 'id'> | null;
  customer?: Pick<ICustomer, 'id'> | null;
}

export type NewObservationResponse = Omit<IObservationResponse, 'id'> & { id: null };
