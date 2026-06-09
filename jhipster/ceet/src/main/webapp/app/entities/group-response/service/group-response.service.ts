import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IGroupResponse, NewGroupResponse } from '../group-response.model';

export type PartialUpdateGroupResponse = Partial<IGroupResponse> & Pick<IGroupResponse, 'id'>;

type RestOf<T extends IGroupResponse | NewGroupResponse> = Omit<T, 'evaluationDate'> & {
  evaluationDate?: string | null;
};

export type RestGroupResponse = RestOf<IGroupResponse>;

export type NewRestGroupResponse = RestOf<NewGroupResponse>;

export type PartialUpdateRestGroupResponse = RestOf<PartialUpdateGroupResponse>;

@Injectable()
export class GroupResponsesService {
  readonly groupResponsesParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly groupResponsesResource = httpResource<RestGroupResponse[]>(() => {
    const params = this.groupResponsesParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of groupResponse that have been fetched. It is updated when the groupResponsesResource emits a new value.
   * In case of error while fetching the groupResponses, the signal is set to an empty array.
   */
  readonly groupResponses = computed(() =>
    (this.groupResponsesResource.hasValue() ? this.groupResponsesResource.value() : []).map(item => this.convertValueFromServer(item)),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/group-responses');

  protected convertValueFromServer(restGroupResponse: RestGroupResponse): IGroupResponse {
    return {
      ...restGroupResponse,
      evaluationDate: restGroupResponse.evaluationDate ? dayjs(restGroupResponse.evaluationDate) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class GroupResponseService extends GroupResponsesService {
  protected readonly http = inject(HttpClient);

  create(groupResponse: NewGroupResponse): Observable<IGroupResponse> {
    const copy = this.convertValueFromClient(groupResponse);
    return this.http.post<RestGroupResponse>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(groupResponse: IGroupResponse): Observable<IGroupResponse> {
    const copy = this.convertValueFromClient(groupResponse);
    return this.http
      .put<RestGroupResponse>(`${this.resourceUrl}/${encodeURIComponent(this.getGroupResponseIdentifier(groupResponse))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(groupResponse: PartialUpdateGroupResponse): Observable<IGroupResponse> {
    const copy = this.convertValueFromClient(groupResponse);
    return this.http
      .patch<RestGroupResponse>(`${this.resourceUrl}/${encodeURIComponent(this.getGroupResponseIdentifier(groupResponse))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<IGroupResponse> {
    return this.http
      .get<RestGroupResponse>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IGroupResponse[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestGroupResponse[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getGroupResponseIdentifier(groupResponse: Pick<IGroupResponse, 'id'>): string {
    return groupResponse.id;
  }

  compareGroupResponse(o1: Pick<IGroupResponse, 'id'> | null, o2: Pick<IGroupResponse, 'id'> | null): boolean {
    return o1 && o2 ? this.getGroupResponseIdentifier(o1) === this.getGroupResponseIdentifier(o2) : o1 === o2;
  }

  addGroupResponseToCollectionIfMissing<Type extends Pick<IGroupResponse, 'id'>>(
    groupResponseCollection: Type[],
    ...groupResponsesToCheck: (Type | null | undefined)[]
  ): Type[] {
    const groupResponses: Type[] = groupResponsesToCheck.filter(isPresent);
    if (groupResponses.length > 0) {
      const groupResponseCollectionIdentifiers = groupResponseCollection.map(groupResponseItem =>
        this.getGroupResponseIdentifier(groupResponseItem),
      );
      const groupResponsesToAdd = groupResponses.filter(groupResponseItem => {
        const groupResponseIdentifier = this.getGroupResponseIdentifier(groupResponseItem);
        if (groupResponseCollectionIdentifiers.includes(groupResponseIdentifier)) {
          return false;
        }
        groupResponseCollectionIdentifiers.push(groupResponseIdentifier);
        return true;
      });
      return [...groupResponsesToAdd, ...groupResponseCollection];
    }
    return groupResponseCollection;
  }

  protected convertValueFromClient<T extends IGroupResponse | NewGroupResponse | PartialUpdateGroupResponse>(groupResponse: T): RestOf<T> {
    return {
      ...groupResponse,
      evaluationDate: groupResponse.evaluationDate?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestGroupResponse): IGroupResponse {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestGroupResponse[]): IGroupResponse[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
