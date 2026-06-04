import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IDay, NewDay } from '../day.model';

export type PartialUpdateDay = Partial<IDay> & Pick<IDay, 'id'>;

@Injectable()
export class DaysService {
  readonly daysParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(undefined);
  readonly daysResource = httpResource<IDay[]>(() => {
    const params = this.daysParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of day that have been fetched. It is updated when the daysResource emits a new value.
   * In case of error while fetching the days, the signal is set to an empty array.
   */
  readonly days = computed(() => (this.daysResource.hasValue() ? this.daysResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/days');
}

@Injectable({ providedIn: 'root' })
export class DayService extends DaysService {
  protected readonly http = inject(HttpClient);

  create(day: NewDay): Observable<IDay> {
    return this.http.post<IDay>(this.resourceUrl, day);
  }

  update(day: IDay): Observable<IDay> {
    return this.http.put<IDay>(`${this.resourceUrl}/${encodeURIComponent(this.getDayIdentifier(day))}`, day);
  }

  partialUpdate(day: PartialUpdateDay): Observable<IDay> {
    return this.http.patch<IDay>(`${this.resourceUrl}/${encodeURIComponent(this.getDayIdentifier(day))}`, day);
  }

  find(id: string): Observable<IDay> {
    return this.http.get<IDay>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IDay[]>> {
    const options = createRequestOption(req);
    return this.http.get<IDay[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getDayIdentifier(day: Pick<IDay, 'id'>): string {
    return day.id;
  }

  compareDay(o1: Pick<IDay, 'id'> | null, o2: Pick<IDay, 'id'> | null): boolean {
    return o1 && o2 ? this.getDayIdentifier(o1) === this.getDayIdentifier(o2) : o1 === o2;
  }

  addDayToCollectionIfMissing<Type extends Pick<IDay, 'id'>>(dayCollection: Type[], ...daysToCheck: (Type | null | undefined)[]): Type[] {
    const days: Type[] = daysToCheck.filter(isPresent);
    if (days.length > 0) {
      const dayCollectionIdentifiers = dayCollection.map(dayItem => this.getDayIdentifier(dayItem));
      const daysToAdd = days.filter(dayItem => {
        const dayIdentifier = this.getDayIdentifier(dayItem);
        if (dayCollectionIdentifiers.includes(dayIdentifier)) {
          return false;
        }
        dayCollectionIdentifiers.push(dayIdentifier);
        return true;
      });
      return [...daysToAdd, ...dayCollection];
    }
    return dayCollection;
  }
}
