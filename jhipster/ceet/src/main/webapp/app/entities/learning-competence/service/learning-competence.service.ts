import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ILearningCompetence, NewLearningCompetence } from '../learning-competence.model';

export type PartialUpdateLearningCompetence = Partial<ILearningCompetence> & Pick<ILearningCompetence, 'id'>;

@Injectable()
export class LearningCompetencesService {
  readonly learningCompetencesParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly learningCompetencesResource = httpResource<ILearningCompetence[]>(() => {
    const params = this.learningCompetencesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of learningCompetence that have been fetched. It is updated when the learningCompetencesResource emits a new value.
   * In case of error while fetching the learningCompetences, the signal is set to an empty array.
   */
  readonly learningCompetences = computed(() =>
    this.learningCompetencesResource.hasValue() ? this.learningCompetencesResource.value() : [],
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/learning-competences');
}

@Injectable({ providedIn: 'root' })
export class LearningCompetenceService extends LearningCompetencesService {
  protected readonly http = inject(HttpClient);

  create(learningCompetence: NewLearningCompetence): Observable<ILearningCompetence> {
    return this.http.post<ILearningCompetence>(this.resourceUrl, learningCompetence);
  }

  update(learningCompetence: ILearningCompetence): Observable<ILearningCompetence> {
    return this.http.put<ILearningCompetence>(
      `${this.resourceUrl}/${encodeURIComponent(this.getLearningCompetenceIdentifier(learningCompetence))}`,
      learningCompetence,
    );
  }

  partialUpdate(learningCompetence: PartialUpdateLearningCompetence): Observable<ILearningCompetence> {
    return this.http.patch<ILearningCompetence>(
      `${this.resourceUrl}/${encodeURIComponent(this.getLearningCompetenceIdentifier(learningCompetence))}`,
      learningCompetence,
    );
  }

  find(id: string): Observable<ILearningCompetence> {
    return this.http.get<ILearningCompetence>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ILearningCompetence[]>> {
    const options = createRequestOption(req);
    return this.http.get<ILearningCompetence[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getLearningCompetenceIdentifier(learningCompetence: Pick<ILearningCompetence, 'id'>): string {
    return learningCompetence.id;
  }

  compareLearningCompetence(o1: Pick<ILearningCompetence, 'id'> | null, o2: Pick<ILearningCompetence, 'id'> | null): boolean {
    return o1 && o2 ? this.getLearningCompetenceIdentifier(o1) === this.getLearningCompetenceIdentifier(o2) : o1 === o2;
  }

  addLearningCompetenceToCollectionIfMissing<Type extends Pick<ILearningCompetence, 'id'>>(
    learningCompetenceCollection: Type[],
    ...learningCompetencesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const learningCompetences: Type[] = learningCompetencesToCheck.filter(isPresent);
    if (learningCompetences.length > 0) {
      const learningCompetenceCollectionIdentifiers = learningCompetenceCollection.map(learningCompetenceItem =>
        this.getLearningCompetenceIdentifier(learningCompetenceItem),
      );
      const learningCompetencesToAdd = learningCompetences.filter(learningCompetenceItem => {
        const learningCompetenceIdentifier = this.getLearningCompetenceIdentifier(learningCompetenceItem);
        if (learningCompetenceCollectionIdentifiers.includes(learningCompetenceIdentifier)) {
          return false;
        }
        learningCompetenceCollectionIdentifiers.push(learningCompetenceIdentifier);
        return true;
      });
      return [...learningCompetencesToAdd, ...learningCompetenceCollection];
    }
    return learningCompetenceCollection;
  }
}
