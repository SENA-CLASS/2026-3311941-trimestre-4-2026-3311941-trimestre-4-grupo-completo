import { HttpClient, HttpResponse, httpResource } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';

import dayjs from 'dayjs/esm';
import { Observable, map } from 'rxjs';

import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { isPresent } from 'app/core/util/operators';
import { ILogError, NewLogError } from '../log-error.model';

export type PartialUpdateLogError = Partial<ILogError> & Pick<ILogError, 'id'>;

type RestOf<T extends ILogError | NewLogError> = Omit<T, 'dateError'> & {
  dateError?: string | null;
};

export type RestLogError = RestOf<ILogError>;

export type NewRestLogError = RestOf<NewLogError>;

export type PartialUpdateRestLogError = RestOf<PartialUpdateLogError>;

@Injectable()
export class LogErrorsService {
  readonly logErrorsParams = signal<Record<string, string | number | boolean | readonly (string | number | boolean)[]> | undefined>(
    undefined,
  );
  readonly logErrorsResource = httpResource<RestLogError[]>(() => {
    const params = this.logErrorsParams();
    if (!params) {
      return undefined;
    }
    return { url: this.resourceUrl, params };
  });
  /**
   * This signal holds the list of logError that have been fetched. It is updated when the logErrorsResource emits a new value.
   * In case of error while fetching the logErrors, the signal is set to an empty array.
   */
  readonly logErrors = computed(() =>
    (this.logErrorsResource.hasValue() ? this.logErrorsResource.value() : []).map(item => this.convertValueFromServer(item)),
  );
  protected readonly applicationConfigService = inject(ApplicationConfigService);
  protected readonly resourceUrl = this.applicationConfigService.getEndpointFor('api/log-errors');

  protected convertValueFromServer(restLogError: RestLogError): ILogError {
    return {
      ...restLogError,
      dateError: restLogError.dateError ? dayjs(restLogError.dateError) : undefined,
    };
  }
}

@Injectable({ providedIn: 'root' })
export class LogErrorService extends LogErrorsService {
  protected readonly http = inject(HttpClient);

  create(logError: NewLogError): Observable<ILogError> {
    const copy = this.convertValueFromClient(logError);
    return this.http.post<RestLogError>(this.resourceUrl, copy).pipe(map(res => this.convertResponseFromServer(res)));
  }

  update(logError: ILogError): Observable<ILogError> {
    const copy = this.convertValueFromClient(logError);
    return this.http
      .put<RestLogError>(`${this.resourceUrl}/${encodeURIComponent(this.getLogErrorIdentifier(logError))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  partialUpdate(logError: PartialUpdateLogError): Observable<ILogError> {
    const copy = this.convertValueFromClient(logError);
    return this.http
      .patch<RestLogError>(`${this.resourceUrl}/${encodeURIComponent(this.getLogErrorIdentifier(logError))}`, copy)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  find(id: string): Observable<ILogError> {
    return this.http
      .get<RestLogError>(`${this.resourceUrl}/${encodeURIComponent(id)}`)
      .pipe(map(res => this.convertResponseFromServer(res)));
  }

  query(req?: any): Observable<HttpResponse<ILogError[]>> {
    const options = createRequestOption(req);
    return this.http
      .get<RestLogError[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map(res => res.clone({ body: this.convertResponseArrayFromServer(res.body!) })));
  }

  delete(id: string): Observable<undefined> {
    return this.http.delete<undefined>(`${this.resourceUrl}/${encodeURIComponent(id)}`);
  }

  getLogErrorIdentifier(logError: Pick<ILogError, 'id'>): string {
    return logError.id;
  }

  compareLogError(o1: Pick<ILogError, 'id'> | null, o2: Pick<ILogError, 'id'> | null): boolean {
    return o1 && o2 ? this.getLogErrorIdentifier(o1) === this.getLogErrorIdentifier(o2) : o1 === o2;
  }

  addLogErrorToCollectionIfMissing<Type extends Pick<ILogError, 'id'>>(
    logErrorCollection: Type[],
    ...logErrorsToCheck: (Type | null | undefined)[]
  ): Type[] {
    const logErrors: Type[] = logErrorsToCheck.filter(isPresent);
    if (logErrors.length > 0) {
      const logErrorCollectionIdentifiers = logErrorCollection.map(logErrorItem => this.getLogErrorIdentifier(logErrorItem));
      const logErrorsToAdd = logErrors.filter(logErrorItem => {
        const logErrorIdentifier = this.getLogErrorIdentifier(logErrorItem);
        if (logErrorCollectionIdentifiers.includes(logErrorIdentifier)) {
          return false;
        }
        logErrorCollectionIdentifiers.push(logErrorIdentifier);
        return true;
      });
      return [...logErrorsToAdd, ...logErrorCollection];
    }
    return logErrorCollection;
  }

  protected convertValueFromClient<T extends ILogError | NewLogError | PartialUpdateLogError>(logError: T): RestOf<T> {
    return {
      ...logError,
      dateError: logError.dateError?.toJSON() ?? null,
    };
  }

  protected convertResponseFromServer(res: RestLogError): ILogError {
    return this.convertValueFromServer(res);
  }

  protected convertResponseArrayFromServer(res: RestLogError[]): ILogError[] {
    return res.map(item => this.convertValueFromServer(item));
  }
}
