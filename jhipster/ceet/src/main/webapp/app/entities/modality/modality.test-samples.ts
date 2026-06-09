import { IModality, NewModality } from './modality.model';

export const sampleWithRequiredData: IModality = {
  id: '32012915-2010-4526-a03c-14169186c0f8',
  modalityName: 'carelessly shocked',
  modalityColor: 'apropos glaring',
  modalityState: 'INACTIVE',
};

export const sampleWithPartialData: IModality = {
  id: 'd5331343-d78f-46df-b6d7-9670c54113f9',
  modalityName: 'plus unabashedly',
  modalityColor: 'reword',
  modalityState: 'INACTIVE',
};

export const sampleWithFullData: IModality = {
  id: '5361e6ae-36a6-4c7f-8df6-fd181c609cba',
  modalityName: 'yuck',
  modalityColor: 'polished into',
  modalityState: 'INACTIVE',
};

export const sampleWithNewData: NewModality = {
  modalityName: 'nerve jell old-fashioned',
  modalityColor: 'roger',
  modalityState: 'ACTIVE',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
