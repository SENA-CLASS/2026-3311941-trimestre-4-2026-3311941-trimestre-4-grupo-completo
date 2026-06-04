import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IApprentice, NewApprentice } from '../apprentice.model';

export type PartialUpdateApprentice = Partial<IApprentice> & Pick<IApprentice, 'id'>;

@Injectable()
export class ApprenticesService {
  readonly apprenticesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly apprenticesResource = httpResource<IApprentice[]>(() => {
    const params = this.apprenticesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of apprentice that have been fetched. It is updated when the apprenticesResource emits a new value.
   * In case of error while fetching the apprentices, the signal is set to an empty array.
   */
  readonly apprentices = computed(() => (this.apprenticesResource.hasValue() ? this.apprenticesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/apprentices');
}

@Injectable({ providedIn: 'root' })
export class ApprenticeService extends ApprenticesService {
  protected readonly http = inject(HttpClient);

  create(apprentice: NewApprentice): Observable<IApprentice> {
    return this.http.post<IApprentice>(this.resourceUrl, apprentice);
  }

  update(apprentice: IApprentice): Observable<IApprentice> {
    return this.http.put<IApprentice>(`${this.resourceUrl}/${encodeURIComponent(this.getApprenticeIdentifier(apprentice))}`, apprentice);
  }

  partialUpdate(apprentice: PartialUpdateApprentice): Observable<IApprentice> {
    return this.http.patch<IApprentice>(`${this.resourceUrl}/${encodeURIComponent(this.getApprenticeIdentifier(apprentice))}`, apprentice);
  }

  find(id: string): Observable<IApprentice> {
    return this.http.get<IApprentice>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IApprentice[]>> {
    const options = createRequestOption(req);
    return this.http.get<IApprentice[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getApprenticeIdentifier(apprentice: Pick<IApprentice, 'id'>): string {
    return apprentice.id;
  }

  compareApprentice(o1: Pick<IApprentice, 'id'> | null, o2: Pick<IApprentice, 'id'> | null): boolean {
    return o1 && o2 ? this.getApprenticeIdentifier(o1) === this.getApprenticeIdentifier(o2) : o1 === o2;
  }

  addApprenticeToCollectionIfMissing<Type extends Pick<IApprentice, 'id'>>(
    apprenticeCollection: Type[],
    ...apprenticesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const apprentices: Type[] = apprenticesToCheck.filter(isPresent);
    if (apprentices.length > 0) {
      const apprenticeCollectionIdentifiers = apprenticeCollection.map(apprenticeItem => this.getApprenticeIdentifier(apprenticeItem));
      const apprenticesToAdd = apprentices.filter(apprenticeItem => {
        const apprenticeIdentifier = this.getApprenticeIdentifier(apprenticeItem);
        if (apprenticeCollectionIdentifiers.includes(apprenticeIdentifier)) {
          return false;
        }
        apprenticeCollectionIdentifiers.push(apprenticeIdentifier);
        return true;
      });
      return [...apprenticesToAdd, ...apprenticeCollection];
    }
    return apprenticeCollection;
  }
}
