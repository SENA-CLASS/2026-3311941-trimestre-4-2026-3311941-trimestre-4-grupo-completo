import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IProjectPhase } from '../project-phase.model';
import { ProjectPhaseService } from '../service/project-phase.service';

const projectPhaseResolve = (route: ActivatedRouteSnapshot): Observable<null | IProjectPhase> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(ProjectPhaseService);
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

export default projectPhaseResolve;
