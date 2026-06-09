import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IArea, NewArea } from '../area.model';

export type PartialUpdateArea = Partial<IArea> & Pick<IArea, 'id'>;

@Injectable()
export class AreasService {
  readonly areasParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(undefined);
  readonly areasResource = httpResource<IArea[]>(() => {
    const params = this.areasParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of area that have been fetched. It is updated when the areasResource emits a new value.
   * In case of error while fetching the areas, the signal is set to an empty array.
   */
  readonly areas = computed(() => (this.areasResource.hasValue() ? this.areasResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/areas');
}

@Injectable({ providedIn: 'root' })
export class AreaService extends AreasService {
  protected readonly http = inject(HttpClient);

  create(area: NewArea): Observable<IArea> {
    return this.http.post<IArea>(this.resourceUrl, area);
  }

  update(area: IArea): Observable<IArea> {
    return this.http.put<IArea>(`${this.resourceUrl}/${encodeURIComponent(this.getAreaIdentifier(area))}`, area);
  }

  partialUpdate(area: PartialUpdateArea): Observable<IArea> {
    return this.http.patch<IArea>(`${this.resourceUrl}/${encodeURIComponent(this.getAreaIdentifier(area))}`, area);
  }

  find(id: string): Observable<IArea> {
    return this.http.get<IArea>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IArea[]>> {
    const options = createRequestOption(req);
    return this.http.get<IArea[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getAreaIdentifier(area: Pick<IArea, 'id'>): string {
    return area.id;
  }

  compareArea(o1: Pick<IArea, 'id'> | null, o2: Pick<IArea, 'id'> | null): boolean {
    return o1 && o2 ? this.getAreaIdentifier(o1) === this.getAreaIdentifier(o2) : o1 === o2;
  }

  addAreaToCollectionIfMissing<Type extends Pick<IArea, 'id'>>(
    areaCollection: Type[],
    ...areasToCheck: (Type | null | undefined)[]
  ): Type[] {
    const areas: Type[] = areasToCheck.filter(isPresent);
    if (areas.length > 0) {
      const areaCollectionIdentifiers = areaCollection.map(areaItem => this.getAreaIdentifier(areaItem));
      const areasToAdd = areas.filter(areaItem => {
        const areaIdentifier = this.getAreaIdentifier(areaItem);
        if (areaCollectionIdentifiers.includes(areaIdentifier)) {
          return false;
        }
        areaCollectionIdentifiers.push(areaIdentifier);
        return true;
      });
      return [...areasToAdd, ...areaCollection];
    }
    return areaCollection;
  }
}
