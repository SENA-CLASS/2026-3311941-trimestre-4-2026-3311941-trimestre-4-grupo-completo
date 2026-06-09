import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';

import { Alert } from 'app/shared/alert/alert';
import { AlertError } from 'app/shared/alert/alert-error';
import { TranslateDirective } from 'app/shared/language';
import { IItemList } from '../item-list.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ceet-item-list-detail',
  templateUrl: './item-list-detail.html',
  imports: [FontAwesomeModule, Alert, AlertError, TranslateDirective, TranslateModule, RouterLink],
})
export class ItemListDetail {
  readonly itemList = input<IItemList | null>(null);

  previousState(): void {
    globalThis.history.back();
  }
}
