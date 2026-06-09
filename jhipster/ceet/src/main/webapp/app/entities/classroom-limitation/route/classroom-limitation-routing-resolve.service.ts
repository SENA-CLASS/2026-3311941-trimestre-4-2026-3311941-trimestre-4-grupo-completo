import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IClassroomLimitation } from '../classroom-limitation.model';
import { ClassroomLimitationService } from '../service/classroom-limitation.service';

const classroomLimitationResolve = (route: ActivatedRouteSnapshot): Observable<null | IClassroomLimitation> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(ClassroomLimitationService);
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

export default classroomLimitationResolve;
