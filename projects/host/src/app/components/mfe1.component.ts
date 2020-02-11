import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Import NgRx store from nodemodules
import { Store } from '@ngrx/store';
import { State, Actions } from '../store/';

/**
 * Webcomponent made with axLazyElement
 * @param url (of served main-es2015.js of mfe)
 */
@Component({
    selector: 'app-mfe-activator',
    template: `
    <ng-template #loading>Loading Activator...</ng-template>
    <mfe-activator
      *axLazyElement="url; loadingTemplate: loading; errorTemplate: error"
      [params]="params"
      (toggle)="toggleMfe($event)">
    </mfe-activator>
    <ng-template #error> MFE ACTIVATOR LOADING FAILED... </ng-template>
  `
})
export class MfeOneComponent implements OnInit, OnDestroy {

    url = 'http://localhost:8080/mfe1/main-es2015.js';

    params: any;
    destroyed$ = new Subject();



    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<State>
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    /**
     * dispatch the setToggle Action on store with value:
     * @param toggle
     */
    private dispatchToggleChangedAction(toggle: boolean) {
        return this.store
            .dispatch(Actions.setToggle(
                {
                    setState: toggle
                }
            ));
    }

    /**
     * dispatch toggleChangedAction on store with value:
     * @param $event
     */
    toggleMfe($event: CustomEvent) {
        this.dispatchToggleChangedAction($event.detail);
    }
}

