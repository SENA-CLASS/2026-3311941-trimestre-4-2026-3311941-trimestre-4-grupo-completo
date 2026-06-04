import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICoursePlanning, NewCoursePlanning } from '../course-planning.model';

export type PartialUpdateCoursePlanning = Partial<ICoursePlanning> & Pick<ICoursePlanning, 'id'>;

@Injectable()
export class CoursePlanningsService {
  readonly coursePlanningsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly coursePlanningsResource = httpResource<ICoursePlanning[]>(() => {
    const params = this.coursePlanningsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of coursePlanning that have been fetched. It is updated when the coursePlanningsResource emits a new value.
   * In case of error while fetching the coursePlannings, the signal is set to an empty array.
   */
  readonly coursePlannings = computed(() => (this.coursePlanningsResource.hasValue() ? this.coursePlanningsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/course-plannings');
}

@Injectable({ providedIn: 'root' })
export class CoursePlanningService extends CoursePlanningsService {
  protected readonly http = inject(HttpClient);

  create(coursePlanning: NewCoursePlanning): Observable<ICoursePlanning> {
    return this.http.post<ICoursePlanning>(this.resourceUrl, coursePlanning);
  }

  update(coursePlanning: ICoursePlanning): Observable<ICoursePlanning> {
    return this.http.put<ICoursePlanning>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCoursePlanningIdentifier(coursePlanning))}`,
      coursePlanning,
    );
  }

  partialUpdate(coursePlanning: PartialUpdateCoursePlanning): Observable<ICoursePlanning> {
    return this.http.patch<ICoursePlanning>(
      `${this.resourceUrl}/${encodeURIComponent(this.getCoursePlanningIdentifier(coursePlanning))}`,
      coursePlanning,
    );
  }

  find(id: string): Observable<ICoursePlanning> {
    return this.http.get<ICoursePlanning>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ICoursePlanning[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICoursePlanning[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCoursePlanningIdentifier(coursePlanning: Pick<ICoursePlanning, 'id'>): string {
    return coursePlanning.id;
  }

  compareCoursePlanning(o1: Pick<ICoursePlanning, 'id'> | null, o2: Pick<ICoursePlanning, 'id'> | null): boolean {
    return o1 && o2 ? this.getCoursePlanningIdentifier(o1) === this.getCoursePlanningIdentifier(o2) : o1 === o2;
  }

  addCoursePlanningToCollectionIfMissing<Type extends Pick<ICoursePlanning, 'id'>>(
    coursePlanningCollection: Type[],
    ...coursePlanningsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const coursePlannings: Type[] = coursePlanningsToCheck.filter(isPresent);
    if (coursePlannings.length > 0) {
      const coursePlanningCollectionIdentifiers = coursePlanningCollection.map(coursePlanningItem =>
        this.getCoursePlanningIdentifier(coursePlanningItem),
      );
      const coursePlanningsToAdd = coursePlannings.filter(coursePlanningItem => {
        const coursePlanningIdentifier = this.getCoursePlanningIdentifier(coursePlanningItem);
        if (coursePlanningCollectionIdentifiers.includes(coursePlanningIdentifier)) {
          return false;
        }
        coursePlanningCollectionIdentifiers.push(coursePlanningIdentifier);
        return true;
      });
      return [...coursePlanningsToAdd, ...coursePlanningCollection];
    }
    return coursePlanningCollection;
  }
}
