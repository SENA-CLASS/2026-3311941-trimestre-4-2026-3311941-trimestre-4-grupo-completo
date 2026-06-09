import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IGeneralObservation, NewGeneralObservation } from '../general-observation.model';

export type PartialUpdateGeneralObservation = Partial<IGeneralObservation> & Pick<IGeneralObservation, 'id'>;

type RestOf<T extends IGeneralObservation | NewGeneralObservation> = Omit<T, 'dateAudit'> & {
  dateAudit?: string | null;
};

export type RestGeneralObservation = RestOf<IGeneralObservation>;

export type NewRestGeneralObservation = RestOf<NewGeneralObservation>;

export type PartialUpdateRestGeneralObservation = RestOf<PartialUpdateGeneralObservation>;

@Injectable()
export class GeneralObservationsService {
  readonly generalObservationsParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly generalObservationsResource = httpResource<RestGeneralObservation[]>(() => {
    const params = this.generalObservationsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of generalObservation that have been fetched. It is updated when the generalObservationsResource emits a new value.
   * In case of error while fetching the generalObservations, the signal is set to an empty array.
   */
  readonly generalObservations = computed(() =>
    (this.generalObservationsResource.hasValue() ? this.generalObservationsResource.value() : []).map(item =>
      this.convertValueFromServer(item),
    ),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/general-observations');

  protected convertValueFromServer(restGeneralObservation: RestGeneralObservation): IGeneralObservation {
    return {
      ...restGeneralObservation,
      dateAudit: restGeneralObservation.dateAudit ? dayjs(restGeneralObservation.dateAudit) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class GeneralObservationService extends GeneralObservationsService {
  protected readonly http = inject(HttpClient);

  create(generalObservation: NewGeneralObservation): Observable<IGeneralObservation> {
    const copy = this.convertValueFromClient(generalObservation);
    return this.http.post<RestGeneralObservation>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(generalObservation: IGeneralObservation): Observable<IGeneralObservation> {
    const copy = this.convertValueFromClient(generalObservation);
    return this.http
      .put<RestGeneralObservation>(
        `${this.resourceUrl}/${encodeURIComponent(this.getGeneralObservationIdentifier(generalObservation))}`,
        copy,
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(generalObservation: PartialUpdateGeneralObservation): Observable<IGeneralObservation> {
    const copy = this.convertValueFromClient(generalObservation);
    return this.http
      .patch<RestGeneralObservation>(
        `${this.resourceUrl}/${encodeURIComponent(this.getGeneralObservationIdentifier(generalObservation))}`,
        copy,
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<IGeneralObservation> {
    return this.http
      .get<RestGeneralObservation>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IGeneralObservation[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestGeneralObservation[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getGeneralObservationIdentifier(generalObservation: Pick<IGeneralObservation, 'id'>): string {
    return generalObservation.id;
  }

  compareGeneralObservation(o1: Pick<IGeneralObservation, 'id'> | null, o2: Pick<IGeneralObservation, 'id'> | null): boolean {
    return o1 && o2 ? this.getGeneralObservationIdentifier(o1) === this.getGeneralObservationIdentifier(o2) : o1 === o2;
  }

  addGeneralObservationToCollectionIfMissing<Type extends Pick<IGeneralObservation, 'id'>>(
    generalObservationCollection: Type[],
    ...generalObservationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const generalObservations: Type[] = generalObservationsToCheck.filter(isPresent);
    if (generalObservations.length > 0) {
      const generalObservationCollectionIdentifiers = generalObservationCollection.map(generalObservationItem =>
        this.getGeneralObservationIdentifier(generalObservationItem),
      );
      const generalObservationsToAdd = generalObservations.filter(generalObservationItem => {
        const generalObservationIdentifier = this.getGeneralObservationIdentifier(generalObservationItem);
        if (generalObservationCollectionIdentifiers.includes(generalObservationIdentifier)) {
          return false;
        }
        generalObservationCollectionIdentifiers.push(generalObservationIdentifier);
        return true;
      });
      return [...generalObservationsToAdd, ...generalObservationCollection];
    }
    return generalObservationCollection;
  }

  protected convertValueFromClient<T extends IGeneralObservation | NewGeneralObservation | PartialUpdateGeneralObservation>(
    generalObservation: T,
  ): RestOf<T> {
    return {
      ...generalObservation,
      dateAudit: generalObservation.dateAudit?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestGeneralObservation): IGeneralObservation {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestGeneralObservation[]): IGeneralObservation[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
