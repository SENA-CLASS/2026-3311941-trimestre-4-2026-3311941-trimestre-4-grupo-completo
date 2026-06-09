import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IBonding, NewBonding } from '../bonding.model';

export type PartialUpdateBonding = Partial<IBonding> & Pick<IBonding, 'id'>;

@Injectable()
export class BondingsService {
  readonly bondingsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly bondingsResource = httpResource<IBonding[]>(() => {
    const params = this.bondingsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of bonding that have been fetched. It is updated when the bondingsResource emits a new value.
   * In case of error while fetching the bondings, the signal is set to an empty array.
   */
  readonly bondings = computed(() => (this.bondingsResource.hasValue() ? this.bondingsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/bondings');
}

@Injectable({ providedIn: 'root' })
export class BondingService extends BondingsService {
  protected readonly http = inject(HttpClient);

  create(bonding: NewBonding): Observable<IBonding> {
    return this.http.post<IBonding>(this.resourceUrl, bonding);
  }

  update(bonding: IBonding): Observable<IBonding> {
    return this.http.put<IBonding>(`${this.resourceUrl}/${encodeURIComponent(this.getBondingIdentifier(bonding))}`, bonding);
  }

  partialUpdate(bonding: PartialUpdateBonding): Observable<IBonding> {
    return this.http.patch<IBonding>(`${this.resourceUrl}/${encodeURIComponent(this.getBondingIdentifier(bonding))}`, bonding);
  }

  find(id: string): Observable<IBonding> {
    return this.http.get<IBonding>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IBonding[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBonding[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getBondingIdentifier(bonding: Pick<IBonding, 'id'>): string {
    return bonding.id;
  }

  compareBonding(o1: Pick<IBonding, 'id'> | null, o2: Pick<IBonding, 'id'> | null): boolean {
    return o1 && o2 ? this.getBondingIdentifier(o1) === this.getBondingIdentifier(o2) : o1 === o2;
  }

  addBondingToCollectionIfMissing<Type extends Pick<IBonding, 'id'>>(
    bondingCollection: Type[],
    ...bondingsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bondings: Type[] = bondingsToCheck.filter(isPresent);
    if (bondings.length > 0) {
      const bondingCollectionIdentifiers = bondingCollection.map(bondingItem => this.getBondingIdentifier(bondingItem));
      const bondingsToAdd = bondings.filter(bondingItem => {
        const bondingIdentifier = this.getBondingIdentifier(bondingItem);
        if (bondingCollectionIdentifiers.includes(bondingIdentifier)) {
          return false;
        }
        bondingCollectionIdentifiers.push(bondingIdentifier);
        return true;
      });
      return [...bondingsToAdd, ...bondingCollection];
    }
    return bondingCollection;
  }
}
