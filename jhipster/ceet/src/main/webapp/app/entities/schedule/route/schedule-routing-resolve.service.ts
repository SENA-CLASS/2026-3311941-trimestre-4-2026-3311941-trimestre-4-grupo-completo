import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ISchedule } from '../schedule.model';
import { ScheduleService } from '../service/schedule.service';

const scheduleResolve = (route: ActivatedRouteSnapshot): Observable<null | ISchedule> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(ScheduleService);
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

export default scheduleResolve;
