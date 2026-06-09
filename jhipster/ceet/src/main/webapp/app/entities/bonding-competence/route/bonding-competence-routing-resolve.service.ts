import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IBondingCompetence } from '../bonding-competence.model';
import { BondingCompetenceService } from '../service/bonding-competence.service';

const bondingCompetenceResolve = (route: ActivatedRouteSnapshot): Observable<null | IBondingCompetence> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(BondingCompetenceService);
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

export default bondingCompetenceResolve;
