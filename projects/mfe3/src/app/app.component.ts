import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe3';
  @Input() activation: boolean;
  @Input() provideQuery: string;
  constructor() {}
}
