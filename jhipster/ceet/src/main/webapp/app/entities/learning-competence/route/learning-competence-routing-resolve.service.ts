import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ILearningCompetence } from '../learning-competence.model';
import { LearningCompetenceService } from '../service/learning-competence.service';

const learningCompetenceResolve = (route: ActivatedRouteSnapshot): Observable<null | ILearningCompetence> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(LearningCompetenceService);
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

export default learningCompetenceResolve;
