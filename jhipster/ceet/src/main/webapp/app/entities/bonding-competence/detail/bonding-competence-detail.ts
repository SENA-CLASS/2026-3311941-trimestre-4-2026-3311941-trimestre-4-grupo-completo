import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IBondingCompetence } from '../bonding-competence.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-bonding-competence-detail',
  templateUrl: './bonding-competence-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class BondingCompetenceDetail {
  readonly bondingCompetence = input<IBondingCompetence | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
