import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { FormatMediumDatetimePipe } from 'app/shared/date';
import { TranslateDirective } from 'app/shared/language';
import { IGeneralObservation } from '../general-observation.model';

@Component({
  selector: 'ceet-general-observation-detail',
  templateUrl: './general-observation-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink, FormatMediumDatetimePipe],
})
export class GeneralObservationDetail {
  readonly generalObservation = input<IGeneralObservation | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
