import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ICourseTrimester } from '../course-trimester.model';
import { CourseTrimesterService } from '../service/course-trimester.service';

const courseTrimesterResolve = (route: ActivatedRouteSnapshot): Observable<null | ICourseTrimester> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(CourseTrimesterService);
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

export default courseTrimesterResolve;
