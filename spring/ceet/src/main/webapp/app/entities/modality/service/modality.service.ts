import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IModality, NewModality } from '../modality.model';

export type PartialUpdateModality = Partial<IModality> & Pick<IModality, 'id'>;

@Injectable()
export class ModalitiesService {
  readonly modalitiesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly modalitiesResource = httpResource<IModality[]>(() => {
    const params = this.modalitiesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of modality that have been fetched. It is updated when the modalitiesResource emits a new value.
   * In case of error while fetching the modalities, the signal is set to an empty array.
   */
  readonly modalities = computed(() => (this.modalitiesResource.hasValue() ? this.modalitiesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/modalities');
}

@Injectable({ providedIn: 'root' })
export class ModalityService extends ModalitiesService {
  protected readonly http = inject(HttpClient);

  create(modality: NewModality): Observable<IModality> {
    return this.http.post<IModality>(this.resourceUrl, modality);
  }

  update(modality: IModality): Observable<IModality> {
    return this.http.put<IModality>(`${this.resourceUrl}/${encodeURIComponent(this.getModalityIdentifier(modality))}`, modality);
  }

  partialUpdate(modality: PartialUpdateModality): Observable<IModality> {
    return this.http.patch<IModality>(`${this.resourceUrl}/${encodeURIComponent(this.getModalityIdentifier(modality))}`, modality);
  }

  find(id: string): Observable<IModality> {
    return this.http.get<IModality>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IModality[]>> {
    const options = createRequestOption(req);
    return this.http.get<IModality[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getModalityIdentifier(modality: Pick<IModality, 'id'>): string {
    return modality.id;
  }

  compareModality(o1: Pick<IModality, 'id'> | null, o2: Pick<IModality, 'id'> | null): boolean {
    return o1 && o2 ? this.getModalityIdentifier(o1) === this.getModalityIdentifier(o2) : o1 === o2;
  }

  addModalityToCollectionIfMissing<Type extends Pick<IModality, 'id'>>(
    modalityCollection: Type[],
    ...modalitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const modalities: Type[] = modalitiesToCheck.filter(isPresent);
    if (modalities.length > 0) {
      const modalityCollectionIdentifiers = modalityCollection.map(modalityItem => this.getModalityIdentifier(modalityItem));
      const modalitiesToAdd = modalities.filter(modalityItem => {
        const modalityIdentifier = this.getModalityIdentifier(modalityItem);
        if (modalityCollectionIdentifiers.includes(modalityIdentifier)) {
          return false;
        }
        modalityCollectionIdentifiers.push(modalityIdentifier);
        return true;
      });
      return [...modalitiesToAdd, ...modalityCollection];
    }
    return modalityCollection;
  }
}
