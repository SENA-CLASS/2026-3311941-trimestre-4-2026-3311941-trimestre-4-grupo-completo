import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { ILogAudit } from '../log-audit.model';
import { LogAuditService } from '../service/log-audit.service';

const logAuditResolve = (route: ActivatedRouteSnapshot): Observable<null | ILogAudit> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(LogAuditService);
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

export default logAuditResolve;
