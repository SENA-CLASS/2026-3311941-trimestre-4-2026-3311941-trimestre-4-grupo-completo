import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ceet-docs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docs.html',
  styleUrl: './docs.scss',
})
export default class Docs {}
