import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IInstructor, NewInstructor } from '../instructor.model';

export type PartialUpdateInstructor = Partial<IInstructor> & Pick<IInstructor, 'id'>;

@Injectable()
export class InstructorsService {
  readonly instructorsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly instructorsResource = httpResource<IInstructor[]>(() => {
    const params = this.instructorsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of instructor that have been fetched. It is updated when the instructorsResource emits a new value.
   * In case of error while fetching the instructors, the signal is set to an empty array.
   */
  readonly instructors = computed(() => (this.instructorsResource.hasValue() ? this.instructorsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/instructors');
}

@Injectable({ providedIn: 'root' })
export class InstructorService extends InstructorsService {
  protected readonly http = inject(HttpClient);

  create(instructor: NewInstructor): Observable<IInstructor> {
    return this.http.post<IInstructor>(this.resourceUrl, instructor);
  }

  update(instructor: IInstructor): Observable<IInstructor> {
    return this.http.put<IInstructor>(`${this.resourceUrl}/${encodeURIComponent(this.getInstructorIdentifier(instructor))}`, instructor);
  }

  partialUpdate(instructor: PartialUpdateInstructor): Observable<IInstructor> {
    return this.http.patch<IInstructor>(`${this.resourceUrl}/${encodeURIComponent(this.getInstructorIdentifier(instructor))}`, instructor);
  }

  find(id: string): Observable<IInstructor> {
    return this.http.get<IInstructor>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IInstructor[]>> {
    const options = createRequestOption(req);
    return this.http.get<IInstructor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getInstructorIdentifier(instructor: Pick<IInstructor, 'id'>): string {
    return instructor.id;
  }

  compareInstructor(o1: Pick<IInstructor, 'id'> | null, o2: Pick<IInstructor, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstructorIdentifier(o1) === this.getInstructorIdentifier(o2) : o1 === o2;
  }

  addInstructorToCollectionIfMissing<Type extends Pick<IInstructor, 'id'>>(
    instructorCollection: Type[],
    ...instructorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const instructors: Type[] = instructorsToCheck.filter(isPresent);
    if (instructors.length > 0) {
      const instructorCollectionIdentifiers = instructorCollection.map(instructorItem => this.getInstructorIdentifier(instructorItem));
      const instructorsToAdd = instructors.filter(instructorItem => {
        const instructorIdentifier = this.getInstructorIdentifier(instructorItem);
        if (instructorCollectionIdentifiers.includes(instructorIdentifier)) {
          return false;
        }
        instructorCollectionIdentifiers.push(instructorIdentifier);
        return true;
      });
      return [...instructorsToAdd, ...instructorCollection];
    }
    return instructorCollection;
  }
}
