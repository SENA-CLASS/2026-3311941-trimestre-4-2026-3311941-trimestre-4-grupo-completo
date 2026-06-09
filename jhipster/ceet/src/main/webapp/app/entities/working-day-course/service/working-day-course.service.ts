import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IWorkingDayCourse, NewWorkingDayCourse } from '../working-day-course.model';

export type PartialUpdateWorkingDayCourse = Partial<IWorkingDayCourse> & Pick<IWorkingDayCourse, 'id'>;

@Injectable()
export class WorkingDayCoursesService {
  readonly workingDayCoursesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly workingDayCoursesResource = httpResource<IWorkingDayCourse[]>(() => {
    const params = this.workingDayCoursesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of workingDayCourse that have been fetched. It is updated when the workingDayCoursesResource emits a new value.
   * In case of error while fetching the workingDayCourses, the signal is set to an empty array.
   */
  readonly workingDayCourses = computed(() => (this.workingDayCoursesResource.hasValue() ? this.workingDayCoursesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/working-day-courses');
}

@Injectable({ providedIn: 'root' })
export class WorkingDayCourseService extends WorkingDayCoursesService {
  protected readonly http = inject(HttpClient);

  create(workingDayCourse: NewWorkingDayCourse): Observable<IWorkingDayCourse> {
    return this.http.post<IWorkingDayCourse>(this.resourceUrl, workingDayCourse);
  }

  update(workingDayCourse: IWorkingDayCourse): Observable<IWorkingDayCourse> {
    return this.http.put<IWorkingDayCourse>(
      `${this.resourceUrl}/${encodeURIComponent(this.getWorkingDayCourseIdentifier(workingDayCourse))}`,
      workingDayCourse,
    );
  }

  partialUpdate(workingDayCourse: PartialUpdateWorkingDayCourse): Observable<IWorkingDayCourse> {
    return this.http.patch<IWorkingDayCourse>(
      `${this.resourceUrl}/${encodeURIComponent(this.getWorkingDayCourseIdentifier(workingDayCourse))}`,
      workingDayCourse,
    );
  }

  find(id: string): Observable<IWorkingDayCourse> {
    return this.http.get<IWorkingDayCourse>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IWorkingDayCourse[]>> {
    const options = createRequestOption(req);
    return this.http.get<IWorkingDayCourse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getWorkingDayCourseIdentifier(workingDayCourse: Pick<IWorkingDayCourse, 'id'>): string {
    return workingDayCourse.id;
  }

  compareWorkingDayCourse(o1: Pick<IWorkingDayCourse, 'id'> | null, o2: Pick<IWorkingDayCourse, 'id'> | null): boolean {
    return o1 && o2 ? this.getWorkingDayCourseIdentifier(o1) === this.getWorkingDayCourseIdentifier(o2) : o1 === o2;
  }

  addWorkingDayCourseToCollectionIfMissing<Type extends Pick<IWorkingDayCourse, 'id'>>(
    workingDayCourseCollection: Type[],
    ...workingDayCoursesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const workingDayCourses: Type[] = workingDayCoursesToCheck.filter(isPresent);
    if (workingDayCourses.length > 0) {
      const workingDayCourseCollectionIdentifiers = workingDayCourseCollection.map(workingDayCourseItem =>
        this.getWorkingDayCourseIdentifier(workingDayCourseItem),
      );
      const workingDayCoursesToAdd = workingDayCourses.filter(workingDayCourseItem => {
        const workingDayCourseIdentifier = this.getWorkingDayCourseIdentifier(workingDayCourseItem);
        if (workingDayCourseCollectionIdentifiers.includes(workingDayCourseIdentifier)) {
          return false;
        }
        workingDayCourseCollectionIdentifiers.push(workingDayCourseIdentifier);
        return true;
      });
      return [...workingDayCoursesToAdd, ...workingDayCourseCollection];
    }
    return workingDayCourseCollection;
  }
}
