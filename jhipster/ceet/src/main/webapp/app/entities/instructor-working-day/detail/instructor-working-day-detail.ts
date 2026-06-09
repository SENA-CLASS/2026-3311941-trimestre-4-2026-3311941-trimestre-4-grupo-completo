import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IInstructorWorkingDay } from '../instructor-working-day.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-instructor-working-day-detail',
  templateUrl: './instructor-working-day-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class InstructorWorkingDayDetail {
  readonly instructorWorkingDay = input<IInstructorWorkingDay | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
