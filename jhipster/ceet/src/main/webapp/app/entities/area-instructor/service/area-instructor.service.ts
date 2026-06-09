import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IAreaInstructor, NewAreaInstructor } from '../area-instructor.model';

export type PartialUpdateAreaInstructor = Partial<IAreaInstructor> & Pick<IAreaInstructor, 'id'>;

@Injectable()
export class AreaInstructorsService {
  readonly areaInstructorsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly areaInstructorsResource = httpResource<IAreaInstructor[]>(() => {
    const params = this.areaInstructorsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of areaInstructor that have been fetched. It is updated when the areaInstructorsResource emits a new value.
   * In case of error while fetching the areaInstructors, the signal is set to an empty array.
   */
  readonly areaInstructors = computed(() => (this.areaInstructorsResource.hasValue() ? this.areaInstructorsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/area-instructors');
}

@Injectable({ providedIn: 'root' })
export class AreaInstructorService extends AreaInstructorsService {
  protected readonly http = inject(HttpClient);

  create(areaInstructor: NewAreaInstructor): Observable<IAreaInstructor> {
    return this.http.post<IAreaInstructor>(this.resourceUrl, areaInstructor);
  }

  update(areaInstructor: IAreaInstructor): Observable<IAreaInstructor> {
    return this.http.put<IAreaInstructor>(
      `${this.resourceUrl}/${encodeURIComponent(this.getAreaInstructorIdentifier(areaInstructor))}`,
      areaInstructor,
    );
  }

  partialUpdate(areaInstructor: PartialUpdateAreaInstructor): Observable<IAreaInstructor> {
    return this.http.patch<IAreaInstructor>(
      `${this.resourceUrl}/${encodeURIComponent(this.getAreaInstructorIdentifier(areaInstructor))}`,
      areaInstructor,
    );
  }

  find(id: string): Observable<IAreaInstructor> {
    return this.http.get<IAreaInstructor>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IAreaInstructor[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAreaInstructor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getAreaInstructorIdentifier(areaInstructor: Pick<IAreaInstructor, 'id'>): string {
    return areaInstructor.id;
  }

  compareAreaInstructor(o1: Pick<IAreaInstructor, 'id'> | null, o2: Pick<IAreaInstructor, 'id'> | null): boolean {
    return o1 && o2 ? this.getAreaInstructorIdentifier(o1) === this.getAreaInstructorIdentifier(o2) : o1 === o2;
  }

  addAreaInstructorToCollectionIfMissing<Type extends Pick<IAreaInstructor, 'id'>>(
    areaInstructorCollection: Type[],
    ...areaInstructorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const areaInstructors: Type[] = areaInstructorsToCheck.filter(isPresent);
    if (areaInstructors.length > 0) {
      const areaInstructorCollectionIdentifiers = areaInstructorCollection.map(areaInstructorItem =>
        this.getAreaInstructorIdentifier(areaInstructorItem),
      );
      const areaInstructorsToAdd = areaInstructors.filter(areaInstructorItem => {
        const areaInstructorIdentifier = this.getAreaInstructorIdentifier(areaInstructorItem);
        if (areaInstructorCollectionIdentifiers.includes(areaInstructorIdentifier)) {
          return false;
        }
        areaInstructorCollectionIdentifiers.push(areaInstructorIdentifier);
        return true;
      });
      return [...areaInstructorsToAdd, ...areaInstructorCollection];
    }
    return areaInstructorCollection;
  }
}
