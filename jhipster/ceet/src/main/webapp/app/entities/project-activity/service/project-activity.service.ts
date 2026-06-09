import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IProjectActivity, NewProjectActivity } from '../project-activity.model';

export type PartialUpdateProjectActivity = Partial<IProjectActivity> & Pick<IProjectActivity, 'id'>;

@Injectable()
export class ProjectActivitiesService {
  readonly projectActivitiesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly projectActivitiesResource = httpResource<IProjectActivity[]>(() => {
    const params = this.projectActivitiesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of projectActivity that have been fetched. It is updated when the projectActivitiesResource emits a new value.
   * In case of error while fetching the projectActivities, the signal is set to an empty array.
   */
  readonly projectActivities = computed(() => (this.projectActivitiesResource.hasValue() ? this.projectActivitiesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/project-activities');
}

@Injectable({ providedIn: 'root' })
export class ProjectActivityService extends ProjectActivitiesService {
  protected readonly http = inject(HttpClient);

  create(projectActivity: NewProjectActivity): Observable<IProjectActivity> {
    return this.http.post<IProjectActivity>(this.resourceUrl, projectActivity);
  }

  update(projectActivity: IProjectActivity): Observable<IProjectActivity> {
    return this.http.put<IProjectActivity>(
      `${this.resourceUrl}/${encodeURIComponent(this.getProjectActivityIdentifier(projectActivity))}`,
      projectActivity,
    );
  }

  partialUpdate(projectActivity: PartialUpdateProjectActivity): Observable<IProjectActivity> {
    return this.http.patch<IProjectActivity>(
      `${this.resourceUrl}/${encodeURIComponent(this.getProjectActivityIdentifier(projectActivity))}`,
      projectActivity,
    );
  }

  find(id: string): Observable<IProjectActivity> {
    return this.http.get<IProjectActivity>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IProjectActivity[]>> {
    const options = createRequestOption(req);
    return this.http.get<IProjectActivity[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getProjectActivityIdentifier(projectActivity: Pick<IProjectActivity, 'id'>): string {
    return projectActivity.id;
  }

  compareProjectActivity(o1: Pick<IProjectActivity, 'id'> | null, o2: Pick<IProjectActivity, 'id'> | null): boolean {
    return o1 && o2 ? this.getProjectActivityIdentifier(o1) === this.getProjectActivityIdentifier(o2) : o1 === o2;
  }

  addProjectActivityToCollectionIfMissing<Type extends Pick<IProjectActivity, 'id'>>(
    projectActivityCollection: Type[],
    ...projectActivitiesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const projectActivities: Type[] = projectActivitiesToCheck.filter(isPresent);
    if (projectActivities.length > 0) {
      const projectActivityCollectionIdentifiers = projectActivityCollection.map(projectActivityItem =>
        this.getProjectActivityIdentifier(projectActivityItem),
      );
      const projectActivitiesToAdd = projectActivities.filter(projectActivityItem => {
        const projectActivityIdentifier = this.getProjectActivityIdentifier(projectActivityItem);
        if (projectActivityCollectionIdentifiers.includes(projectActivityIdentifier)) {
          return false;
        }
        projectActivityCollectionIdentifiers.push(projectActivityIdentifier);
        return true;
      });
      return [...projectActivitiesToAdd, ...projectActivityCollection];
    }
    return projectActivityCollection;
  }
}
