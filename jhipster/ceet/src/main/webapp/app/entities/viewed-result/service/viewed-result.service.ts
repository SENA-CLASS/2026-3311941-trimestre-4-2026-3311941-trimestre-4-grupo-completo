import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IViewedResult, NewViewedResult } from '../viewed-result.model';

export type PartialUpdateViewedResult = Partial<IViewedResult> & Pick<IViewedResult, 'id'>;

@Injectable()
export class ViewedResultsService {
  readonly viewedResultsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly viewedResultsResource = httpResource<IViewedResult[]>(() => {
    const params = this.viewedResultsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of viewedResult that have been fetched. It is updated when the viewedResultsResource emits a new value.
   * In case of error while fetching the viewedResults, the signal is set to an empty array.
   */
  readonly viewedResults = computed(() => (this.viewedResultsResource.hasValue() ? this.viewedResultsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/viewed-results');
}

@Injectable({ providedIn: 'root' })
export class ViewedResultService extends ViewedResultsService {
  protected readonly http = inject(HttpClient);

  create(viewedResult: NewViewedResult): Observable<IViewedResult> {
    return this.http.post<IViewedResult>(this.resourceUrl, viewedResult);
  }

  update(viewedResult: IViewedResult): Observable<IViewedResult> {
    return this.http.put<IViewedResult>(
      `${this.resourceUrl}/${encodeURIComponent(this.getViewedResultIdentifier(viewedResult))}`,
      viewedResult,
    );
  }

  partialUpdate(viewedResult: PartialUpdateViewedResult): Observable<IViewedResult> {
    return this.http.patch<IViewedResult>(
      `${this.resourceUrl}/${encodeURIComponent(this.getViewedResultIdentifier(viewedResult))}`,
      viewedResult,
    );
  }

  find(id: string): Observable<IViewedResult> {
    return this.http.get<IViewedResult>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IViewedResult[]>> {
    const options = createRequestOption(req);
    return this.http.get<IViewedResult[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getViewedResultIdentifier(viewedResult: Pick<IViewedResult, 'id'>): string {
    return viewedResult.id;
  }

  compareViewedResult(o1: Pick<IViewedResult, 'id'> | null, o2: Pick<IViewedResult, 'id'> | null): boolean {
    return o1 && o2 ? this.getViewedResultIdentifier(o1) === this.getViewedResultIdentifier(o2) : o1 === o2;
  }

  addViewedResultToCollectionIfMissing<Type extends Pick<IViewedResult, 'id'>>(
    viewedResultCollection: Type[],
    ...viewedResultsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const viewedResults: Type[] = viewedResultsToCheck.filter(isPresent);
    if (viewedResults.length > 0) {
      const viewedResultCollectionIdentifiers = viewedResultCollection.map(viewedResultItem =>
        this.getViewedResultIdentifier(viewedResultItem),
      );
      const viewedResultsToAdd = viewedResults.filter(viewedResultItem => {
        const viewedResultIdentifier = this.getViewedResultIdentifier(viewedResultItem);
        if (viewedResultCollectionIdentifiers.includes(viewedResultIdentifier)) {
          return false;
        }
        viewedResultCollectionIdentifiers.push(viewedResultIdentifier);
        return true;
      });
      return [...viewedResultsToAdd, ...viewedResultCollection];
    }
    return viewedResultCollection;
  }
}
