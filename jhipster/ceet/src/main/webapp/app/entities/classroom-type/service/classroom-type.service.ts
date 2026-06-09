import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IClassroomType, NewClassroomType } from '../classroom-type.model';

export type PartialUpdateClassroomType = Partial<IClassroomType> & Pick<IClassroomType, 'id'>;

@Injectable()
export class ClassroomTypesService {
  readonly classroomTypesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly classroomTypesResource = httpResource<IClassroomType[]>(() => {
    const params = this.classroomTypesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of classroomType that have been fetched. It is updated when the classroomTypesResource emits a new value.
   * In case of error while fetching the classroomTypes, the signal is set to an empty array.
   */
  readonly classroomTypes = computed(() => (this.classroomTypesResource.hasValue() ? this.classroomTypesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/classroom-types');
}

@Injectable({ providedIn: 'root' })
export class ClassroomTypeService extends ClassroomTypesService {
  protected readonly http = inject(HttpClient);

  create(classroomType: NewClassroomType): Observable<IClassroomType> {
    return this.http.post<IClassroomType>(this.resourceUrl, classroomType);
  }

  update(classroomType: IClassroomType): Observable<IClassroomType> {
    return this.http.put<IClassroomType>(
      `${this.resourceUrl}/${encodeURIComponent(this.getClassroomTypeIdentifier(classroomType))}`,
      classroomType,
    );
  }

  partialUpdate(classroomType: PartialUpdateClassroomType): Observable<IClassroomType> {
    return this.http.patch<IClassroomType>(
      `${this.resourceUrl}/${encodeURIComponent(this.getClassroomTypeIdentifier(classroomType))}`,
      classroomType,
    );
  }

  find(id: string): Observable<IClassroomType> {
    return this.http.get<IClassroomType>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IClassroomType[]>> {
    const options = createRequestOption(req);
    return this.http.get<IClassroomType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getClassroomTypeIdentifier(classroomType: Pick<IClassroomType, 'id'>): string {
    return classroomType.id;
  }

  compareClassroomType(o1: Pick<IClassroomType, 'id'> | null, o2: Pick<IClassroomType, 'id'> | null): boolean {
    return o1 && o2 ? this.getClassroomTypeIdentifier(o1) === this.getClassroomTypeIdentifier(o2) : o1 === o2;
  }

  addClassroomTypeToCollectionIfMissing<Type extends Pick<IClassroomType, 'id'>>(
    classroomTypeCollection: Type[],
    ...classroomTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const classroomTypes: Type[] = classroomTypesToCheck.filter(isPresent);
    if (classroomTypes.length > 0) {
      const classroomTypeCollectionIdentifiers = classroomTypeCollection.map(classroomTypeItem =>
        this.getClassroomTypeIdentifier(classroomTypeItem),
      );
      const classroomTypesToAdd = classroomTypes.filter(classroomTypeItem => {
        const classroomTypeIdentifier = this.getClassroomTypeIdentifier(classroomTypeItem);
        if (classroomTypeCollectionIdentifiers.includes(classroomTypeIdentifier)) {
          return false;
        }
        classroomTypeCollectionIdentifiers.push(classroomTypeIdentifier);
        return true;
      });
      return [...classroomTypesToAdd, ...classroomTypeCollection];
    }
    return classroomTypeCollection;
  }
}
