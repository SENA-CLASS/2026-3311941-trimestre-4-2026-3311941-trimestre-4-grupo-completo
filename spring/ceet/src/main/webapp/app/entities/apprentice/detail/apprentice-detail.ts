import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IApprentice } from '../apprentice.model';

@Component({
  selector: 'ceet-apprentice-detail',
  templateUrl: './apprentice-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class ApprenticeDetail {
  readonly apprentice = input<IApprentice | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
