import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { ILevelEducation } from '../level-education.model';

@Component({
  selector: 'ceet-level-education-detail',
  templateUrl: './level-education-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class LevelEducationDetail {
  readonly levelEducation = input<ILevelEducation | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
