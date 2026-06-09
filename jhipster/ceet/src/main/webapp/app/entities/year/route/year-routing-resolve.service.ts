import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { YearService } from '../service/year.service';
import { IYear } from '../year.model';

const yearResolve = (route: ActivatedRouteSnapshot): Observable<null | IYear> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(YearService);
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

export default yearResolve;
