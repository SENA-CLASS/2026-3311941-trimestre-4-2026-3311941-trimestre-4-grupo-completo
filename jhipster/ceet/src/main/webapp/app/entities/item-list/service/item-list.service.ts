import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IItemList, NewItemList } from '../item-list.model';

export type PartialUpdateItemList = Partial<IItemList> & Pick<IItemList, 'id'>;

@Injectable()
export class ItemListsService {
  readonly itemListsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly itemListsResource = httpResource<IItemList[]>(() => {
    const params = this.itemListsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of itemList that have been fetched. It is updated when the itemListsResource emits a new value.
   * In case of error while fetching the itemLists, the signal is set to an empty array.
   */
  readonly itemLists = computed(() => (this.itemListsResource.hasValue() ? this.itemListsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/item-lists');
}

@Injectable({ providedIn: 'root' })
export class ItemListService extends ItemListsService {
  protected readonly http = inject(HttpClient);

  create(itemList: NewItemList): Observable<IItemList> {
    return this.http.post<IItemList>(this.resourceUrl, itemList);
  }

  update(itemList: IItemList): Observable<IItemList> {
    return this.http.put<IItemList>(`${this.resourceUrl}/${encodeURIComponent(this.getItemListIdentifier(itemList))}`, itemList);
  }

  partialUpdate(itemList: PartialUpdateItemList): Observable<IItemList> {
    return this.http.patch<IItemList>(`${this.resourceUrl}/${encodeURIComponent(this.getItemListIdentifier(itemList))}`, itemList);
  }

  find(id: string): Observable<IItemList> {
    return this.http.get<IItemList>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IItemList[]>> {
    const options = createRequestOption(req);
    return this.http.get<IItemList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getItemListIdentifier(itemList: Pick<IItemList, 'id'>): string {
    return itemList.id;
  }

  compareItemList(o1: Pick<IItemList, 'id'> | null, o2: Pick<IItemList, 'id'> | null): boolean {
    return o1 && o2 ? this.getItemListIdentifier(o1) === this.getItemListIdentifier(o2) : o1 === o2;
  }

  addItemListToCollectionIfMissing<Type extends Pick<IItemList, 'id'>>(
    itemListCollection: Type[],
    ...itemListsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const itemLists: Type[] = itemListsToCheck.filter(isPresent);
    if (itemLists.length > 0) {
      const itemListCollectionIdentifiers = itemListCollection.map(itemListItem => this.getItemListIdentifier(itemListItem));
      const itemListsToAdd = itemLists.filter(itemListItem => {
        const itemListIdentifier = this.getItemListIdentifier(itemListItem);
        if (itemListCollectionIdentifiers.includes(itemListIdentifier)) {
          return false;
        }
        itemListCollectionIdentifiers.push(itemListIdentifier);
        return true;
      });
      return [...itemListsToAdd, ...itemListCollection];
    }
    return itemListCollection;
  }
}
