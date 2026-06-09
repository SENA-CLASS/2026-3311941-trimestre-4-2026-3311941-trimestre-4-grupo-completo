import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IObservationResponse } from '../observation-response.model';
import { ObservationResponseService } from '../service/observation-response.service';

const observationResponseResolve = (route: ActivatedRouteSnapshot): Observable<null | IObservationResponse> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(ObservationResponseService);
    return service.find(id).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          router.navigate(['404']);
        } else {
          router.navigate(['error']);
        }
        return EMPTY;
      }),
    );
  }

  return of(null);
};

export default observationResponseResolve;
