import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { DurationPipe } from 'app/shared/date';
import { TranslateDirective } from 'app/shared/language';
import { IWorkingDay } from '../working-day.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-working-day-detail',
  templateUrl: './working-day-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink, DurationPipe],
})
export class WorkingDayDetail {
  readonly workingDay = input<IWorkingDay | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
