import { ILearningCompetence, NewLearningCompetence } from './learning-competence.model';

export const sampleWithRequiredData: ILearningCompetence = {
  id: '794b6a13-56c7-472c-acf2-d849af0be09c',
  competenceCode: 'analyse',
  competitionDenomination: 'fully however',
};

export const sampleWithPartialData: ILearningCompetence = {
  id: '42ff1bd0-5ddf-4684-8116-8909df1041c8',
  competenceCode: 'rapidly fairly',
  competitionDenomination: 'bah',
};

export const sampleWithFullData: ILearningCompetence = {
  id: 'a3747aa0-cd43-42c9-a6f1-f9156e827a1c',
  competenceCode: 'supposing',
  competitionDenomination: 'noxious rapidly grouper',
};

export const sampleWithNewData: NewLearningCompetence = {
  competenceCode: 'um',
  competitionDenomination: 'round ack unless',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
