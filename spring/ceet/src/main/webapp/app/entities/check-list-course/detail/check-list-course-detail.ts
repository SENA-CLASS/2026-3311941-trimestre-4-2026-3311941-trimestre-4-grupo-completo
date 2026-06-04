import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ICheckListCourse } from '../check-list-course.model';

@Component({
  selector: 'ceet-check-list-course-detail',
  templateUrl: './check-list-course-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class CheckListCourseDetail {
  readonly checkListCourse = input<ICheckListCourse | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
