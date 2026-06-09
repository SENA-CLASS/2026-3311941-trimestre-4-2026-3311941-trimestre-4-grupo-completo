import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICurrentQuarter, NewCurrentQuarter } from '../current-quarter.model';

export type PartialUpdateCurrentQuarter = Partial<ICurrentQuarter> & Pick<ICurrentQuarter, 'id'>;

type RestOf<T extends ICurrentQuarter | NewCurrentQuarter> = Omit<T, 'startQuarter' | 'endQuarter'> & {
  startQuarter?: string | null;
  endQuarter?: string | null;
};

export type RestCurrentQuarter = RestOf<ICurrentQuarter>;

export type NewRestCurrentQuarter = RestOf<NewCurrentQuarter>;

export type PartialUpdateRestCurrentQuarter = RestOf<PartialUpdateCurrentQuarter>;

@Injectable()
export class CurrentQuartersService {
  readonly currentQuartersParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly currentQuartersResource = httpResource<RestCurrentQuarter[]>(() => {
    const params = this.currentQuartersParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of currentQuarter that have been fetched. It is updated when the currentQuartersResource emits a new value.
   * In case of error while fetching the currentQuarters, the signal is set to an empty array.
   */
  readonly currentQuarters = computed(() =>
    (this.currentQuartersResource.hasValue() ? this.currentQuartersResource.value() : []).map(item => this.convertValueFromServer(item)),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/current-quarters');

  protected convertValueFromServer(restCurrentQuarter: RestCurrentQuarter): ICurrentQuarter {
    return {
      ...restCurrentQuarter,
      startQuarter: restCurrentQuarter.startQuarter ? dayjs(restCurrentQuarter.startQuarter) : undefined,
      endQuarter: restCurrentQuarter.endQuarter ? dayjs(restCurrentQuarter.endQuarter) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class CurrentQuarterService extends CurrentQuartersService {
  protected readonly http = inject(HttpClient);

  create(currentQuarter: NewCurrentQuarter): Observable<ICurrentQuarter> {
    const copy = this.convertValueFromClient(currentQuarter);
    return this.http.post<RestCurrentQuarter>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(currentQuarter: ICurrentQuarter): Observable<ICurrentQuarter> {
    const copy = this.convertValueFromClient(currentQuarter);
    return this.http
      .put<RestCurrentQuarter>(`${this.resourceUrl}/${encodeURIComponent(this.getCurrentQuarterIdentifier(currentQuarter))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(currentQuarter: PartialUpdateCurrentQuarter): Observable<ICurrentQuarter> {
    const copy = this.convertValueFromClient(currentQuarter);
    return this.http
      .patch<RestCurrentQuarter>(`${this.resourceUrl}/${encodeURIComponent(this.getCurrentQuarterIdentifier(currentQuarter))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<ICurrentQuarter> {
    return this.http
      .get<RestCurrentQuarter>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<ICurrentQuarter[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestCurrentQuarter[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCurrentQuarterIdentifier(currentQuarter: Pick<ICurrentQuarter, 'id'>): string {
    return currentQuarter.id;
  }

  compareCurrentQuarter(o1: Pick<ICurrentQuarter, 'id'> | null, o2: Pick<ICurrentQuarter, 'id'> | null): boolean {
    return o1 && o2 ? this.getCurrentQuarterIdentifier(o1) === this.getCurrentQuarterIdentifier(o2) : o1 === o2;
  }

  addCurrentQuarterToCollectionIfMissing<Type extends Pick<ICurrentQuarter, 'id'>>(
    currentQuarterCollection: Type[],
    ...currentQuartersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const currentQuarters: Type[] = currentQuartersToCheck.filter(isPresent);
    if (currentQuarters.length > 0) {
      const currentQuarterCollectionIdentifiers = currentQuarterCollection.map(currentQuarterItem =>
        this.getCurrentQuarterIdentifier(currentQuarterItem),
      );
      const currentQuartersToAdd = currentQuarters.filter(currentQuarterItem => {
        const currentQuarterIdentifier = this.getCurrentQuarterIdentifier(currentQuarterItem);
        if (currentQuarterCollectionIdentifiers.includes(currentQuarterIdentifier)) {
          return false;
        }
        currentQuarterCollectionIdentifiers.push(currentQuarterIdentifier);
        return true;
      });
      return [...currentQuartersToAdd, ...currentQuarterCollection];
    }
    return currentQuarterCollection;
  }

  protected convertValueFromClient<T extends ICurrentQuarter | NewCurrentQuarter | PartialUpdateCurrentQuarter>(
    currentQuarter: T,
  ): RestOf<T> {
    return {
      ...currentQuarter,
      startQuarter: currentQuarter.startQuarter?.format(DATE_FORMAT) ?? null,
      endQuarter: currentQuarter.endQuarter?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertResponseFromServer(res: RestCurrentQuarter): ICurrentQuarter {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestCurrentQuarter[]): ICurrentQuarter[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
