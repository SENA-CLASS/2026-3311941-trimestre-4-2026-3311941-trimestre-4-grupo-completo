import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IBonding } from '../bonding.model';
import { BondingService } from '../service/bonding.service';

const bondingResolve = (route: ActivatedRouteSnapshot): Observable<null | IBonding> => {
  const id = route.params.id;
  if (id) {
    const router = inject(Router);
    const service = inject(BondingService);
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

export default bondingResolve;
