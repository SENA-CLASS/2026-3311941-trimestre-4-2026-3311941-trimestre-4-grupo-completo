import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { TrainingStatusService } from '../service/training-status.service';
import { ITrainingStatus } from '../training-status.model';

const trainingStatusResolve = (route: ActivatedRouteSnapshot): Observable<null | ITrainingStatus> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(TrainingStatusService);
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

export default trainingStatusResolve;
