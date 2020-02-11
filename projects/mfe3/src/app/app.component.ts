import { Component, Input, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'mfe3';
  activation: boolean;
  provideQuery: string;
  subscriptionToggle: Subscription;
  subscriptionQuery: Subscription;


  /**
   * Takes Behaviorsubjects as Input
   * set toggle(val) -> subscribes to Subject, calls method activate() with value of event
   * set query(val) -> subscribes to Subject, calls method setQuery() with value of event
   */
  @Input() set toggle(val) {
    this.subscriptionToggle = val.subscribe( toggle => this.activate(toggle) );
  }
  @Input() set query(val) {
    this.subscriptionQuery = val.subscribe( query => this.setQuery(query) );
  }

  constructor(private cd: ChangeDetectorRef) {}

  /**
   *  Sets the value of the event to local variable provideQuery,
   *  triggers change detection manually because its out of detection range
   * @param val: string
   */
  setQuery(val: string) {
    this.provideQuery = val;
    this.cd.detectChanges();
  }

  /**
   *  Sets the value of the event to local variable activation,
   *  triggers change detection manually because its out of detection range
   * @param val: boolean
   */
  activate(val: boolean) {
    this.activation = val;
    this.cd.detectChanges();
  }


  /**
   * Unsubscribes from Subscriptions to prevent memory leak
   */
  ngOnDestroy() {
    this.subscriptionToggle.unsubscribe();
    this.subscriptionQuery.unsubscribe();
  }
}
