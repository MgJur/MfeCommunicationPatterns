import { Component } from '@angular/core';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'host';
  // Define Events
  toggleEvent = 'toggleMfe';
  selectionEvent = 'selectQuery';

  constructor(pubSubService: NgxPubSubService) {
    // register Events on the PubSub Service Module
    pubSubService.registerEventWithLastValue(this.toggleEvent, undefined);
    pubSubService.registerEventWithLastValue(this.selectionEvent, '');
  }

}
