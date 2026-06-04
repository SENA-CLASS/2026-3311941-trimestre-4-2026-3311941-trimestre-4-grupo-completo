import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IWorkingDayCourse } from '../working-day-course.model';

@Component({
  selector: 'ceet-working-day-course-detail',
  templateUrl: './working-day-course-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class WorkingDayCourseDetail {
  readonly workingDayCourse = input<IWorkingDayCourse | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
