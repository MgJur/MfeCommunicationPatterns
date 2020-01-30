import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State, Actions, Selectors } from '../store/';

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

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }

    onSelect($event: CustomEvent) {
        this.dispatchSetQueryAction($event.detail);
    }

    // dispatch function to dispatch the setToggle Action on store
    private dispatchSetQueryAction(query: string) {
        return this.store
            .dispatch(Actions.setQuery(
                {
                    setQuery: query
                }
            ));
    }

}

