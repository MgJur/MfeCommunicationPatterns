import { Component, Input, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mfe1';
  /**
   * Takes the Behaviorsubject as Input
   */
  @Input() toggleS: BehaviorSubject<boolean>;

  constructor() {}
  /**
   * On toggle checks if Subject got already delivered by the Container
   * no -> quits method
   * yes -> calls next on the subject to emit the event value to all subscribers
   * @param $event: EventEmitter<boolean>
   */
  forwardToggle($event: EventEmitter<boolean>) {
    if (!this.toggleS) {
      return;
    }
    $event ? this.toggleS.next(true) : this.toggleS.next(false);
  }




}
