import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICoursePlanning } from '../course-planning.model';

@Component({
  selector: 'ceet-course-planning-detail',
  templateUrl: './course-planning-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class CoursePlanningDetail {
  readonly coursePlanning = input<ICoursePlanning | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
