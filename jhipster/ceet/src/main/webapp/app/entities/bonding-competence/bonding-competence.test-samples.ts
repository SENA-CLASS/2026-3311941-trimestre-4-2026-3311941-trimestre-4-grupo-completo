import { IBondingCompetence, NewBondingCompetence } from './bonding-competence.model';

export const sampleWithRequiredData: IBondingCompetence = {
  id: '63a609c8-5776-482e-a749-9b843c9318c9',
};

export const sampleWithPartialData: IBondingCompetence = {
  id: 'ab2bfde8-60c2-42fd-a4c7-614b3ac8004e',
};

export const sampleWithFullData: IBondingCompetence = {
  id: '4b217ee6-cf63-4369-b7c1-e69c5eb5bcd0',
};

export const sampleWithNewData: NewBondingCompetence = {
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
