import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { WorkingDayCourseService } from '../service/working-day-course.service';
import { IWorkingDayCourse } from '../working-day-course.model';

const workingDayCourseResolve = (route: ActivatedRouteSnapshot): Observable<null | IWorkingDayCourse> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(WorkingDayCourseService);
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

export default workingDayCourseResolve;
