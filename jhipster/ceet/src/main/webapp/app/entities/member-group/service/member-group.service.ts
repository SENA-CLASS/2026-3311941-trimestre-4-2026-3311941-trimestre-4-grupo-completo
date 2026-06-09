import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IMemberGroup, NewMemberGroup } from '../member-group.model';

export type PartialUpdateMemberGroup = Partial<IMemberGroup> & Pick<IMemberGroup, 'id'>;

@Injectable()
export class MemberGroupsService {
  readonly memberGroupsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly memberGroupsResource = httpResource<IMemberGroup[]>(() => {
    const params = this.memberGroupsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of memberGroup that have been fetched. It is updated when the memberGroupsResource emits a new value.
   * In case of error while fetching the memberGroups, the signal is set to an empty array.
   */
  readonly memberGroups = computed(() => (this.memberGroupsResource.hasValue() ? this.memberGroupsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/member-groups');
}

@Injectable({ providedIn: 'root' })
export class MemberGroupService extends MemberGroupsService {
  protected readonly http = inject(HttpClient);

  create(memberGroup: NewMemberGroup): Observable<IMemberGroup> {
    return this.http.post<IMemberGroup>(this.resourceUrl, memberGroup);
  }

  update(memberGroup: IMemberGroup): Observable<IMemberGroup> {
    return this.http.put<IMemberGroup>(
      `${this.resourceUrl}/${encodeURIComponent(this.getMemberGroupIdentifier(memberGroup))}`,
      memberGroup,
    );
  }

  partialUpdate(memberGroup: PartialUpdateMemberGroup): Observable<IMemberGroup> {
    return this.http.patch<IMemberGroup>(
      `${this.resourceUrl}/${encodeURIComponent(this.getMemberGroupIdentifier(memberGroup))}`,
      memberGroup,
    );
  }

  find(id: string): Observable<IMemberGroup> {
    return this.http.get<IMemberGroup>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IMemberGroup[]>> {
    const options = createRequestOption(req);
    return this.http.get<IMemberGroup[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getMemberGroupIdentifier(memberGroup: Pick<IMemberGroup, 'id'>): string {
    return memberGroup.id;
  }

  compareMemberGroup(o1: Pick<IMemberGroup, 'id'> | null, o2: Pick<IMemberGroup, 'id'> | null): boolean {
    return o1 && o2 ? this.getMemberGroupIdentifier(o1) === this.getMemberGroupIdentifier(o2) : o1 === o2;
  }

  addMemberGroupToCollectionIfMissing<Type extends Pick<IMemberGroup, 'id'>>(
    memberGroupCollection: Type[],
    ...memberGroupsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const memberGroups: Type[] = memberGroupsToCheck.filter(isPresent);
    if (memberGroups.length > 0) {
      const memberGroupCollectionIdentifiers = memberGroupCollection.map(memberGroupItem => this.getMemberGroupIdentifier(memberGroupItem));
      const memberGroupsToAdd = memberGroups.filter(memberGroupItem => {
        const memberGroupIdentifier = this.getMemberGroupIdentifier(memberGroupItem);
        if (memberGroupCollectionIdentifiers.includes(memberGroupIdentifier)) {
          return false;
        }
        memberGroupCollectionIdentifiers.push(memberGroupIdentifier);
        return true;
      });
      return [...memberGroupsToAdd, ...memberGroupCollection];
    }
    return memberGroupCollection;
  }
}
