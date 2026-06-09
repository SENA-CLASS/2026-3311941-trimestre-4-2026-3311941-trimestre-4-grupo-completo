import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ITrimester, NewTrimester } from '../trimester.model';

export type PartialUpdateTrimester = Partial<ITrimester> & Pick<ITrimester, 'id'>;

@Injectable()
export class TrimestersService {
  readonly trimestersParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly trimestersResource = httpResource<ITrimester[]>(() => {
    const params = this.trimestersParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of trimester that have been fetched. It is updated when the trimestersResource emits a new value.
   * In case of error while fetching the trimesters, the signal is set to an empty array.
   */
  readonly trimesters = computed(() => (this.trimestersResource.hasValue() ? this.trimestersResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/trimesters');
}

@Injectable({ providedIn: 'root' })
export class TrimesterService extends TrimestersService {
  protected readonly http = inject(HttpClient);

  create(trimester: NewTrimester): Observable<ITrimester> {
    return this.http.post<ITrimester>(this.resourceUrl, trimester);
  }

  update(trimester: ITrimester): Observable<ITrimester> {
    return this.http.put<ITrimester>(`${this.resourceUrl}/${encodeURIComponent(this.getTrimesterIdentifier(trimester))}`, trimester);
  }

  partialUpdate(trimester: PartialUpdateTrimester): Observable<ITrimester> {
    return this.http.patch<ITrimester>(`${this.resourceUrl}/${encodeURIComponent(this.getTrimesterIdentifier(trimester))}`, trimester);
  }

  find(id: string): Observable<ITrimester> {
    return this.http.get<ITrimester>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ITrimester[]>> {
    const options = createRequestOption(req);
    return this.http.get<ITrimester[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getTrimesterIdentifier(trimester: Pick<ITrimester, 'id'>): string {
    return trimester.id;
  }

  compareTrimester(o1: Pick<ITrimester, 'id'> | null, o2: Pick<ITrimester, 'id'> | null): boolean {
    return o1 && o2 ? this.getTrimesterIdentifier(o1) === this.getTrimesterIdentifier(o2) : o1 === o2;
  }

  addTrimesterToCollectionIfMissing<Type extends Pick<ITrimester, 'id'>>(
    trimesterCollection: Type[],
    ...trimestersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const trimesters: Type[] = trimestersToCheck.filter(isPresent);
    if (trimesters.length > 0) {
      const trimesterCollectionIdentifiers = trimesterCollection.map(trimesterItem => this.getTrimesterIdentifier(trimesterItem));
      const trimestersToAdd = trimesters.filter(trimesterItem => {
        const trimesterIdentifier = this.getTrimesterIdentifier(trimesterItem);
        if (trimesterCollectionIdentifiers.includes(trimesterIdentifier)) {
          return false;
        }
        trimesterCollectionIdentifiers.push(trimesterIdentifier);
        return true;
      });
      return [...trimestersToAdd, ...trimesterCollection];
    }
    return trimesterCollection;
  }
}
