import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ILearningResult, NewLearningResult } from '../learning-result.model';

export type PartialUpdateLearningResult = Partial<ILearningResult> & Pick<ILearningResult, 'id'>;

@Injectable()
export class LearningResultsService {
  readonly learningResultsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly learningResultsResource = httpResource<ILearningResult[]>(() => {
    const params = this.learningResultsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of learningResult that have been fetched. It is updated when the learningResultsResource emits a new value.
   * In case of error while fetching the learningResults, the signal is set to an empty array.
   */
  readonly learningResults = computed(() => (this.learningResultsResource.hasValue() ? this.learningResultsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/learning-results');
}

@Injectable({ providedIn: 'root' })
export class LearningResultService extends LearningResultsService {
  protected readonly http = inject(HttpClient);

  create(learningResult: NewLearningResult): Observable<ILearningResult> {
    return this.http.post<ILearningResult>(this.resourceUrl, learningResult);
  }

  update(learningResult: ILearningResult): Observable<ILearningResult> {
    return this.http.put<ILearningResult>(
      `${this.resourceUrl}/${encodeURIComponent(this.getLearningResultIdentifier(learningResult))}`,
      learningResult,
    );
  }

  partialUpdate(learningResult: PartialUpdateLearningResult): Observable<ILearningResult> {
    return this.http.patch<ILearningResult>(
      `${this.resourceUrl}/${encodeURIComponent(this.getLearningResultIdentifier(learningResult))}`,
      learningResult,
    );
  }

  find(id: string): Observable<ILearningResult> {
    return this.http.get<ILearningResult>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ILearningResult[]>> {
    const options = createRequestOption(req);
    return this.http.get<ILearningResult[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getLearningResultIdentifier(learningResult: Pick<ILearningResult, 'id'>): string {
    return learningResult.id;
  }

  compareLearningResult(o1: Pick<ILearningResult, 'id'> | null, o2: Pick<ILearningResult, 'id'> | null): boolean {
    return o1 && o2 ? this.getLearningResultIdentifier(o1) === this.getLearningResultIdentifier(o2) : o1 === o2;
  }

  addLearningResultToCollectionIfMissing<Type extends Pick<ILearningResult, 'id'>>(
    learningResultCollection: Type[],
    ...learningResultsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const learningResults: Type[] = learningResultsToCheck.filter(isPresent);
    if (learningResults.length > 0) {
      const learningResultCollectionIdentifiers = learningResultCollection.map(learningResultItem =>
        this.getLearningResultIdentifier(learningResultItem),
      );
      const learningResultsToAdd = learningResults.filter(learningResultItem => {
        const learningResultIdentifier = this.getLearningResultIdentifier(learningResultItem);
        if (learningResultCollectionIdentifiers.includes(learningResultIdentifier)) {
          return false;
        }
        learningResultCollectionIdentifiers.push(learningResultIdentifier);
        return true;
      });
      return [...learningResultsToAdd, ...learningResultCollection];
    }
    return learningResultCollection;
  }
}
