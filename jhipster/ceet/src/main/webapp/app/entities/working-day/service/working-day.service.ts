import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IWorkingDay, NewWorkingDay } from '../working-day.model';

export type PartialUpdateWorkingDay = Partial<IWorkingDay> & Pick<IWorkingDay, 'id'>;

@Injectable()
export class WorkingDaysService {
  readonly workingDaysParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly workingDaysResource = httpResource<IWorkingDay[]>(() => {
    const params = this.workingDaysParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of workingDay that have been fetched. It is updated when the workingDaysResource emits a new value.
   * In case of error while fetching the workingDays, the signal is set to an empty array.
   */
  readonly workingDays = computed(() => (this.workingDaysResource.hasValue() ? this.workingDaysResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/working-days');
}

@Injectable({ providedIn: 'root' })
export class WorkingDayService extends WorkingDaysService {
  protected readonly http = inject(HttpClient);

  create(workingDay: NewWorkingDay): Observable<IWorkingDay> {
    return this.http.post<IWorkingDay>(this.resourceUrl, workingDay);
  }

  update(workingDay: IWorkingDay): Observable<IWorkingDay> {
    return this.http.put<IWorkingDay>(`${this.resourceUrl}/${encodeURIComponent(this.getWorkingDayIdentifier(workingDay))}`, workingDay);
  }

  partialUpdate(workingDay: PartialUpdateWorkingDay): Observable<IWorkingDay> {
    return this.http.patch<IWorkingDay>(`${this.resourceUrl}/${encodeURIComponent(this.getWorkingDayIdentifier(workingDay))}`, workingDay);
  }

  find(id: string): Observable<IWorkingDay> {
    return this.http.get<IWorkingDay>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IWorkingDay[]>> {
    const options = createRequestOption(req);
    return this.http.get<IWorkingDay[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getWorkingDayIdentifier(workingDay: Pick<IWorkingDay, 'id'>): string {
    return workingDay.id;
  }

  compareWorkingDay(o1: Pick<IWorkingDay, 'id'> | null, o2: Pick<IWorkingDay, 'id'> | null): boolean {
    return o1 && o2 ? this.getWorkingDayIdentifier(o1) === this.getWorkingDayIdentifier(o2) : o1 === o2;
  }

  addWorkingDayToCollectionIfMissing<Type extends Pick<IWorkingDay, 'id'>>(
    workingDayCollection: Type[],
    ...workingDaysToCheck: (Type | null | undefined)[]
  ): Type[] {
    const workingDays: Type[] = workingDaysToCheck.filter(isPresent);
    if (workingDays.length > 0) {
      const workingDayCollectionIdentifiers = workingDayCollection.map(workingDayItem => this.getWorkingDayIdentifier(workingDayItem));
      const workingDaysToAdd = workingDays.filter(workingDayItem => {
        const workingDayIdentifier = this.getWorkingDayIdentifier(workingDayItem);
        if (workingDayCollectionIdentifiers.includes(workingDayIdentifier)) {
          return false;
        }
        workingDayCollectionIdentifiers.push(workingDayIdentifier);
        return true;
      });
      return [...workingDaysToAdd, ...workingDayCollection];
    }
    return workingDayCollection;
  }
}
