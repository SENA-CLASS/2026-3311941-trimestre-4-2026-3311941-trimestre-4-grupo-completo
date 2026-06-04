import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IDocumentType, NewDocumentType } from '../document-type.model';

export type PartialUpdateDocumentType = Partial<IDocumentType> & Pick<IDocumentType, 'id'>;

@Injectable()
export class DocumentTypesService {
  readonly documentTypesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly documentTypesResource = httpResource<IDocumentType[]>(() => {
    const params = this.documentTypesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of documentType that have been fetched. It is updated when the documentTypesResource emits a new value.
   * In case of error while fetching the documentTypes, the signal is set to an empty array.
   */
  readonly documentTypes = computed(() => (this.documentTypesResource.hasValue() ? this.documentTypesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/document-types');
}

@Injectable({ providedIn: 'root' })
export class DocumentTypeService extends DocumentTypesService {
  protected readonly http = inject(HttpClient);

  create(documentType: NewDocumentType): Observable<IDocumentType> {
    return this.http.post<IDocumentType>(this.resourceUrl, documentType);
  }

  update(documentType: IDocumentType): Observable<IDocumentType> {
    return this.http.put<IDocumentType>(
      `${this.resourceUrl}/${encodeURIComponent(this.getDocumentTypeIdentifier(documentType))}`,
      documentType,
    );
  }

  partialUpdate(documentType: PartialUpdateDocumentType): Observable<IDocumentType> {
    return this.http.patch<IDocumentType>(
      `${this.resourceUrl}/${encodeURIComponent(this.getDocumentTypeIdentifier(documentType))}`,
      documentType,
    );
  }

  find(id: string): Observable<IDocumentType> {
    return this.http.get<IDocumentType>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IDocumentType[]>> {
    const options = createRequestOption(req);
    return this.http.get<IDocumentType[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getDocumentTypeIdentifier(documentType: Pick<IDocumentType, 'id'>): string {
    return documentType.id;
  }

  compareDocumentType(o1: Pick<IDocumentType, 'id'> | null, o2: Pick<IDocumentType, 'id'> | null): boolean {
    return o1 && o2 ? this.getDocumentTypeIdentifier(o1) === this.getDocumentTypeIdentifier(o2) : o1 === o2;
  }

  addDocumentTypeToCollectionIfMissing<Type extends Pick<IDocumentType, 'id'>>(
    documentTypeCollection: Type[],
    ...documentTypesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const documentTypes: Type[] = documentTypesToCheck.filter(isPresent);
    if (documentTypes.length > 0) {
      const documentTypeCollectionIdentifiers = documentTypeCollection.map(documentTypeItem =>
        this.getDocumentTypeIdentifier(documentTypeItem),
      );
      const documentTypesToAdd = documentTypes.filter(documentTypeItem => {
        const documentTypeIdentifier = this.getDocumentTypeIdentifier(documentTypeItem);
        if (documentTypeCollectionIdentifiers.includes(documentTypeIdentifier)) {
          return false;
        }
        documentTypeCollectionIdentifiers.push(documentTypeIdentifier);
        return true;
      });
      return [...documentTypesToAdd, ...documentTypeCollection];
    }
    return documentTypeCollection;
  }
}
