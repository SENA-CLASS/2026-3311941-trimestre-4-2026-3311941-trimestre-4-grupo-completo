import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IProjectGroup, NewProjectGroup } from '../project-group.model';

export type PartialUpdateProjectGroup = Partial<IProjectGroup> & Pick<IProjectGroup, 'id'>;

@Injectable()
export class ProjectGroupsService {
  readonly projectGroupsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly projectGroupsResource = httpResource<IProjectGroup[]>(() => {
    const params = this.projectGroupsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of projectGroup that have been fetched. It is updated when the projectGroupsResource emits a new value.
   * In case of error while fetching the projectGroups, the signal is set to an empty array.
   */
  readonly projectGroups = computed(() => (this.projectGroupsResource.hasValue() ? this.projectGroupsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/project-groups');
}

@Injectable({ providedIn: 'root' })
export class ProjectGroupService extends ProjectGroupsService {
  protected readonly http = inject(HttpClient);

  create(projectGroup: NewProjectGroup): Observable<IProjectGroup> {
    return this.http.post<IProjectGroup>(this.resourceUrl, projectGroup);
  }

  update(projectGroup: IProjectGroup): Observable<IProjectGroup> {
    return this.http.put<IProjectGroup>(
      `${this.resourceUrl}/${encodeURIComponent(this.getProjectGroupIdentifier(projectGroup))}`,
      projectGroup,
    );
  }

  partialUpdate(projectGroup: PartialUpdateProjectGroup): Observable<IProjectGroup> {
    return this.http.patch<IProjectGroup>(
      `${this.resourceUrl}/${encodeURIComponent(this.getProjectGroupIdentifier(projectGroup))}`,
      projectGroup,
    );
  }

  find(id: string): Observable<IProjectGroup> {
    return this.http.get<IProjectGroup>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IProjectGroup[]>> {
    const options = createRequestOption(req);
    return this.http.get<IProjectGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getProjectGroupIdentifier(projectGroup: Pick<IProjectGroup, 'id'>): string {
    return projectGroup.id;
  }

  compareProjectGroup(o1: Pick<IProjectGroup, 'id'> | null, o2: Pick<IProjectGroup, 'id'> | null): boolean {
    return o1 && o2 ? this.getProjectGroupIdentifier(o1) === this.getProjectGroupIdentifier(o2) : o1 === o2;
  }

  addProjectGroupToCollectionIfMissing<Type extends Pick<IProjectGroup, 'id'>>(
    projectGroupCollection: Type[],
    ...projectGroupsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const projectGroups: Type[] = projectGroupsToCheck.filter(isPresent);
    if (projectGroups.length > 0) {
      const projectGroupCollectionIdentifiers = projectGroupCollection.map(projectGroupItem =>
        this.getProjectGroupIdentifier(projectGroupItem),
      );
      const projectGroupsToAdd = projectGroups.filter(projectGroupItem => {
        const projectGroupIdentifier = this.getProjectGroupIdentifier(projectGroupItem);
        if (projectGroupCollectionIdentifiers.includes(projectGroupIdentifier)) {
          return false;
        }
        projectGroupCollectionIdentifiers.push(projectGroupIdentifier);
        return true;
      });
      return [...projectGroupsToAdd, ...projectGroupCollection];
    }
    return projectGroupCollection;
  }
}
