import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IModality } from '../modality.model';

@Component({
  selector: 'ceet-modality-detail',
  templateUrl: './modality-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class ModalityDetail {
  readonly modality = input<IModality | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
