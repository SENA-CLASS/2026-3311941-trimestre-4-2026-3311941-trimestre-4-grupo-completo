import dayjs from 'dayjs';

import { ICustomer } from 'app/shared/model/customer.model';

export interface ILogAudit {
  id?: string;
  levelAudit?: string;
  logName?: string;
  messageAudit?: string;
  dateAudit?: dayjs.Dayjs;
  customer?: ICustomer;
}

export const defaultValue: Readonly<ILogAudit> = {};
