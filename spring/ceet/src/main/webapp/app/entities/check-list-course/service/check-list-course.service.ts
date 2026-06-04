import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICheckListCourse, NewCheckListCourse } from '../check-list-course.model';

export type PartialUpdateCheckListCourse = Partial<ICheckListCourse> & Pick<ICheckListCourse, 'id'>;

@Injectable()
export class CheckListCoursesService {
  readonly checkListCoursesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly checkListCoursesResource = httpResource<ICheckListCourse[]>(() => {
    const params = this.checkListCoursesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of checkListCourse that have been fetched. It is updated when the checkListCoursesResource emits a new value.
   * In case of error while fetching the checkListCourses, the signal is set to an empty array.
   */
  readonly checkListCourses = computed(() => (this.checkListCoursesResource.hasValue() ? this.checkListCoursesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/check-list-courses');
}

@Injectable({ providedIn: 'root' })
export class CheckListCourseService extends CheckListCoursesService {
  protected readonly http = inject(HttpClient);

  create(checkListCourse: NewCheckListCourse): Observable<ICheckListCourse> {
    return this.http.post<ICheckListCourse>(this.resourceUrl, checkListCourse);
  }

  update(checkListCourse: ICheckListCourse): Observable<ICheckListCourse> {
    return this.http.put<ICheckListCourse>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCheckListCourseIdentifier(checkListCourse))}`,
      checkListCourse,
    );
  }

  partialUpdate(checkListCourse: PartialUpdateCheckListCourse): Observable<ICheckListCourse> {
    return this.http.patch<ICheckListCourse>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCheckListCourseIdentifier(checkListCourse))}`,
      checkListCourse,
    );
  }

  find(id: string): Observable<ICheckListCourse> {
    return this.http.get<ICheckListCourse>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ICheckListCourse[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICheckListCourse[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCheckListCourseIdentifier(checkListCourse: Pick<ICheckListCourse, 'id'>): string {
    return checkListCourse.id;
  }

  compareCheckListCourse(o1: Pick<ICheckListCourse, 'id'> | null, o2: Pick<ICheckListCourse, 'id'> | null): boolean {
    return o1 && o2 ? this.getCheckListCourseIdentifier(o1) === this.getCheckListCourseIdentifier(o2) : o1 === o2;
  }

  addCheckListCourseToCollectionIfMissing<Type extends Pick<ICheckListCourse, 'id'>>(
    checkListCourseCollection: Type[],
    ...checkListCoursesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const checkListCourses: Type[] = checkListCoursesToCheck.filter(isPresent);
    if (checkListCourses.length > 0) {
      const checkListCourseCollectionIdentifiers = checkListCourseCollection.map(checkListCourseItem =>
        this.getCheckListCourseIdentifier(checkListCourseItem),
      );
      const checkListCoursesToAdd = checkListCourses.filter(checkListCourseItem => {
        const checkListCourseIdentifier = this.getCheckListCourseIdentifier(checkListCourseItem);
        if (checkListCourseCollectionIdentifiers.includes(checkListCourseIdentifier)) {
          return false;
        }
        checkListCourseCollectionIdentifiers.push(checkListCourseIdentifier);
        return true;
      });
      return [...checkListCoursesToAdd, ...checkListCourseCollection];
    }
    return checkListCourseCollection;
  }
}
