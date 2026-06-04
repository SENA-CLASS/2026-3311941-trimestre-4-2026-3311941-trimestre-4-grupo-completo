import { ICustomer, NewCustomer } from './customer.model';

export const sampleWithRequiredData: ICustomer = {
  id: '19b8383e-d98c-46a3-8d76-564685c2f646',
  documentNumber: 'nor now',
  firstName: 'Gabriel',
  fisrtLastName: 'yowza pfft',
};

export const sampleWithPartialData: ICustomer = {
  id: 'ab44fea9-7257-4592-be6a-f5fbfbdb8cec',
  documentNumber: 'slake lively',
  firstName: 'Enrique',
  fisrtLastName: 'pillory waver orient',
};

export const sampleWithFullData: ICustomer = {
  id: '2a28f31b-c244-4bdb-b70a-cf1c39753303',
  documentNumber: 'pace',
  firstName: 'Andrés',
  secondName: 'for',
  fisrtLastName: 'lender phew devoted',
  secondLastName: 'bakeware',
};

export const sampleWithNewData: NewCustomer = {
  documentNumber: 'thyme inasmuch',
  firstName: 'Norma',
  fisrtLastName: 'aw',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
