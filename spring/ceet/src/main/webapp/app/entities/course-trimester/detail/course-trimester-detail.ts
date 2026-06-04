import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICourseTrimester } from '../course-trimester.model';

@Component({
  selector: 'ceet-course-trimester-detail',
  templateUrl: './course-trimester-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class CourseTrimesterDetail {
  readonly courseTrimester = input<ICourseTrimester | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
