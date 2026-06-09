import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IBonding } from '../bonding.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-bonding-detail',
  templateUrl: './bonding-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class BondingDetail {
  readonly bonding = input<IBonding | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
