import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ICoursePlanning } from '../course-planning.model';
import { CoursePlanningService } from '../service/course-planning.service';

const coursePlanningResolve = (route: ActivatedRouteSnapshot): Observable<null | ICoursePlanning> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(CoursePlanningService);
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

export default coursePlanningResolve;
