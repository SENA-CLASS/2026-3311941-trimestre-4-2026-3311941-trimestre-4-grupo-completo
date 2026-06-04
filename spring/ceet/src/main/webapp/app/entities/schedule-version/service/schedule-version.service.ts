import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IScheduleVersion, NewScheduleVersion } from '../schedule-version.model';

export type PartialUpdateScheduleVersion = Partial<IScheduleVersion> & Pick<IScheduleVersion, 'id'>;

@Injectable()
export class ScheduleVersionsService {
  readonly scheduleVersionsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly scheduleVersionsResource = httpResource<IScheduleVersion[]>(() => {
    const params = this.scheduleVersionsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of scheduleVersion that have been fetched. It is updated when the scheduleVersionsResource emits a new value.
   * In case of error while fetching the scheduleVersions, the signal is set to an empty array.
   */
  readonly scheduleVersions = computed(() => (this.scheduleVersionsResource.hasValue() ? this.scheduleVersionsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/schedule-versions');
}

@Injectable({ providedIn: 'root' })
export class ScheduleVersionService extends ScheduleVersionsService {
  protected readonly http = inject(HttpClient);

  create(scheduleVersion: NewScheduleVersion): Observable<IScheduleVersion> {
    return this.http.post<IScheduleVersion>(this.resourceUrl, scheduleVersion);
  }

  update(scheduleVersion: IScheduleVersion): Observable<IScheduleVersion> {
    return this.http.put<IScheduleVersion>(
      `${this.resourceUrl}/${encodeURIComponent(this.getScheduleVersionIdentifier(scheduleVersion))}`,
      scheduleVersion,
    );
  }

  partialUpdate(scheduleVersion: PartialUpdateScheduleVersion): Observable<IScheduleVersion> {
    return this.http.patch<IScheduleVersion>(
      `${this.resourceUrl}/${encodeURIComponent(this.getScheduleVersionIdentifier(scheduleVersion))}`,
      scheduleVersion,
    );
  }

  find(id: string): Observable<IScheduleVersion> {
    return this.http.get<IScheduleVersion>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IScheduleVersion[]>> {
    const options = createRequestOption(req);
    return this.http.get<IScheduleVersion[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getScheduleVersionIdentifier(scheduleVersion: Pick<IScheduleVersion, 'id'>): string {
    return scheduleVersion.id;
  }

  compareScheduleVersion(o1: Pick<IScheduleVersion, 'id'> | null, o2: Pick<IScheduleVersion, 'id'> | null): boolean {
    return o1 && o2 ? this.getScheduleVersionIdentifier(o1) === this.getScheduleVersionIdentifier(o2) : o1 === o2;
  }

  addScheduleVersionToCollectionIfMissing<Type extends Pick<IScheduleVersion, 'id'>>(
    scheduleVersionCollection: Type[],
    ...scheduleVersionsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const scheduleVersions: Type[] = scheduleVersionsToCheck.filter(isPresent);
    if (scheduleVersions.length > 0) {
      const scheduleVersionCollectionIdentifiers = scheduleVersionCollection.map(scheduleVersionItem =>
        this.getScheduleVersionIdentifier(scheduleVersionItem),
      );
      const scheduleVersionsToAdd = scheduleVersions.filter(scheduleVersionItem => {
        const scheduleVersionIdentifier = this.getScheduleVersionIdentifier(scheduleVersionItem);
        if (scheduleVersionCollectionIdentifiers.includes(scheduleVersionIdentifier)) {
          return false;
        }
        scheduleVersionCollectionIdentifiers.push(scheduleVersionIdentifier);
        return true;
      });
      return [...scheduleVersionsToAdd, ...scheduleVersionCollection];
    }
    return scheduleVersionCollection;
  }
}
