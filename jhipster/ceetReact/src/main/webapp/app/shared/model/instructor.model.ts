import { ICustomer } from 'app/shared/model/customer.model';
import { State } from 'app/shared/model/enumerations/state.model';

export interface IInstructor {
  id?: string;
  instructorState?: keyof typeof State;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IInstructor> = {};
