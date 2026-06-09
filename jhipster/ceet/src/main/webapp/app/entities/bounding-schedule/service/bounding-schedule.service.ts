import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IBoundingSchedule, NewBoundingSchedule } from '../bounding-schedule.model';

export type PartialUpdateBoundingSchedule = Partial<IBoundingSchedule> & Pick<IBoundingSchedule, 'id'>;

@Injectable()
export class BoundingSchedulesService {
  readonly boundingSchedulesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly boundingSchedulesResource = httpResource<IBoundingSchedule[]>(() => {
    const params = this.boundingSchedulesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of boundingSchedule that have been fetched. It is updated when the boundingSchedulesResource emits a new value.
   * In case of error while fetching the boundingSchedules, the signal is set to an empty array.
   */
  readonly boundingSchedules = computed(() => (this.boundingSchedulesResource.hasValue() ? this.boundingSchedulesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/bounding-schedules');
}

@Injectable({ providedIn: 'root' })
export class BoundingScheduleService extends BoundingSchedulesService {
  protected readonly http = inject(HttpClient);

  create(boundingSchedule: NewBoundingSchedule): Observable<IBoundingSchedule> {
    return this.http.post<IBoundingSchedule>(this.resourceUrl, boundingSchedule);
  }

  update(boundingSchedule: IBoundingSchedule): Observable<IBoundingSchedule> {
    return this.http.put<IBoundingSchedule>(
      `${this.resourceUrl}/${encodeURIComponent(this.getBoundingScheduleIdentifier(boundingSchedule))}`,
      boundingSchedule,
    );
  }

  partialUpdate(boundingSchedule: PartialUpdateBoundingSchedule): Observable<IBoundingSchedule> {
    return this.http.patch<IBoundingSchedule>(
      `${this.resourceUrl}/${encodeURIComponent(this.getBoundingScheduleIdentifier(boundingSchedule))}`,
      boundingSchedule,
    );
  }

  find(id: string): Observable<IBoundingSchedule> {
    return this.http.get<IBoundingSchedule>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IBoundingSchedule[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBoundingSchedule[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getBoundingScheduleIdentifier(boundingSchedule: Pick<IBoundingSchedule, 'id'>): string {
    return boundingSchedule.id;
  }

  compareBoundingSchedule(o1: Pick<IBoundingSchedule, 'id'> | null, o2: Pick<IBoundingSchedule, 'id'> | null): boolean {
    return o1 && o2 ? this.getBoundingScheduleIdentifier(o1) === this.getBoundingScheduleIdentifier(o2) : o1 === o2;
  }

  addBoundingScheduleToCollectionIfMissing<Type extends Pick<IBoundingSchedule, 'id'>>(
    boundingScheduleCollection: Type[],
    ...boundingSchedulesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const boundingSchedules: Type[] = boundingSchedulesToCheck.filter(isPresent);
    if (boundingSchedules.length > 0) {
      const boundingScheduleCollectionIdentifiers = boundingScheduleCollection.map(boundingScheduleItem =>
        this.getBoundingScheduleIdentifier(boundingScheduleItem),
      );
      const boundingSchedulesToAdd = boundingSchedules.filter(boundingScheduleItem => {
        const boundingScheduleIdentifier = this.getBoundingScheduleIdentifier(boundingScheduleItem);
        if (boundingScheduleCollectionIdentifiers.includes(boundingScheduleIdentifier)) {
          return false;
        }
        boundingScheduleCollectionIdentifiers.push(boundingScheduleIdentifier);
        return true;
      });
      return [...boundingSchedulesToAdd, ...boundingScheduleCollection];
    }
    return boundingScheduleCollection;
  }
}
