import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ICourseStatus } from '../course-status.model';
import { CourseStatusService } from '../service/course-status.service';

const courseStatusResolve = (route: ActivatedRouteSnapshot): Observable<null | ICourseStatus> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(CourseStatusService);
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

export default courseStatusResolve;
