import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { DATE_FORMAT } from 'app/config/input.constants';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IBondingInstructor, NewBondingInstructor } from '../bonding-instructor.model';

export type PartialUpdateBondingInstructor = Partial<IBondingInstructor> & Pick<IBondingInstructor, 'id'>;

type RestOf<T extends IBondingInstructor | NewBondingInstructor> = Omit<T, 'startTime' | 'endTime'> & {
  startTime?: string | null;
  endTime?: string | null;
};

export type RestBondingInstructor = RestOf<IBondingInstructor>;

export type NewRestBondingInstructor = RestOf<NewBondingInstructor>;

export type PartialUpdateRestBondingInstructor = RestOf<PartialUpdateBondingInstructor>;

@Injectable()
export class BondingInstructorsService {
  readonly bondingInstructorsParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly bondingInstructorsResource = httpResource<RestBondingInstructor[]>(() => {
    const params = this.bondingInstructorsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of bondingInstructor that have been fetched. It is updated when the bondingInstructorsResource emits a new value.
   * In case of error while fetching the bondingInstructors, the signal is set to an empty array.
   */
  readonly bondingInstructors = computed(() =>
    (this.bondingInstructorsResource.hasValue() ? this.bondingInstructorsResource.value() : []).map(item =>
      this.convertValueFromServer(item),
    ),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/bonding-instructors');

  protected convertValueFromServer(restBondingInstructor: RestBondingInstructor): IBondingInstructor {
    return {
      ...restBondingInstructor,
      startTime: restBondingInstructor.startTime ? dayjs(restBondingInstructor.startTime) : undefined,
      endTime: restBondingInstructor.endTime ? dayjs(restBondingInstructor.endTime) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class BondingInstructorService extends BondingInstructorsService {
  protected readonly http = inject(HttpClient);

  create(bondingInstructor: NewBondingInstructor): Observable<IBondingInstructor> {
    const copy = this.convertValueFromClient(bondingInstructor);
    return this.http.post<RestBondingInstructor>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(bondingInstructor: IBondingInstructor): Observable<IBondingInstructor> {
    const copy = this.convertValueFromClient(bondingInstructor);
    return this.http
      .put<RestBondingInstructor>(`${this.resourceUrl}/${encodeURIComponent(this.getBondingInstructorIdentifier(bondingInstructor))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(bondingInstructor: PartialUpdateBondingInstructor): Observable<IBondingInstructor> {
    const copy = this.convertValueFromClient(bondingInstructor);
    return this.http
      .patch<RestBondingInstructor>(
        `${this.resourceUrl}/${encodeURIComponent(this.getBondingInstructorIdentifier(bondingInstructor))}`,
        copy,
      )
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<IBondingInstructor> {
    return this.http
      .get<RestBondingInstructor>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<IBondingInstructor[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestBondingInstructor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getBondingInstructorIdentifier(bondingInstructor: Pick<IBondingInstructor, 'id'>): string {
    return bondingInstructor.id;
  }

  compareBondingInstructor(o1: Pick<IBondingInstructor, 'id'> | null, o2: Pick<IBondingInstructor, 'id'> | null): boolean {
    return o1 && o2 ? this.getBondingInstructorIdentifier(o1) === this.getBondingInstructorIdentifier(o2) : o1 === o2;
  }

  addBondingInstructorToCollectionIfMissing<Type extends Pick<IBondingInstructor, 'id'>>(
    bondingInstructorCollection: Type[],
    ...bondingInstructorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const bondingInstructors: Type[] = bondingInstructorsToCheck.filter(isPresent);
    if (bondingInstructors.length > 0) {
      const bondingInstructorCollectionIdentifiers = bondingInstructorCollection.map(bondingInstructorItem =>
        this.getBondingInstructorIdentifier(bondingInstructorItem),
      );
      const bondingInstructorsToAdd = bondingInstructors.filter(bondingInstructorItem => {
        const bondingInstructorIdentifier = this.getBondingInstructorIdentifier(bondingInstructorItem);
        if (bondingInstructorCollectionIdentifiers.includes(bondingInstructorIdentifier)) {
          return false;
        }
        bondingInstructorCollectionIdentifiers.push(bondingInstructorIdentifier);
        return true;
      });
      return [...bondingInstructorsToAdd, ...bondingInstructorCollection];
    }
    return bondingInstructorCollection;
  }

  protected convertValueFromClient<T extends IBondingInstructor | NewBondingInstructor | PartialUpdateBondingInstructor>(
    bondingInstructor: T,
  ): RestOf<T> {
    return {
      ...bondingInstructor,
      startTime: bondingInstructor.startTime?.format(DATE_FORMAT) ?? null,
      endTime: bondingInstructor.endTime?.format(DATE_FORMAT) ?? null,
    };
  }

  protected convertResponseFromServer(res: RestBondingInstructor): IBondingInstructor {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestBondingInstructor[]): IBondingInstructor[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
