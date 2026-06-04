import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IProject, NewProject } from '../project.model';

export type PartialUpdateProject = Partial<IProject> & Pick<IProject, 'id'>;

@Injectable()
export class ProjectsService {
  readonly projectsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly projectsResource = httpResource<IProject[]>(() => {
    const params = this.projectsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of project that have been fetched. It is updated when the projectsResource emits a new value.
   * In case of error while fetching the projects, the signal is set to an empty array.
   */
  readonly projects = computed(() => (this.projectsResource.hasValue() ? this.projectsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/projects');
}

@Injectable({ providedIn: 'root' })
export class ProjectService extends ProjectsService {
  protected readonly http = inject(HttpClient);

  create(project: NewProject): Observable<IProject> {
    return this.http.post<IProject>(this.resourceUrl, project);
  }

  update(project: IProject): Observable<IProject> {
    return this.http.put<IProject>(`${this.resourceUrl}/${encodeURIComponent(this.getProjectIdentifier(project))}`, project);
  }

  partialUpdate(project: PartialUpdateProject): Observable<IProject> {
    return this.http.patch<IProject>(`${this.resourceUrl}/${encodeURIComponent(this.getProjectIdentifier(project))}`, project);
  }

  find(id: string): Observable<IProject> {
    return this.http.get<IProject>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IProject[]>> {
    const options = createRequestOption(req);
    return this.http.get<IProject[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getProjectIdentifier(project: Pick<IProject, 'id'>): string {
    return project.id;
  }

  compareProject(o1: Pick<IProject, 'id'> | null, o2: Pick<IProject, 'id'> | null): boolean {
    return o1 && o2 ? this.getProjectIdentifier(o1) === this.getProjectIdentifier(o2) : o1 === o2;
  }

  addProjectToCollectionIfMissing<Type extends Pick<IProject, 'id'>>(
    projectCollection: Type[],
    ...projectsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const projects: Type[] = projectsToCheck.filter(isPresent);
    if (projects.length > 0) {
      const projectCollectionIdentifiers = projectCollection.map(projectItem => this.getProjectIdentifier(projectItem));
      const projectsToAdd = projects.filter(projectItem => {
        const projectIdentifier = this.getProjectIdentifier(projectItem);
        if (projectCollectionIdentifiers.includes(projectIdentifier)) {
          return false;
        }
        projectCollectionIdentifiers.push(projectIdentifier);
        return true;
      });
      return [...projectsToAdd, ...projectCollection];
    }
    return projectCollection;
  }
}
