import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ISchedule, NewSchedule } from '../schedule.model';

export type PartialUpdateSchedule = Partial<ISchedule> & Pick<ISchedule, 'id'>;

@Injectable()
export class SchedulesService {
  readonly schedulesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly schedulesResource = httpResource<ISchedule[]>(() => {
    const params = this.schedulesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of schedule that have been fetched. It is updated when the schedulesResource emits a new value.
   * In case of error while fetching the schedules, the signal is set to an empty array.
   */
  readonly schedules = computed(() => (this.schedulesResource.hasValue() ? this.schedulesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/schedules');
}

@Injectable({ providedIn: 'root' })
export class ScheduleService extends SchedulesService {
  protected readonly http = inject(HttpClient);

  create(schedule: NewSchedule): Observable<ISchedule> {
    return this.http.post<ISchedule>(this.resourceUrl, schedule);
  }

  update(schedule: ISchedule): Observable<ISchedule> {
    return this.http.put<ISchedule>(`${this.resourceUrl}/${encodeURIComponent(this.getScheduleIdentifier(schedule))}`, schedule);
  }

  partialUpdate(schedule: PartialUpdateSchedule): Observable<ISchedule> {
    return this.http.patch<ISchedule>(`${this.resourceUrl}/${encodeURIComponent(this.getScheduleIdentifier(schedule))}`, schedule);
  }

  find(id: string): Observable<ISchedule> {
    return this.http.get<ISchedule>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ISchedule[]>> {
    const options = createRequestOption(req);
    return this.http.get<ISchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getScheduleIdentifier(schedule: Pick<ISchedule, 'id'>): string {
    return schedule.id;
  }

  compareSchedule(o1: Pick<ISchedule, 'id'> | null, o2: Pick<ISchedule, 'id'> | null): boolean {
    return o1 && o2 ? this.getScheduleIdentifier(o1) === this.getScheduleIdentifier(o2) : o1 === o2;
  }

  addScheduleToCollectionIfMissing<Type extends Pick<ISchedule, 'id'>>(
    scheduleCollection: Type[],
    ...schedulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const schedules: Type[] = schedulesToCheck.filter(isPresent);
    if (schedules.length > 0) {
      const scheduleCollectionIdentifiers = scheduleCollection.map(scheduleItem => this.getScheduleIdentifier(scheduleItem));
      const schedulesToAdd = schedules.filter(scheduleItem => {
        const scheduleIdentifier = this.getScheduleIdentifier(scheduleItem);
        if (scheduleCollectionIdentifiers.includes(scheduleIdentifier)) {
          return false;
        }
        scheduleCollectionIdentifiers.push(scheduleIdentifier);
        return true;
      });
      return [...schedulesToAdd, ...scheduleCollection];
    }
    return scheduleCollection;
  }
}
