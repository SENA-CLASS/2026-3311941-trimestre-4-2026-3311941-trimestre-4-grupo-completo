import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IPlanning, NewPlanning } from '../planning.model';

export type PartialUpdatePlanning = Partial<IPlanning> & Pick<IPlanning, 'id'>;

type RestOf<T extends IPlanning | NewPlanning> = Omit<T, 'planningDate'> & {
  planningDate?: string | null;
};

export type RestPlanning = RestOf<IPlanning>;

export type NewRestPlanning = RestOf<NewPlanning>;

export type PartialUpdateRestPlanning = RestOf<PartialUpdatePlanning>;

@Injectable()
export class PlanningsService {
  readonly planningsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly planningsResource = httpResource<RestPlanning[]>(() => {
    const params = this.planningsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of planning that have been fetched. It is updated when the planningsResource emits a new value.
   * In case of error while fetching the plannings, the signal is set to an empty array.
   */
  readonly plannings = computed(() =>
    (this.planningsResource.hasValue() ? this.planningsResource.value() : []).map(item => this.convertValueFromServer(item)),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/plannings');

  protected convertValueFromServer(restPlanning: RestPlanning): IPlanning {
    return {
      ...restPlanning,
      planningDate: restPlanning.planningDate ? dayjs(restPlanning.planningDate) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class PlanningService extends PlanningsService {
  protected readonly http = inject(HttpClient);

  create(planning: NewPlanning): Observable<IPlanning> {
    const copy = this.convertValueFromClient(planning);
    return this.http.post<RestPlanning>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(planning: IPlanning): Observable<IPlanning> {
    const copy = this.convertValueFromClient(planning);
    return this.http
      .put<RestPlanning>(`${this.resourceUrl}/${encodeURIComponent(this.getPlanningIdentifier(planning))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(planning: PartialUpdatePlanning): Observable<IPlanning> {
    const copy = this.convertValueFromClient(planning);
    return this.http
      .patch<RestPlanning>(`${this.resourceUrl}/${encodeURIComponent(this.getPlanningIdentifier(planning))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<IPlanning> {
    return this.http
      .get<RestPlanning>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IPlanning[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestPlanning[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getPlanningIdentifier(planning: Pick<IPlanning, 'id'>): string {
    return planning.id;
  }

  comparePlanning(o1: Pick<IPlanning, 'id'> | null, o2: Pick<IPlanning, 'id'> | null): boolean {
    return o1 && o2 ? this.getPlanningIdentifier(o1) === this.getPlanningIdentifier(o2) : o1 === o2;
  }

  addPlanningToCollectionIfMissing<Type extends Pick<IPlanning, 'id'>>(
    planningCollection: Type[],
    ...planningsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const plannings: Type[] = planningsToCheck.filter(isPresent);
    if (plannings.length > 0) {
      const planningCollectionIdentifiers = planningCollection.map(planningItem => this.getPlanningIdentifier(planningItem));
      const planningsToAdd = plannings.filter(planningItem => {
        const planningIdentifier = this.getPlanningIdentifier(planningItem);
        if (planningCollectionIdentifiers.includes(planningIdentifier)) {
          return false;
        }
        planningCollectionIdentifiers.push(planningIdentifier);
        return true;
      });
      return [...planningsToAdd, ...planningCollection];
    }
    return planningCollection;
  }

  protected convertValueFromClient<T extends IPlanning | NewPlanning | PartialUpdatePlanning>(planning: T): RestOf<T> {
    return {
      ...planning,
      planningDate: planning.planningDate?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestPlanning): IPlanning {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestPlanning[]): IPlanning[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
