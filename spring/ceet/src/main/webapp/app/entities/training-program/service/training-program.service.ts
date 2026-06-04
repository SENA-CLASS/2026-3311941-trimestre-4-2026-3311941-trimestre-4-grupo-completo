import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ITrainingProgram, NewTrainingProgram } from '../training-program.model';

export type PartialUpdateTrainingProgram = Partial<ITrainingProgram> & Pick<ITrainingProgram, 'id'>;

@Injectable()
export class TrainingProgramsService {
  readonly trainingProgramsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly trainingProgramsResource = httpResource<ITrainingProgram[]>(() => {
    const params = this.trainingProgramsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of trainingProgram that have been fetched. It is updated when the trainingProgramsResource emits a new value.
   * In case of error while fetching the trainingPrograms, the signal is set to an empty array.
   */
  readonly trainingPrograms = computed(() => (this.trainingProgramsResource.hasValue() ? this.trainingProgramsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/training-programs');
}

@Injectable({ providedIn: 'root' })
export class TrainingProgramService extends TrainingProgramsService {
  protected readonly http = inject(HttpClient);

  create(trainingProgram: NewTrainingProgram): Observable<ITrainingProgram> {
    return this.http.post<ITrainingProgram>(this.resourceUrl, trainingProgram);
  }

  update(trainingProgram: ITrainingProgram): Observable<ITrainingProgram> {
    return this.http.put<ITrainingProgram>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTrainingProgramIdentifier(trainingProgram))}`,
      trainingProgram,
    );
  }

  partialUpdate(trainingProgram: PartialUpdateTrainingProgram): Observable<ITrainingProgram> {
    return this.http.patch<ITrainingProgram>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTrainingProgramIdentifier(trainingProgram))}`,
      trainingProgram,
    );
  }

  find(id: string): Observable<ITrainingProgram> {
    return this.http.get<ITrainingProgram>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITrainingProgram[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITrainingProgram[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getTrainingProgramIdentifier(trainingProgram: Pick<ITrainingProgram, 'id'>): string {
    return trainingProgram.id;
  }

  compareTrainingProgram(o1: Pick<ITrainingProgram, 'id'> | null, o2: Pick<ITrainingProgram, 'id'> | null): boolean {
    return o1 && o2 ? this.getTrainingProgramIdentifier(o1) === this.getTrainingProgramIdentifier(o2) : o1 === o2;
  }

  addTrainingProgramToCollectionIfMissing<Type extends Pick<ITrainingProgram, 'id'>>(
    trainingProgramCollection: Type[],
    ...trainingProgramsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const trainingPrograms: Type[] = trainingProgramsToCheck.filter(isPresent);
    if (trainingPrograms.length > 0) {
      const trainingProgramCollectionIdentifiers = trainingProgramCollection.map(trainingProgramItem =>
        this.getTrainingProgramIdentifier(trainingProgramItem),
      );
      const trainingProgramsToAdd = trainingPrograms.filter(trainingProgramItem => {
        const trainingProgramIdentifier = this.getTrainingProgramIdentifier(trainingProgramItem);
        if (trainingProgramCollectionIdentifiers.includes(trainingProgramIdentifier)) {
          return false;
        }
        trainingProgramCollectionIdentifiers.push(trainingProgramIdentifier);
        return true;
      });
      return [...trainingProgramsToAdd, ...trainingProgramCollection];
    }
    return trainingProgramCollection;
  }
}
