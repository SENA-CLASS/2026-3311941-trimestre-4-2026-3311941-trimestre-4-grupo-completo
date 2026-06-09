import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ILevelEducation } from '../level-education.model';
import { LevelEducationService } from '../service/level-education.service';

const levelEducationResolve = (route: ActivatedRouteSnapshot): Observable<null | ILevelEducation> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(LevelEducationService);
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

export default levelEducationResolve;
