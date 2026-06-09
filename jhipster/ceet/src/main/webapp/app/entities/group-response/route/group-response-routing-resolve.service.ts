import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IGroupResponse } from '../group-response.model';
import { GroupResponseService } from '../service/group-response.service';

const groupResponseResolve = (route: ActivatedRouteSnapshot): Observable<null | IGroupResponse> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(GroupResponseService);
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

export default groupResponseResolve;
