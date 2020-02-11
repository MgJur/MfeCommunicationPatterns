import { Component } from '@angular/core';

/**
 * Import from https://www.npmjs.com/package/@pscoped/ngx-pub-sub
 */
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'host';

  // Define name of events
  toggleEvent = 'toggleMfe';
  selectionEvent = 'selectQuery';

  /**
   *  PubSub Service imported via library
   * @param pubSubService
   */
  constructor(pubSubService: NgxPubSubService) {
    // register Events on the PubSub Service Module with event name & initial value
    pubSubService.registerEventWithLastValue(this.toggleEvent, undefined);
    pubSubService.registerEventWithLastValue(this.selectionEvent, '');
  }

}
