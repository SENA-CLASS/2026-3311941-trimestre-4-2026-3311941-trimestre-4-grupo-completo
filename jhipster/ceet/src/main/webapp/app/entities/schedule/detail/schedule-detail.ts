import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { DurationPipe } from 'app/shared/date';
import { TranslateDirective } from 'app/shared/language';
import { ISchedule } from '../schedule.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-schedule-detail',
  templateUrl: './schedule-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink, DurationPipe],
})
export class ScheduleDetail {
  readonly schedule = input<ISchedule | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
