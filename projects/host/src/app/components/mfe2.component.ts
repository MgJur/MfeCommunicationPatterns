import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Import NgRx store from nodemodules
import { Store } from '@ngrx/store';
import { State, Actions, Selectors } from '../store/';

/**
 * Webcomponent made with axLazyElement
 * @param url (of served main-es2015.js of mfe)
 */
@Component({
    selector: 'app-mfe-picker',
    template: `
    <ng-template #loading>Loading Picker...</ng-template>
    <mfe-picker
      *axLazyElement="url; loadingTemplate: loading; errorTemplate: error"
      [params]="params"
      [activation]="toggle"
      (query)="onSelect($event)">
    </mfe-picker>
    <ng-template #error> MFE PICKER LOADING FAILED... </ng-template>
  `
})
export class MfeTwoComponent implements OnInit, OnDestroy {
    url = 'http://localhost:8080/mfe2/main-es2015.js';
    toggle = true;
    params: any;
    destroyed$ = new Subject();

    private subscriptions: Array<Subscription> = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private store: Store<State>
    ) { }

    /**
     * events of the queryParamMap observables get handed to the mfe as input
     */
    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);

        // subscribe to toggle state in store via selectors
        const toggleStateChanged = this.store
            .select(Selectors.selectToggle)
            .subscribe(toggleState => this.setToggle(toggleState));
        this.subscriptions.push(toggleStateChanged);
    }

    /**
     * Unsubscribe from Subscriptions to prevent Memoryleak
     */
    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    /**
     * set local toggle with value:
     * @param toggle 
     */
    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }

    /**
     *  call dispatchQueryAction() function
     * @param $event
     */
    onSelect($event: CustomEvent) {
        this.dispatchSetQueryAction($event.detail);
    }

    /**
     * dispatch the setToggle Action on store
     * @param query
     */
    private dispatchSetQueryAction(query: string) {
        return this.store
            .dispatch(Actions.setQuery(
                {
                    setQuery: query
                }
            ));
    }

}

