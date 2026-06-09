import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICampus, NewCampus } from '../campus.model';

export type PartialUpdateCampus = Partial<ICampus> & Pick<ICampus, 'id'>;

@Injectable()
export class CampusesService {
  readonly campusesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly campusesResource = httpResource<ICampus[]>(() => {
    const params = this.campusesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of campus that have been fetched. It is updated when the campusesResource emits a new value.
   * In case of error while fetching the campuses, the signal is set to an empty array.
   */
  readonly campuses = computed(() => (this.campusesResource.hasValue() ? this.campusesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/campuses');
}

@Injectable({ providedIn: 'root' })
export class CampusService extends CampusesService {
  protected readonly http = inject(HttpClient);

  create(campus: NewCampus): Observable<ICampus> {
    return this.http.post<ICampus>(this.resourceUrl, campus);
  }

  update(campus: ICampus): Observable<ICampus> {
    return this.http.put<ICampus>(`${this.resourceUrl}/${encodeURIComponent(this.getCampusIdentifier(campus))}`, campus);
  }

  partialUpdate(campus: PartialUpdateCampus): Observable<ICampus> {
    return this.http.patch<ICampus>(`${this.resourceUrl}/${encodeURIComponent(this.getCampusIdentifier(campus))}`, campus);
  }

  find(id: string): Observable<ICampus> {
    return this.http.get<ICampus>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ICampus[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICampus[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCampusIdentifier(campus: Pick<ICampus, 'id'>): string {
    return campus.id;
  }

  compareCampus(o1: Pick<ICampus, 'id'> | null, o2: Pick<ICampus, 'id'> | null): boolean {
    return o1 && o2 ? this.getCampusIdentifier(o1) === this.getCampusIdentifier(o2) : o1 === o2;
  }

  addCampusToCollectionIfMissing<Type extends Pick<ICampus, 'id'>>(
    campusCollection: Type[],
    ...campusesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const campuses: Type[] = campusesToCheck.filter(isPresent);
    if (campuses.length > 0) {
      const campusCollectionIdentifiers = campusCollection.map(campusItem => this.getCampusIdentifier(campusItem));
      const campusesToAdd = campuses.filter(campusItem => {
        const campusIdentifier = this.getCampusIdentifier(campusItem);
        if (campusCollectionIdentifiers.includes(campusIdentifier)) {
          return false;
        }
        campusCollectionIdentifiers.push(campusIdentifier);
        return true;
      });
      return [...campusesToAdd, ...campusCollection];
    }
    return campusCollection;
  }
}
