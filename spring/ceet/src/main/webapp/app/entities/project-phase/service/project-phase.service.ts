import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IProjectPhase, NewProjectPhase } from '../project-phase.model';

export type PartialUpdateProjectPhase = Partial<IProjectPhase> & Pick<IProjectPhase, 'id'>;

@Injectable()
export class ProjectPhasesService {
  readonly projectPhasesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly projectPhasesResource = httpResource<IProjectPhase[]>(() => {
    const params = this.projectPhasesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of projectPhase that have been fetched. It is updated when the projectPhasesResource emits a new value.
   * In case of error while fetching the projectPhases, the signal is set to an empty array.
   */
  readonly projectPhases = computed(() => (this.projectPhasesResource.hasValue() ? this.projectPhasesResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/project-phases');
}

@Injectable({ providedIn: 'root' })
export class ProjectPhaseService extends ProjectPhasesService {
  protected readonly http = inject(HttpClient);

  create(projectPhase: NewProjectPhase): Observable<IProjectPhase> {
    return this.http.post<IProjectPhase>(this.resourceUrl, projectPhase);
  }

  update(projectPhase: IProjectPhase): Observable<IProjectPhase> {
    return this.http.put<IProjectPhase>(
      `${this.resourceUrl}/${encodeURIComponent(this.getProjectPhaseIdentifier(projectPhase))}`,
      projectPhase,
    );
  }

  partialUpdate(projectPhase: PartialUpdateProjectPhase): Observable<IProjectPhase> {
    return this.http.patch<IProjectPhase>(
      `${this.resourceUrl}/${encodeURIComponent(this.getProjectPhaseIdentifier(projectPhase))}`,
      projectPhase,
    );
  }

  find(id: string): Observable<IProjectPhase> {
    return this.http.get<IProjectPhase>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IProjectPhase[]>> {
    const options = createRequestOption(req);
    return this.http.get<IProjectPhase[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getProjectPhaseIdentifier(projectPhase: Pick<IProjectPhase, 'id'>): string {
    return projectPhase.id;
  }

  compareProjectPhase(o1: Pick<IProjectPhase, 'id'> | null, o2: Pick<IProjectPhase, 'id'> | null): boolean {
    return o1 && o2 ? this.getProjectPhaseIdentifier(o1) === this.getProjectPhaseIdentifier(o2) : o1 === o2;
  }

  addProjectPhaseToCollectionIfMissing<Type extends Pick<IProjectPhase, 'id'>>(
    projectPhaseCollection: Type[],
    ...projectPhasesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const projectPhases: Type[] = projectPhasesToCheck.filter(isPresent);
    if (projectPhases.length > 0) {
      const projectPhaseCollectionIdentifiers = projectPhaseCollection.map(projectPhaseItem =>
        this.getProjectPhaseIdentifier(projectPhaseItem),
      );
      const projectPhasesToAdd = projectPhases.filter(projectPhaseItem => {
        const projectPhaseIdentifier = this.getProjectPhaseIdentifier(projectPhaseItem);
        if (projectPhaseCollectionIdentifiers.includes(projectPhaseIdentifier)) {
          return false;
        }
        projectPhaseCollectionIdentifiers.push(projectPhaseIdentifier);
        return true;
      });
      return [...projectPhasesToAdd, ...projectPhaseCollection];
    }
    return projectPhaseCollection;
  }
}
