import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IClassroomLimitation, NewClassroomLimitation } from '../classroom-limitation.model';

export type PartialUpdateClassroomLimitation = Partial<IClassroomLimitation> & Pick<IClassroomLimitation, 'id'>;

@Injectable()
export class ClassroomLimitationsService {
  readonly classroomLimitationsParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly classroomLimitationsResource = httpResource<IClassroomLimitation[]>(() => {
    const params = this.classroomLimitationsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of classroomLimitation that have been fetched. It is updated when the classroomLimitationsResource emits a new value.
   * In case of error while fetching the classroomLimitations, the signal is set to an empty array.
   */
  readonly classroomLimitations = computed(() =>
    this.classroomLimitationsResource.hasValue() ? this.classroomLimitationsResource.value() : [],
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/classroom-limitations');
}

@Injectable({ providedIn: 'root' })
export class ClassroomLimitationService extends ClassroomLimitationsService {
  protected readonly http = inject(HttpClient);

  create(classroomLimitation: NewClassroomLimitation): Observable<IClassroomLimitation> {
    return this.http.post<IClassroomLimitation>(this.resourceUrl, classroomLimitation);
  }

  update(classroomLimitation: IClassroomLimitation): Observable<IClassroomLimitation> {
    return this.http.put<IClassroomLimitation>(
      `${this.resourceUrl}/${encodeURIComponent(this.getClassroomLimitationIdentifier(classroomLimitation))}`,
      classroomLimitation,
    );
  }

  partialUpdate(classroomLimitation: PartialUpdateClassroomLimitation): Observable<IClassroomLimitation> {
    return this.http.patch<IClassroomLimitation>(
      `${this.resourceUrl}/${encodeURIComponent(this.getClassroomLimitationIdentifier(classroomLimitation))}`,
      classroomLimitation,
    );
  }

  find(id: string): Observable<IClassroomLimitation> {
    return this.http.get<IClassroomLimitation>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IClassroomLimitation[]>> {
    const options = createRequestOption(req);
    return this.http.get<IClassroomLimitation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getClassroomLimitationIdentifier(classroomLimitation: Pick<IClassroomLimitation, 'id'>): string {
    return classroomLimitation.id;
  }

  compareClassroomLimitation(o1: Pick<IClassroomLimitation, 'id'> | null, o2: Pick<IClassroomLimitation, 'id'> | null): boolean {
    return o1 && o2 ? this.getClassroomLimitationIdentifier(o1) === this.getClassroomLimitationIdentifier(o2) : o1 === o2;
  }

  addClassroomLimitationToCollectionIfMissing<Type extends Pick<IClassroomLimitation, 'id'>>(
    classroomLimitationCollection: Type[],
    ...classroomLimitationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const classroomLimitations: Type[] = classroomLimitationsToCheck.filter(isPresent);
    if (classroomLimitations.length > 0) {
      const classroomLimitationCollectionIdentifiers = classroomLimitationCollection.map(classroomLimitationItem =>
        this.getClassroomLimitationIdentifier(classroomLimitationItem),
      );
      const classroomLimitationsToAdd = classroomLimitations.filter(classroomLimitationItem => {
        const classroomLimitationIdentifier = this.getClassroomLimitationIdentifier(classroomLimitationItem);
        if (classroomLimitationCollectionIdentifiers.includes(classroomLimitationIdentifier)) {
          return false;
        }
        classroomLimitationCollectionIdentifiers.push(classroomLimitationIdentifier);
        return true;
      });
      return [...classroomLimitationsToAdd, ...classroomLimitationCollection];
    }
    return classroomLimitationCollection;
  }
}
