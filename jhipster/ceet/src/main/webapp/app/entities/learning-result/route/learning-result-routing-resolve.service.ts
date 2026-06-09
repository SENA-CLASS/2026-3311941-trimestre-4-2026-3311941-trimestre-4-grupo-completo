import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ILearningResult } from '../learning-result.model';
import { LearningResultService } from '../service/learning-result.service';

const learningResultResolve = (route: ActivatedRouteSnapshot): Observable<null | ILearningResult> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(LearningResultService);
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

export default learningResultResolve;
