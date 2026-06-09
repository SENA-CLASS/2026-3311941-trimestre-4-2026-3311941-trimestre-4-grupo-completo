import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IScheduleVersion } from '../schedule-version.model';
import { ScheduleVersionService } from '../service/schedule-version.service';

const scheduleVersionResolve = (route: ActivatedRouteSnapshot): Observable<null | IScheduleVersion> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(ScheduleVersionService);
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

export default scheduleVersionResolve;
