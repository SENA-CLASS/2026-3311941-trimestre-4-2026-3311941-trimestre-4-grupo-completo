import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IYear, NewYear } from '../year.model';

export type PartialUpdateYear = Partial<IYear> & Pick<IYear, 'id'>;

@Injectable()
export class YearsService {
  readonly yearsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(undefined);
  readonly yearsResource = httpResource<IYear[]>(() => {
    const params = this.yearsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of year that have been fetched. It is updated when the yearsResource emits a new value.
   * In case of error while fetching the years, the signal is set to an empty array.
   */
  readonly years = computed(() => (this.yearsResource.hasValue() ? this.yearsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/years');
}

@Injectable({ providedIn: 'root' })
export class YearService extends YearsService {
  protected readonly http = inject(HttpClient);

  create(year: NewYear): Observable<IYear> {
    return this.http.post<IYear>(this.resourceUrl, year);
  }

  update(year: IYear): Observable<IYear> {
    return this.http.put<IYear>(`${this.resourceUrl}/${encodeURIComponent(this.getYearIdentifier(year))}`, year);
  }

  partialUpdate(year: PartialUpdateYear): Observable<IYear> {
    return this.http.patch<IYear>(`${this.resourceUrl}/${encodeURIComponent(this.getYearIdentifier(year))}`, year);
  }

  find(id: string): Observable<IYear> {
    return this.http.get<IYear>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IYear[]>> {
    const options = createRequestOption(req);
    return this.http.get<IYear[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getYearIdentifier(year: Pick<IYear, 'id'>): string {
    return year.id;
  }

  compareYear(o1: Pick<IYear, 'id'> | null, o2: Pick<IYear, 'id'> | null): boolean {
    return o1 && o2 ? this.getYearIdentifier(o1) === this.getYearIdentifier(o2) : o1 === o2;
  }

  addYearToCollectionIfMissing<Type extends Pick<IYear, 'id'>>(
    yearCollection: Type[],
    ...yearsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const years: Type[] = yearsToCheck.filter(isPresent);
    if (years.length > 0) {
      const yearCollectionIdentifiers = yearCollection.map(yearItem => this.getYearIdentifier(yearItem));
      const yearsToAdd = years.filter(yearItem => {
        const yearIdentifier = this.getYearIdentifier(yearItem);
        if (yearCollectionIdentifiers.includes(yearIdentifier)) {
          return false;
        }
        yearCollectionIdentifiers.push(yearIdentifier);
        return true;
      });
      return [...yearsToAdd, ...yearCollection];
    }
    return yearCollection;
  }
}
