import { Component, Input, Output, EventEmitter, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'mfe2';
  active: boolean;
  subscriptionToggle: Subscription;

  /**
   * Takes the Behaviorsubjects as Input and subscribes to the toggle event.
   * activation(val) -> In case value got emitted call this.activate with the value of event
   */
  @Input() set activation(val) {
    this.subscriptionToggle = val.subscribe( toggle => this.activate(toggle) );
  }
  @Input() query: BehaviorSubject<string>;

  constructor(private cd: ChangeDetectorRef) {}

  /**
   * If the Subject of query is ready, and forward Query got called, trigger .next on query and emit value
   */
  forwardQuery($event: string) {
    if (this.query) { this.query.next($event); }
  }

  /**
   *  Sets the value of the toggle event to local variable active,
   *  triggers change detection manually because its out of detection range
   * @param val: boolean
   */
  activate(val: boolean) {
    this.active = val;
    this.cd.detectChanges();
  }

  /**
   * Unsubscribes from Subscriptions to prevent memory leak
   */
  ngOnDestroy() {
    this.subscriptionToggle.unsubscribe();
  }
}
