import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { TranslateDirective } from 'app/shared/language';
import { ILogError } from '../log-error.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-log-error-detail',
  templateUrl: './log-error-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink, FormatMediumDatetimePipe],
})
export class LogErrorDetail {
  readonly logError = input<ILogError | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
