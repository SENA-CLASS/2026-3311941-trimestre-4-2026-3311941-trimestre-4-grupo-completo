import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IPlanningActivity, NewPlanningActivity } from '../planning-activity.model';

export type PartialUpdatePlanningActivity = Partial<IPlanningActivity> & Pick<IPlanningActivity, 'id'>;

@Injectable()
export class PlanningActivitiesService {
  readonly planningActivitiesParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly planningActivitiesResource = httpResource<IPlanningActivity[]>(() => {
    const params = this.planningActivitiesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of planningActivity that have been fetched. It is updated when the planningActivitiesResource emits a new value.
   * In case of error while fetching the planningActivities, the signal is set to an empty array.
   */
  readonly planningActivities = computed(() => (this.planningActivitiesResource.hasValue() ? this.planningActivitiesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/planning-activities');
}

@Injectable({ providedIn: 'root' })
export class PlanningActivityService extends PlanningActivitiesService {
  protected readonly http = inject(HttpClient);

  create(planningActivity: NewPlanningActivity): Observable<IPlanningActivity> {
    return this.http.post<IPlanningActivity>(this.resourceUrl, planningActivity);
  }

  update(planningActivity: IPlanningActivity): Observable<IPlanningActivity> {
    return this.http.put<IPlanningActivity>(
      `${this.resourceUrl}/${encodeURIComponent(this.getPlanningActivityIdentifier(planningActivity))}`,
      planningActivity,
    );
  }

  partialUpdate(planningActivity: PartialUpdatePlanningActivity): Observable<IPlanningActivity> {
    return this.http.patch<IPlanningActivity>(
      `${this.resourceUrl}/${encodeURIComponent(this.getPlanningActivityIdentifier(planningActivity))}`,
      planningActivity,
    );
  }

  find(id: string): Observable<IPlanningActivity> {
    return this.http.get<IPlanningActivity>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IPlanningActivity[]>> {
    const options = createRequestOption(req);
    return this.http.get<IPlanningActivity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getPlanningActivityIdentifier(planningActivity: Pick<IPlanningActivity, 'id'>): string {
    return planningActivity.id;
  }

  comparePlanningActivity(o1: Pick<IPlanningActivity, 'id'> | null, o2: Pick<IPlanningActivity, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlanningActivityIdentifier(o1) === this.getPlanningActivityIdentifier(o2) : o1 === o2;
  }

  addPlanningActivityToCollectionIfMissing<Type extends Pick<IPlanningActivity, 'id'>>(
    planningActivityCollection: Type[],
    ...planningActivitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const planningActivities: Type[] = planningActivitiesToCheck.filter(isPresent);
    if (planningActivities.length > 0) {
      const planningActivityCollectionIdentifiers = planningActivityCollection.map(planningActivityItem =>
        this.getPlanningActivityIdentifier(planningActivityItem),
      );
      const planningActivitiesToAdd = planningActivities.filter(planningActivityItem => {
        const planningActivityIdentifier = this.getPlanningActivityIdentifier(planningActivityItem);
        if (planningActivityCollectionIdentifiers.includes(planningActivityIdentifier)) {
          return false;
        }
        planningActivityCollectionIdentifiers.push(planningActivityIdentifier);
        return true;
      });
      return [...planningActivitiesToAdd, ...planningActivityCollection];
    }
    return planningActivityCollection;
  }
}
