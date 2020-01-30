import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State, Selectors } from '../store/';
@Component({
    selector: 'app-mfe-finder',
    template: `
    <ng-template #loading>Loading Finder...</ng-template>
    <mfe-finder
      *axLazyElement="url; loadingTemplate: loading; errorTemplate: error"
      [params]="params"
      [activation]="toggle"
      [provideQuery]="queryParam">
    </mfe-finder>
    <ng-template #error> MFE Finder LOADING FAILED... </ng-template>
  `
})
export class MfeThreeComponent implements OnInit, OnDestroy {

    url = 'http://localhost:8080/mfe3/main-es2015.js';
    params: any;
    queryParam = '';
    toggle: boolean;
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

        const toggleStateChanged = this.store
        .select(Selectors.selectToggle)
        .subscribe(toggleState => this.setToggle(toggleState));

        const querySelected = this.store
        .select(Selectors.selectQuery)
        .subscribe(queryState => this.queryFor(queryState));

        this.subscriptions.push(toggleStateChanged, querySelected);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }

    queryFor(selection: string) {
        this.queryParam = selection;
    }

}

