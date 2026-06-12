import dayjs from 'dayjs';

import { ICustomer } from 'app/shared/model/customer.model';
import { IGroupResponse } from 'app/shared/model/group-response.model';

export interface IObservationResponse {
  id?: string;
  numberObservation?: number;
  obsevation?: string;
  juries?: string;
  dateObservation?: dayjs.Dayjs;
  groupResponse?: IGroupResponse;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IObservationResponse> = {};
