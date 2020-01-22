import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe2';
  @Input() activation: boolean;
  @Output() forwardQuery: EventEmitter<string> = new EventEmitter();

}
