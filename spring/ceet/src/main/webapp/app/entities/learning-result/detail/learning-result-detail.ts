import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ILearningResult } from '../learning-result.model';

@Component({
  selector: 'ceet-learning-result-detail',
  templateUrl: './learning-result-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class LearningResultDetail {
  readonly learningResult = input<ILearningResult | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
