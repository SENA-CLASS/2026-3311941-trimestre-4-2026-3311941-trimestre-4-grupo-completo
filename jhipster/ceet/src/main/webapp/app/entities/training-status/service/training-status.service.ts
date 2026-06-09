import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ITrainingStatus, NewTrainingStatus } from '../training-status.model';

export type PartialUpdateTrainingStatus = Partial<ITrainingStatus> & Pick<ITrainingStatus, 'id'>;

@Injectable()
export class TrainingStatusesService {
  readonly trainingStatusesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly trainingStatusesResource = httpResource<ITrainingStatus[]>(() => {
    const params = this.trainingStatusesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of trainingStatus that have been fetched. It is updated when the trainingStatusesResource emits a new value.
   * In case of error while fetching the trainingStatuses, the signal is set to an empty array.
   */
  readonly trainingStatuses = computed(() => (this.trainingStatusesResource.hasValue() ? this.trainingStatusesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/training-statuses');
}

@Injectable({ providedIn: 'root' })
export class TrainingStatusService extends TrainingStatusesService {
  protected readonly http = inject(HttpClient);

  create(trainingStatus: NewTrainingStatus): Observable<ITrainingStatus> {
    return this.http.post<ITrainingStatus>(this.resourceUrl, trainingStatus);
  }

  update(trainingStatus: ITrainingStatus): Observable<ITrainingStatus> {
    return this.http.put<ITrainingStatus>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTrainingStatusIdentifier(trainingStatus))}`,
      trainingStatus,
    );
  }

  partialUpdate(trainingStatus: PartialUpdateTrainingStatus): Observable<ITrainingStatus> {
    return this.http.patch<ITrainingStatus>(
      `${this.resourceUrl}/${encodeURIComponent(this.getTrainingStatusIdentifier(trainingStatus))}`,
      trainingStatus,
    );
  }

  find(id: string): Observable<ITrainingStatus> {
    return this.http.get<ITrainingStatus>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITrainingStatus[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITrainingStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getTrainingStatusIdentifier(trainingStatus: Pick<ITrainingStatus, 'id'>): string {
    return trainingStatus.id;
  }

  compareTrainingStatus(o1: Pick<ITrainingStatus, 'id'> | null, o2: Pick<ITrainingStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getTrainingStatusIdentifier(o1) === this.getTrainingStatusIdentifier(o2) : o1 === o2;
  }

  addTrainingStatusToCollectionIfMissing<Type extends Pick<ITrainingStatus, 'id'>>(
    trainingStatusCollection: Type[],
    ...trainingStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const trainingStatuses: Type[] = trainingStatusesToCheck.filter(isPresent);
    if (trainingStatuses.length > 0) {
      const trainingStatusCollectionIdentifiers = trainingStatusCollection.map(trainingStatusItem =>
        this.getTrainingStatusIdentifier(trainingStatusItem),
      );
      const trainingStatusesToAdd = trainingStatuses.filter(trainingStatusItem => {
        const trainingStatusIdentifier = this.getTrainingStatusIdentifier(trainingStatusItem);
        if (trainingStatusCollectionIdentifiers.includes(trainingStatusIdentifier)) {
          return false;
        }
        trainingStatusCollectionIdentifiers.push(trainingStatusIdentifier);
        return true;
      });
      return [...trainingStatusesToAdd, ...trainingStatusCollection];
    }
    return trainingStatusCollection;
  }
}
