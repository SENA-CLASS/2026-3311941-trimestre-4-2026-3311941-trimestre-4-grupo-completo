import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IAreaInstructor } from '../area-instructor.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-area-instructor-detail',
  templateUrl: './area-instructor-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class AreaInstructorDetail {
  readonly areaInstructor = input<IAreaInstructor | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
