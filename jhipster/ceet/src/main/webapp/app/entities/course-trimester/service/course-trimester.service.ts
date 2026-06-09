import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICourseTrimester, NewCourseTrimester } from '../course-trimester.model';

export type PartialUpdateCourseTrimester = Partial<ICourseTrimester> & Pick<ICourseTrimester, 'id'>;

@Injectable()
export class CourseTrimestersService {
  readonly courseTrimestersParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly courseTrimestersResource = httpResource<ICourseTrimester[]>(() => {
    const params = this.courseTrimestersParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of courseTrimester that have been fetched. It is updated when the courseTrimestersResource emits a new value.
   * In case of error while fetching the courseTrimesters, the signal is set to an empty array.
   */
  readonly courseTrimesters = computed(() => (this.courseTrimestersResource.hasValue() ? this.courseTrimestersResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/course-trimesters');
}

@Injectable({ providedIn: 'root' })
export class CourseTrimesterService extends CourseTrimestersService {
  protected readonly http = inject(HttpClient);

  create(courseTrimester: NewCourseTrimester): Observable<ICourseTrimester> {
    return this.http.post<ICourseTrimester>(this.resourceUrl, courseTrimester);
  }

  update(courseTrimester: ICourseTrimester): Observable<ICourseTrimester> {
    return this.http.put<ICourseTrimester>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCourseTrimesterIdentifier(courseTrimester))}`,
      courseTrimester,
    );
  }

  partialUpdate(courseTrimester: PartialUpdateCourseTrimester): Observable<ICourseTrimester> {
    return this.http.patch<ICourseTrimester>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCourseTrimesterIdentifier(courseTrimester))}`,
      courseTrimester,
    );
  }

  find(id: string): Observable<ICourseTrimester> {
    return this.http.get<ICourseTrimester>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ICourseTrimester[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICourseTrimester[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCourseTrimesterIdentifier(courseTrimester: Pick<ICourseTrimester, 'id'>): string {
    return courseTrimester.id;
  }

  compareCourseTrimester(o1: Pick<ICourseTrimester, 'id'> | null, o2: Pick<ICourseTrimester, 'id'> | null): boolean {
    return o1 && o2 ? this.getCourseTrimesterIdentifier(o1) === this.getCourseTrimesterIdentifier(o2) : o1 === o2;
  }

  addCourseTrimesterToCollectionIfMissing<Type extends Pick<ICourseTrimester, 'id'>>(
    courseTrimesterCollection: Type[],
    ...courseTrimestersToCheck: (Type | null | undefined)[]
  ): Type[] {
    const courseTrimesters: Type[] = courseTrimestersToCheck.filter(isPresent);
    if (courseTrimesters.length > 0) {
      const courseTrimesterCollectionIdentifiers = courseTrimesterCollection.map(courseTrimesterItem =>
        this.getCourseTrimesterIdentifier(courseTrimesterItem),
      );
      const courseTrimestersToAdd = courseTrimesters.filter(courseTrimesterItem => {
        const courseTrimesterIdentifier = this.getCourseTrimesterIdentifier(courseTrimesterItem);
        if (courseTrimesterCollectionIdentifiers.includes(courseTrimesterIdentifier)) {
          return false;
        }
        courseTrimesterCollectionIdentifiers.push(courseTrimesterIdentifier);
        return true;
      });
      return [...courseTrimestersToAdd, ...courseTrimesterCollection];
    }
    return courseTrimesterCollection;
  }
}
