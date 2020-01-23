import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe1';

  @Output() toggle: EventEmitter<boolean> = new EventEmitter();

  forwardToggle($event: EventEmitter<boolean>) {
    $event ? this.toggle.emit(true) : this.toggle.emit(false);
  }
}
