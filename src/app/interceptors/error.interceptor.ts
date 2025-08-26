import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarContentComponent } from '../snack-bar-content/snack-bar-content.component';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      snackBar.openFromComponent(SnackBarContentComponent, {
        data: {
          content: error.message,
          success: false,
        },
        duration: 4000,
      });

      return throwError(() => error);
    })
  );
};
