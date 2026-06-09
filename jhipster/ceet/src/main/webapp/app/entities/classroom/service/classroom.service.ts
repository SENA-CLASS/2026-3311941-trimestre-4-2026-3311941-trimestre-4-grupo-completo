import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IClassroom, NewClassroom } from '../classroom.model';

export type PartialUpdateClassroom = Partial<IClassroom> & Pick<IClassroom, 'id'>;

@Injectable()
export class ClassroomsService {
  readonly classroomsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly classroomsResource = httpResource<IClassroom[]>(() => {
    const params = this.classroomsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of classroom that have been fetched. It is updated when the classroomsResource emits a new value.
   * In case of error while fetching the classrooms, the signal is set to an empty array.
   */
  readonly classrooms = computed(() => (this.classroomsResource.hasValue() ? this.classroomsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/classrooms');
}

@Injectable({ providedIn: 'root' })
export class ClassroomService extends ClassroomsService {
  protected readonly http = inject(HttpClient);

  create(classroom: NewClassroom): Observable<IClassroom> {
    return this.http.post<IClassroom>(this.resourceUrl, classroom);
  }

  update(classroom: IClassroom): Observable<IClassroom> {
    return this.http.put<IClassroom>(`${this.resourceUrl}/${encodeURIComponent(this.getClassroomIdentifier(classroom))}`, classroom);
  }

  partialUpdate(classroom: PartialUpdateClassroom): Observable<IClassroom> {
    return this.http.patch<IClassroom>(`${this.resourceUrl}/${encodeURIComponent(this.getClassroomIdentifier(classroom))}`, classroom);
  }

  find(id: string): Observable<IClassroom> {
    return this.http.get<IClassroom>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IClassroom[]>> {
    const options = createRequestOption(req);
    return this.http.get<IClassroom[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getClassroomIdentifier(classroom: Pick<IClassroom, 'id'>): string {
    return classroom.id;
  }

  compareClassroom(o1: Pick<IClassroom, 'id'> | null, o2: Pick<IClassroom, 'id'> | null): boolean {
    return o1 && o2 ? this.getClassroomIdentifier(o1) === this.getClassroomIdentifier(o2) : o1 === o2;
  }

  addClassroomToCollectionIfMissing<Type extends Pick<IClassroom, 'id'>>(
    classroomCollection: Type[],
    ...classroomsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const classrooms: Type[] = classroomsToCheck.filter(isPresent);
    if (classrooms.length > 0) {
      const classroomCollectionIdentifiers = classroomCollection.map(classroomItem => this.getClassroomIdentifier(classroomItem));
      const classroomsToAdd = classrooms.filter(classroomItem => {
        const classroomIdentifier = this.getClassroomIdentifier(classroomItem);
        if (classroomCollectionIdentifiers.includes(classroomIdentifier)) {
          return false;
        }
        classroomCollectionIdentifiers.push(classroomIdentifier);
        return true;
      });
      return [...classroomsToAdd, ...classroomCollection];
    }
    return classroomCollection;
  }
}
