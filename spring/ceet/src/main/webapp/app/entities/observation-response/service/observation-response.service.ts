import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IObservationResponse, NewObservationResponse } from '../observation-response.model';

export type PartialUpdateObservationResponse = Partial<IObservationResponse> & Pick<IObservationResponse, 'id'>;

type RestOf<T extends IObservationResponse | NewObservationResponse> = Omit<T, 'dateObservation'> & {
  dateObservation?: string | null;
};

export type RestObservationResponse = RestOf<IObservationResponse>;

export type NewRestObservationResponse = RestOf<NewObservationResponse>;

export type PartialUpdateRestObservationResponse = RestOf<PartialUpdateObservationResponse>;

@Injectable()
export class ObservationResponsesService {
  readonly observationResponsesParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly observationResponsesResource = httpResource<RestObservationResponse[]>(() => {
    const params = this.observationResponsesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of observationResponse that have been fetched. It is updated when the observationResponsesResource emits a new value.
   * In case of error while fetching the observationResponses, the signal is set to an empty array.
   */
  readonly observationResponses = computed(() =>
    (this.observationResponsesResource.hasValue() ? this.observationResponsesResource.value() : []).map(item =>
      this.convertValueFromServer(item),
    ),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/observation-responses');

  protected convertValueFromServer(restObservationResponse: RestObservationResponse): IObservationResponse {
    return {
      ...restObservationResponse,
      dateObservation: restObservationResponse.dateObservation ? dayjs(restObservationResponse.dateObservation) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class ObservationResponseService extends ObservationResponsesService {
  protected readonly http = inject(HttpClient);

  create(observationResponse: NewObservationResponse): Observable<IObservationResponse> {
    const copy = this.convertValueFromClient(observationResponse);
    return this.http.post<RestObservationResponse>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(observationResponse: IObservationResponse): Observable<IObservationResponse> {
    const copy = this.convertValueFromClient(observationResponse);
    return this.http
      .put<RestObservationResponse>(
        `${this.resourceUrl}/${encodeURIComponent(this.getObservationResponseIdentifier(observationResponse))}`,
        copy,
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(observationResponse: PartialUpdateObservationResponse): Observable<IObservationResponse> {
    const copy = this.convertValueFromClient(observationResponse);
    return this.http
      .patch<RestObservationResponse>(
        `${this.resourceUrl}/${encodeURIComponent(this.getObservationResponseIdentifier(observationResponse))}`,
        copy,
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<IObservationResponse> {
    return this.http
      .get<RestObservationResponse>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IObservationResponse[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestObservationResponse[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getObservationResponseIdentifier(observationResponse: Pick<IObservationResponse, 'id'>): string {
    return observationResponse.id;
  }

  compareObservationResponse(o1: Pick<IObservationResponse, 'id'> | null, o2: Pick<IObservationResponse, 'id'> | null): boolean {
    return o1 && o2 ? this.getObservationResponseIdentifier(o1) === this.getObservationResponseIdentifier(o2) : o1 === o2;
  }

  addObservationResponseToCollectionIfMissing<Type extends Pick<IObservationResponse, 'id'>>(
    observationResponseCollection: Type[],
    ...observationResponsesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const observationResponses: Type[] = observationResponsesToCheck.filter(isPresent);
    if (observationResponses.length > 0) {
      const observationResponseCollectionIdentifiers = observationResponseCollection.map(observationResponseItem =>
        this.getObservationResponseIdentifier(observationResponseItem),
      );
      const observationResponsesToAdd = observationResponses.filter(observationResponseItem => {
        const observationResponseIdentifier = this.getObservationResponseIdentifier(observationResponseItem);
        if (observationResponseCollectionIdentifiers.includes(observationResponseIdentifier)) {
          return false;
        }
        observationResponseCollectionIdentifiers.push(observationResponseIdentifier);
        return true;
      });
      return [...observationResponsesToAdd, ...observationResponseCollection];
    }
    return observationResponseCollection;
  }

  protected convertValueFromClient<T extends IObservationResponse | NewObservationResponse | PartialUpdateObservationResponse>(
    observationResponse: T,
  ): RestOf<T> {
    return {
      ...observationResponse,
      dateObservation: observationResponse.dateObservation?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestObservationResponse): IObservationResponse {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestObservationResponse[]): IObservationResponse[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
