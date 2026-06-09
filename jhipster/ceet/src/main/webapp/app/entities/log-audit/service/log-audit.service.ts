import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ILogAudit, NewLogAudit } from '../log-audit.model';

export type PartialUpdateLogAudit = Partial<ILogAudit> & Pick<ILogAudit, 'id'>;

type RestOf<T extends ILogAudit | NewLogAudit> = Omit<T, 'dateAudit'> & {
  dateAudit?: string | null;
};

export type RestLogAudit = RestOf<ILogAudit>;

export type NewRestLogAudit = RestOf<NewLogAudit>;

export type PartialUpdateRestLogAudit = RestOf<PartialUpdateLogAudit>;

@Injectable()
export class LogAuditsService {
  readonly logAuditsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly logAuditsResource = httpResource<RestLogAudit[]>(() => {
    const params = this.logAuditsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of logAudit that have been fetched. It is updated when the logAuditsResource emits a new value.
   * In case of error while fetching the logAudits, the signal is set to an empty array.
   */
  readonly logAudits = computed(() =>
    (this.logAuditsResource.hasValue() ? this.logAuditsResource.value() : []).map(item => this.convertValueFromServer(item)),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/log-audits');

  protected convertValueFromServer(restLogAudit: RestLogAudit): ILogAudit {
    return {
      ...restLogAudit,
      dateAudit: restLogAudit.dateAudit ? dayjs(restLogAudit.dateAudit) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class LogAuditService extends LogAuditsService {
  protected readonly http = inject(HttpClient);

  create(logAudit: NewLogAudit): Observable<ILogAudit> {
    const copy = this.convertValueFromClient(logAudit);
    return this.http.post<RestLogAudit>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logAudit: ILogAudit): Observable<ILogAudit> {
    const copy = this.convertValueFromClient(logAudit);
    return this.http
      .put<RestLogAudit>(`${this.resourceUrl}/${encodeURIComponent(this.getLogAuditIdentifier(logAudit))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logAudit: PartialUpdateLogAudit): Observable<ILogAudit> {
    const copy = this.convertValueFromClient(logAudit);
    return this.http
      .patch<RestLogAudit>(`${this.resourceUrl}/${encodeURIComponent(this.getLogAuditIdentifier(logAudit))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<ILogAudit> {
    return this.http
      .get<RestLogAudit>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<ILogAudit[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogAudit[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getLogAuditIdentifier(logAudit: Pick<ILogAudit, 'id'>): string {
    return logAudit.id;
  }

  compareLogAudit(o1: Pick<ILogAudit, 'id'> | null, o2: Pick<ILogAudit, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogAuditIdentifier(o1) === this.getLogAuditIdentifier(o2) : o1 === o2;
  }

  addLogAuditToCollectionIfMissing<Type extends Pick<ILogAudit, 'id'>>(
    logAuditCollection: Type[],
    ...logAuditsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logAudits: Type[] = logAuditsToCheck.filter(isPresent);
    if (logAudits.length > 0) {
      const logAuditCollectionIdentifiers = logAuditCollection.map(logAuditItem => this.getLogAuditIdentifier(logAuditItem));
      const logAuditsToAdd = logAudits.filter(logAuditItem => {
        const logAuditIdentifier = this.getLogAuditIdentifier(logAuditItem);
        if (logAuditCollectionIdentifiers.includes(logAuditIdentifier)) {
          return false;
        }
        logAuditCollectionIdentifiers.push(logAuditIdentifier);
        return true;
      });
      return [...logAuditsToAdd, ...logAuditCollection];
    }
    return logAuditCollection;
  }

  protected convertValueFromClient<T extends ILogAudit | NewLogAudit | PartialUpdateLogAudit>(logAudit: T): RestOf<T> {
    return {
      ...logAudit,
      dateAudit: logAudit.dateAudit?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestLogAudit): ILogAudit {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestLogAudit[]): ILogAudit[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
