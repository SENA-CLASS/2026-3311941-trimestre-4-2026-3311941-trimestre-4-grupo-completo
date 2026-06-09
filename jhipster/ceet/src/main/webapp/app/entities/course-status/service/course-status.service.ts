import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICourseStatus, NewCourseStatus } from '../course-status.model';

export type PartialUpdateCourseStatus = Partial<ICourseStatus> & Pick<ICourseStatus, 'id'>;

@Injectable()
export class CourseStatusesService {
  readonly courseStatusesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly courseStatusesResource = httpResource<ICourseStatus[]>(() => {
    const params = this.courseStatusesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of courseStatus that have been fetched. It is updated when the courseStatusesResource emits a new value.
   * In case of error while fetching the courseStatuses, the signal is set to an empty array.
   */
  readonly courseStatuses = computed(() => (this.courseStatusesResource.hasValue() ? this.courseStatusesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/course-statuses');
}

@Injectable({ providedIn: 'root' })
export class CourseStatusService extends CourseStatusesService {
  protected readonly http = inject(HttpClient);

  create(courseStatus: NewCourseStatus): Observable<ICourseStatus> {
    return this.http.post<ICourseStatus>(this.resourceUrl, courseStatus);
  }

  update(courseStatus: ICourseStatus): Observable<ICourseStatus> {
    return this.http.put<ICourseStatus>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCourseStatusIdentifier(courseStatus))}`,
      courseStatus,
    );
  }

  partialUpdate(courseStatus: PartialUpdateCourseStatus): Observable<ICourseStatus> {
    return this.http.patch<ICourseStatus>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCourseStatusIdentifier(courseStatus))}`,
      courseStatus,
    );
  }

  find(id: string): Observable<ICourseStatus> {
    return this.http.get<ICourseStatus>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ICourseStatus[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICourseStatus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCourseStatusIdentifier(courseStatus: Pick<ICourseStatus, 'id'>): string {
    return courseStatus.id;
  }

  compareCourseStatus(o1: Pick<ICourseStatus, 'id'> | null, o2: Pick<ICourseStatus, 'id'> | null): boolean {
    return o1 && o2 ? this.getCourseStatusIdentifier(o1) === this.getCourseStatusIdentifier(o2) : o1 === o2;
  }

  addCourseStatusToCollectionIfMissing<Type extends Pick<ICourseStatus, 'id'>>(
    courseStatusCollection: Type[],
    ...courseStatusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const courseStatuses: Type[] = courseStatusesToCheck.filter(isPresent);
    if (courseStatuses.length > 0) {
      const courseStatusCollectionIdentifiers = courseStatusCollection.map(courseStatusItem =>
        this.getCourseStatusIdentifier(courseStatusItem),
      );
      const courseStatusesToAdd = courseStatuses.filter(courseStatusItem => {
        const courseStatusIdentifier = this.getCourseStatusIdentifier(courseStatusItem);
        if (courseStatusCollectionIdentifiers.includes(courseStatusIdentifier)) {
          return false;
        }
        courseStatusCollectionIdentifiers.push(courseStatusIdentifier);
        return true;
      });
      return [...courseStatusesToAdd, ...courseStatusCollection];
    }
    return courseStatusCollection;
  }
}
