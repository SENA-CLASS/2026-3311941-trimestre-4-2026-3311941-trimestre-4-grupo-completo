import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IInstructor } from '../instructor.model';

@Component({
  selector: 'ceet-instructor-detail',
  templateUrl: './instructor-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class InstructorDetail {
  readonly instructor = input<IInstructor | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
