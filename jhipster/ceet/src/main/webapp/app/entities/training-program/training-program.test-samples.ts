import { ITrainingProgram, NewTrainingProgram } from './training-program.model';

export const sampleWithRequiredData: ITrainingProgram = {
  id: 'fcaabca7-bdd5-44ad-a08f-55890cc0fbe8',
  programCode: 'correctly couch veto',
  programVersion: 'quarrelsome',
  programName: 'source without',
  programInitials: 'considering than boldly',
  programState: 'EXECUTION',
};

export const sampleWithPartialData: ITrainingProgram = {
  id: '441dc7d6-57f0-4bb0-8225-d937faf84caa',
  programCode: 'median whereas',
  programVersion: 'provided',
  programName: 'madly whenever gee',
  programInitials: 'castanet so until',
  programState: 'DISCONTINUED',
};

export const sampleWithFullData: ITrainingProgram = {
  id: '99b52b68-86a2-40ad-984f-9eddb4449734',
  programCode: 'willing yowza',
  programVersion: 'whoa uh-huh',
  programName: 'oval bah',
  programInitials: 'masculinize sand skateboard',
  programState: 'EXECUTION',
};

export const sampleWithNewData: NewTrainingProgram = {
  programCode: 'huzzah',
  programVersion: 'hence',
  programName: 'punctually vainly',
  programInitials: 'untrue hmph',
  programState: 'EXECUTION',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
