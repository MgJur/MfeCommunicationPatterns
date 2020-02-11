import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'host';

  /**
   * Declared RxJs Behavior Subjects in the Container, instead passing them from the MFE - to the Container and back to requesting MFE´s
   * RxJs Behavior Subject emits initial and current value to it's subscribers
   */
  toggleS = new BehaviorSubject<boolean>(false);
  queryS = new BehaviorSubject<string>('');
  constructor() {}
}
