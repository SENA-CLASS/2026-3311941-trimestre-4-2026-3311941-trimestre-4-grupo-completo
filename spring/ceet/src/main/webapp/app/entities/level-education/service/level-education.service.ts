import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import { Observable } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ILevelEducation, NewLevelEducation } from '../level-education.model';

export type PartialUpdateLevelEducation = Partial<ILevelEducation> & Pick<ILevelEducation, 'id'>;

@Injectable()
export class LevelEducationsService {
  readonly levelEducationsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly levelEducationsResource = httpResource<ILevelEducation[]>(() => {
    const params = this.levelEducationsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of levelEducation that have been fetched. It is updated when the levelEducationsResource emits a new value.
   * In case of error while fetching the levelEducations, the signal is set to an empty array.
   */
  readonly levelEducations = computed(() => (this.levelEducationsResource.hasValue() ? this.levelEducationsResource.value() : []));
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/level-educations');
}

@Injectable({ providedIn: 'root' })
export class LevelEducationService extends LevelEducationsService {
  protected readonly http = inject(HttpClient);

  create(levelEducation: NewLevelEducation): Observable<ILevelEducation> {
    return this.http.post<ILevelEducation>(this.resourceUrl, levelEducation);
  }

  update(levelEducation: ILevelEducation): Observable<ILevelEducation> {
    return this.http.put<ILevelEducation>(
      `${this.resourceUrl}/${encodeURIComponent(this.getLevelEducationIdentifier(levelEducation))}`,
      levelEducation,
    );
  }

  partialUpdate(levelEducation: PartialUpdateLevelEducation): Observable<ILevelEducation> {
    return this.http.patch<ILevelEducation>(
      `${this.resourceUrl}/${encodeURIComponent(this.getLevelEducationIdentifier(levelEducation))}`,
      levelEducation,
    );
  }

  find(id: string): Observable<ILevelEducation> {
    return this.http.get<ILevelEducation>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  query(req?: any): Observable<HttpResponse<ILevelEducation[]>> {
    const options = createRequestOption(req);
    return this.http.get<ILevelEducation[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getLevelEducationIdentifier(levelEducation: Pick<ILevelEducation, 'id'>): string {
    return levelEducation.id;
  }

  compareLevelEducation(o1: Pick<ILevelEducation, 'id'> | null, o2: Pick<ILevelEducation, 'id'> | null): boolean {
    return o1 && o2 ? this.getLevelEducationIdentifier(o1) === this.getLevelEducationIdentifier(o2) : o1 === o2;
  }

  addLevelEducationToCollectionIfMissing<Type extends Pick<ILevelEducation, 'id'>>(
    levelEducationCollection: Type[],
    ...levelEducationsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const levelEducations: Type[] = levelEducationsToCheck.filter(isPresent);
    if (levelEducations.length > 0) {
      const levelEducationCollectionIdentifiers = levelEducationCollection.map(levelEducationItem =>
        this.getLevelEducationIdentifier(levelEducationItem),
      );
      const levelEducationsToAdd = levelEducations.filter(levelEducationItem => {
        const levelEducationIdentifier = this.getLevelEducationIdentifier(levelEducationItem);
        if (levelEducationCollectionIdentifiers.includes(levelEducationIdentifier)) {
          return false;
        }
        levelEducationCollectionIdentifiers.push(levelEducationIdentifier);
        return true;
      });
      return [...levelEducationsToAdd, ...levelEducationCollection];
    }
    return levelEducationCollection;
  }
}
