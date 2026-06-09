import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ViewedResultService } from '../service/viewed-result.service';
import { IViewedResult } from '../viewed-result.model';

const viewedResultResolve = (route: ActivatedRouteSnapshot): Observable<null | IViewedResult> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(ViewedResultService);
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

export default viewedResultResolve;
