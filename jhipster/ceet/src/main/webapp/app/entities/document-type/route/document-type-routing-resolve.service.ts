import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';

import { EMPTY, Observable, catchError, of } from 'rxjs';

import { IDocumentType } from '../document-type.model';
import { DocumentTypeService } from '../service/document-type.service';

const documentTypeResolve = (route: ActivatedRouteSnapshot): Observable<null | IDocumentType> => {
  const { id } = route.params;
  if (id) {
    const router = inject(Router);
    const service = inject(DocumentTypeService);
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

export default documentTypeResolve;
