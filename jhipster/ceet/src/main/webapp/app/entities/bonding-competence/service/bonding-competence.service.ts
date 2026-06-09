import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IBondingCompetence, NewBondingCompetence } from '../bonding-competence.model';

export type PartialUpdateBondingCompetence = Partial<IBondingCompetence> & Pick<IBondingCompetence, 'id'>;

@Injectable()
export class BondingCompetencesService {
  readonly bondingCompetencesParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly bondingCompetencesResource = httpResource<IBondingCompetence[]>(() => {
    const params = this.bondingCompetencesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of bondingCompetence that have been fetched. It is updated when the bondingCompetencesResource emits a new value.
   * In case of error while fetching the bondingCompetences, the signal is set to an empty array.
   */
  readonly bondingCompetences = computed(() => (this.bondingCompetencesResource.hasValue() ? this.bondingCompetencesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/bonding-competences');
}

@Injectable({ providedIn: 'root' })
export class BondingCompetenceService extends BondingCompetencesService {
  protected readonly http = inject(HttpClient);

  create(bondingCompetence: NewBondingCompetence): Observable<IBondingCompetence> {
    return this.http.post<IBondingCompetence>(this.resourceUrl, bondingCompetence);
  }

  update(bondingCompetence: IBondingCompetence): Observable<IBondingCompetence> {
    return this.http.put<IBondingCompetence>(
      `${this.resourceUrl}/${encodeURIComponent(this.getBondingCompetenceIdentifier(bondingCompetence))}`,
      bondingCompetence,
    );
  }

  partialUpdate(bondingCompetence: PartialUpdateBondingCompetence): Observable<IBondingCompetence> {
    return this.http.patch<IBondingCompetence>(
      `${this.resourceUrl}/${encodeURIComponent(this.getBondingCompetenceIdentifier(bondingCompetence))}`,
      bondingCompetence,
    );
  }

  find(id: string): Observable<IBondingCompetence> {
    return this.http.get<IBondingCompetence>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IBondingCompetence[]>> {
    const options = createRequestOption(req);
    return this.http.get<IBondingCompetence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getBondingCompetenceIdentifier(bondingCompetence: Pick<IBondingCompetence, 'id'>): string {
    return bondingCompetence.id;
  }

  compareBondingCompetence(o1: Pick<IBondingCompetence, 'id'> | null, o2: Pick<IBondingCompetence, 'id'> | null): boolean {
    return o1 && o2 ? this.getBondingCompetenceIdentifier(o1) === this.getBondingCompetenceIdentifier(o2) : o1 === o2;
  }

  addBondingCompetenceToCollectionIfMissing<Type extends Pick<IBondingCompetence, 'id'>>(
    bondingCompetenceCollection: Type[],
    ...bondingCompetencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bondingCompetences: Type[] = bondingCompetencesToCheck.filter(isPresent);
    if (bondingCompetences.length > 0) {
      const bondingCompetenceCollectionIdentifiers = bondingCompetenceCollection.map(bondingCompetenceItem =>
        this.getBondingCompetenceIdentifier(bondingCompetenceItem),
      );
      const bondingCompetencesToAdd = bondingCompetences.filter(bondingCompetenceItem => {
        const bondingCompetenceIdentifier = this.getBondingCompetenceIdentifier(bondingCompetenceItem);
        if (bondingCompetenceCollectionIdentifiers.includes(bondingCompetenceIdentifier)) {
          return false;
        }
        bondingCompetenceCollectionIdentifiers.push(bondingCompetenceIdentifier);
        return true;
      });
      return [...bondingCompetencesToAdd, ...bondingCompetenceCollection];
    }
    return bondingCompetenceCollection;
  }
}
