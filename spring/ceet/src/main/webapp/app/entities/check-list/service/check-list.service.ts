import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ICheckList, NewCheckList } from '../check-list.model';

export type PartialUpdateCheckList = Partial<ICheckList> & Pick<ICheckList, 'id'>;

@Injectable()
export class CheckListsService {
  readonly checkListsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly checkListsResource = httpResource<ICheckList[]>(() => {
    const params = this.checkListsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of checkList that have been fetched. It is updated when the checkListsResource emits a new value.
   * In case of error while fetching the checkLists, the signal is set to an empty array.
   */
  readonly checkLists = computed(() => (this.checkListsResource.hasValue() ? this.checkListsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/check-lists');
}

@Injectable({ providedIn: 'root' })
export class CheckListService extends CheckListsService {
  protected readonly http = inject(HttpClient);

  create(checkList: NewCheckList): Observable<ICheckList> {
    return this.http.post<ICheckList>(this.resourceUrl, checkList);
  }

  update(checkList: ICheckList): Observable<ICheckList> {
    return this.http.put<ICheckList>(`${this.resourceUrl}/${encodeURIComponent(this.getCheckListIdentifier(checkList))}`, checkList);
  }

  partialUpdate(checkList: PartialUpdateCheckList): Observable<ICheckList> {
    return this.http.patch<ICheckList>(`${this.resourceUrl}/${encodeURIComponent(this.getCheckListIdentifier(checkList))}`, checkList);
  }

  find(id: string): Observable<ICheckList> {
    return this.http.get<ICheckList>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ICheckList[]>> {
    const options = createRequestOption(req);
    return this.http.get<ICheckList[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getCheckListIdentifier(checkList: Pick<ICheckList, 'id'>): string {
    return checkList.id;
  }

  compareCheckList(o1: Pick<ICheckList, 'id'> | null, o2: Pick<ICheckList, 'id'> | null): boolean {
    return o1 && o2 ? this.getCheckListIdentifier(o1) === this.getCheckListIdentifier(o2) : o1 === o2;
  }

  addCheckListToCollectionIfMissing<Type extends Pick<ICheckList, 'id'>>(
    checkListCollection: Type[],
    ...checkListsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const checkLists: Type[] = checkListsToCheck.filter(isPresent);
    if (checkLists.length > 0) {
      const checkListCollectionIdentifiers = checkListCollection.map(checkListItem => this.getCheckListIdentifier(checkListItem));
      const checkListsToAdd = checkLists.filter(checkListItem => {
        const checkListIdentifier = this.getCheckListIdentifier(checkListItem);
        if (checkListCollectionIdentifiers.includes(checkListIdentifier)) {
          return false;
        }
        checkListCollectionIdentifiers.push(checkListIdentifier);
        return true;
      });
      return [...checkListsToAdd, ...checkListCollection];
    }
    return checkListCollection;
  }
}
