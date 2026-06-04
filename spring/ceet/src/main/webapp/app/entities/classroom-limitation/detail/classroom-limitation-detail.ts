import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IClassroomLimitation } from '../classroom-limitation.model';

@Component({
  selector: 'ceet-classroom-limitation-detail',
  templateUrl: './classroom-limitation-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class ClassroomLimitationDetail {
  readonly classroomLimitation = input<IClassroomLimitation | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
