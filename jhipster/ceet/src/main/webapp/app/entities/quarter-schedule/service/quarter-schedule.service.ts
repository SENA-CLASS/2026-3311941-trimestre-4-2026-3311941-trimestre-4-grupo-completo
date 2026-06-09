import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IQuarterSchedule, NewQuarterSchedule } from '../quarter-schedule.model';

export type PartialUpdateQuarterSchedule = Partial<IQuarterSchedule> & Pick<IQuarterSchedule, 'id'>;

@Injectable()
export class QuarterSchedulesService {
  readonly quarterSchedulesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly quarterSchedulesResource = httpResource<IQuarterSchedule[]>(() => {
    const params = this.quarterSchedulesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of quarterSchedule that have been fetched. It is updated when the quarterSchedulesResource emits a new value.
   * In case of error while fetching the quarterSchedules, the signal is set to an empty array.
   */
  readonly quarterSchedules = computed(() => (this.quarterSchedulesResource.hasValue() ? this.quarterSchedulesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/quarter-schedules');
}

@Injectable({ providedIn: 'root' })
export class QuarterScheduleService extends QuarterSchedulesService {
  protected readonly http = inject(HttpClient);

  create(quarterSchedule: NewQuarterSchedule): Observable<IQuarterSchedule> {
    return this.http.post<IQuarterSchedule>(this.resourceUrl, quarterSchedule);
  }

  update(quarterSchedule: IQuarterSchedule): Observable<IQuarterSchedule> {
    return this.http.put<IQuarterSchedule>(
      `${this.resourceUrl}/${encodeURIComponent(this.getQuarterScheduleIdentifier(quarterSchedule))}`,
      quarterSchedule,
    );
  }

  partialUpdate(quarterSchedule: PartialUpdateQuarterSchedule): Observable<IQuarterSchedule> {
    return this.http.patch<IQuarterSchedule>(
      `${this.resourceUrl}/${encodeURIComponent(this.getQuarterScheduleIdentifier(quarterSchedule))}`,
      quarterSchedule,
    );
  }

  find(id: string): Observable<IQuarterSchedule> {
    return this.http.get<IQuarterSchedule>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IQuarterSchedule[]>> {
    const options = createRequestOption(req);
    return this.http.get<IQuarterSchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getQuarterScheduleIdentifier(quarterSchedule: Pick<IQuarterSchedule, 'id'>): string {
    return quarterSchedule.id;
  }

  compareQuarterSchedule(o1: Pick<IQuarterSchedule, 'id'> | null, o2: Pick<IQuarterSchedule, 'id'> | null): boolean {
    return o1 && o2 ? this.getQuarterScheduleIdentifier(o1) === this.getQuarterScheduleIdentifier(o2) : o1 === o2;
  }

  addQuarterScheduleToCollectionIfMissing<Type extends Pick<IQuarterSchedule, 'id'>>(
    quarterScheduleCollection: Type[],
    ...quarterSchedulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const quarterSchedules: Type[] = quarterSchedulesToCheck.filter(isPresent);
    if (quarterSchedules.length > 0) {
      const quarterScheduleCollectionIdentifiers = quarterScheduleCollection.map(quarterScheduleItem =>
        this.getQuarterScheduleIdentifier(quarterScheduleItem),
      );
      const quarterSchedulesToAdd = quarterSchedules.filter(quarterScheduleItem => {
        const quarterScheduleIdentifier = this.getQuarterScheduleIdentifier(quarterScheduleItem);
        if (quarterScheduleCollectionIdentifiers.includes(quarterScheduleIdentifier)) {
          return false;
        }
        quarterScheduleCollectionIdentifiers.push(quarterScheduleIdentifier);
        return true;
      });
      return [...quarterSchedulesToAdd, ...quarterScheduleCollection];
    }
    return quarterScheduleCollection;
  }
}
