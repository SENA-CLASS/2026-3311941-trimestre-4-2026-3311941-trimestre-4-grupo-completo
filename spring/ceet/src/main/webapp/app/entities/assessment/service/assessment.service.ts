import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IAssessment, NewAssessment } from '../assessment.model';

export type PartialUpdateAssessment = Partial<IAssessment> & Pick<IAssessment, 'id'>;

@Injectable()
export class AssessmentsService {
  readonly assessmentsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly assessmentsResource = httpResource<IAssessment[]>(() => {
    const params = this.assessmentsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of assessment that have been fetched. It is updated when the assessmentsResource emits a new value.
   * In case of error while fetching the assessments, the signal is set to an empty array.
   */
  readonly assessments = computed(() => (this.assessmentsResource.hasValue() ? this.assessmentsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/assessments');
}

@Injectable({ providedIn: 'root' })
export class AssessmentService extends AssessmentsService {
  protected readonly http = inject(HttpClient);

  create(assessment: NewAssessment): Observable<IAssessment> {
    return this.http.post<IAssessment>(this.resourceUrl, assessment);
  }

  update(assessment: IAssessment): Observable<IAssessment> {
    return this.http.put<IAssessment>(`${this.resourceUrl}/${encodeURIComponent(this.getAssessmentIdentifier(assessment))}`, assessment);
  }

  partialUpdate(assessment: PartialUpdateAssessment): Observable<IAssessment> {
    return this.http.patch<IAssessment>(`${this.resourceUrl}/${encodeURIComponent(this.getAssessmentIdentifier(assessment))}`, assessment);
  }

  find(id: string): Observable<IAssessment> {
    return this.http.get<IAssessment>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IAssessment[]>> {
    const options = createRequestOption(req);
    return this.http.get<IAssessment[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getAssessmentIdentifier(assessment: Pick<IAssessment, 'id'>): string {
    return assessment.id;
  }

  compareAssessment(o1: Pick<IAssessment, 'id'> | null, o2: Pick<IAssessment, 'id'> | null): boolean {
    return o1 && o2 ? this.getAssessmentIdentifier(o1) === this.getAssessmentIdentifier(o2) : o1 === o2;
  }

  addAssessmentToCollectionIfMissing<Type extends Pick<IAssessment, 'id'>>(
    assessmentCollection: Type[],
    ...assessmentsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const assessments: Type[] = assessmentsToCheck.filter(isPresent);
    if (assessments.length > 0) {
      const assessmentCollectionIdentifiers = assessmentCollection.map(assessmentItem => this.getAssessmentIdentifier(assessmentItem));
      const assessmentsToAdd = assessments.filter(assessmentItem => {
        const assessmentIdentifier = this.getAssessmentIdentifier(assessmentItem);
        if (assessmentCollectionIdentifiers.includes(assessmentIdentifier)) {
          return false;
        }
        assessmentCollectionIdentifiers.push(assessmentIdentifier);
        return true;
      });
      return [...assessmentsToAdd, ...assessmentCollection];
    }
    return assessmentCollection;
  }
}
