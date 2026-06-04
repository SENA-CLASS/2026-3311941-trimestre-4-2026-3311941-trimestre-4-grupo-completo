import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IScheduleVersion } from '../schedule-version.model';

@Component({
  selector: 'ceet-schedule-version-detail',
  templateUrl: './schedule-version-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class ScheduleVersionDetail {
  readonly scheduleVersion = input<IScheduleVersion | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
