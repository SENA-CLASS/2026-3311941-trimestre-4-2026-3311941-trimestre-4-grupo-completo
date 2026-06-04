import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { IInstructorWorkingDay, NewInstructorWorkingDay } from '../instructor-working-day.model';

export type PartialUpdateInstructorWorkingDay = Partial<IInstructorWorkingDay> & Pick<IInstructorWorkingDay, 'id'>;

@Injectable()
export class InstructorWorkingDaysService {
  readonly instructorWorkingDaysParams = signal<
    Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined
  >(undefined);
  readonly instructorWorkingDaysResource = httpResource<IInstructorWorkingDay[]>(() => {
    const params = this.instructorWorkingDaysParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of instructorWorkingDay that have been fetched. It is updated when the instructorWorkingDaysResource emits a new value.
   * In case of error while fetching the instructorWorkingDays, the signal is set to an empty array.
   */
  readonly instructorWorkingDays = computed(() =>
    this.instructorWorkingDaysResource.hasValue() ? this.instructorWorkingDaysResource.value() : [],
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/instructor-working-days');
}

@Injectable({ providedIn: 'root' })
export class InstructorWorkingDayService extends InstructorWorkingDaysService {
  protected readonly http = inject(HttpClient);

  create(instructorWorkingDay: NewInstructorWorkingDay): Observable<IInstructorWorkingDay> {
    return this.http.post<IInstructorWorkingDay>(this.resourceUrl, instructorWorkingDay);
  }

  update(instructorWorkingDay: IInstructorWorkingDay): Observable<IInstructorWorkingDay> {
    return this.http.put<IInstructorWorkingDay>(
      `${this.resourceUrl}/${encodeURIComponent(this.getInstructorWorkingDayIdentifier(instructorWorkingDay))}`,
      instructorWorkingDay,
    );
  }

  partialUpdate(instructorWorkingDay: PartialUpdateInstructorWorkingDay): Observable<IInstructorWorkingDay> {
    return this.http.patch<IInstructorWorkingDay>(
      `${this.resourceUrl}/${encodeURIComponent(this.getInstructorWorkingDayIdentifier(instructorWorkingDay))}`,
      instructorWorkingDay,
    );
  }

  find(id: string): Observable<IInstructorWorkingDay> {
    return this.http.get<IInstructorWorkingDay>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<IInstructorWorkingDay[]>> {
    const options = createRequestOption(req);
    return this.http.get<IInstructorWorkingDay[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getInstructorWorkingDayIdentifier(instructorWorkingDay: Pick<IInstructorWorkingDay, 'id'>): string {
    return instructorWorkingDay.id;
  }

  compareInstructorWorkingDay(o1: Pick<IInstructorWorkingDay, 'id'> | null, o2: Pick<IInstructorWorkingDay, 'id'> | null): boolean {
    return o1 && o2 ? this.getInstructorWorkingDayIdentifier(o1) === this.getInstructorWorkingDayIdentifier(o2) : o1 === o2;
  }

  addInstructorWorkingDayToCollectionIfMissing<Type extends Pick<IInstructorWorkingDay, 'id'>>(
    instructorWorkingDayCollection: Type[],
    ...instructorWorkingDaysToCheck: (Type | null | undefined)[]
  ): Type[] {
    const instructorWorkingDays: Type[] = instructorWorkingDaysToCheck.filter(isPresent);
    if (instructorWorkingDays.length > 0) {
      const instructorWorkingDayCollectionIdentifiers = instructorWorkingDayCollection.map(instructorWorkingDayItem =>
        this.getInstructorWorkingDayIdentifier(instructorWorkingDayItem),
      );
      const instructorWorkingDaysToAdd = instructorWorkingDays.filter(instructorWorkingDayItem => {
        const instructorWorkingDayIdentifier = this.getInstructorWorkingDayIdentifier(instructorWorkingDayItem);
        if (instructorWorkingDayCollectionIdentifiers.includes(instructorWorkingDayIdentifier)) {
          return false;
        }
        instructorWorkingDayCollectionIdentifiers.push(instructorWorkingDayIdentifier);
        return true;
      });
      return [...instructorWorkingDaysToAdd, ...instructorWorkingDayCollection];
    }
    return instructorWorkingDayCollection;
  }
}
