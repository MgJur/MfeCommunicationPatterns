import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
/**
 * Import from https://www.npmjs.com/package/@pscoped/ngx-pub-sub
 */
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

/**
 * Webcomponent made with axLazyElement
 * @param url (of served main-es2015.js of mfe)
 */
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
    toggle  = false;
    destroyed$ = new Subject();

    // Subscriptions Rxjs
    toggleSubscription: Subscription;
    selectSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pubSubService: NgxPubSubService
    ) { }

    /**
     * events of the queryParamMap observables get handed to the mfe as input
     */
    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);

        /**
         * subscribe to event and trigger methods
         * setToggle() -> on toggle subscription
         * queryFor() -> on select subscription
         */
        this.toggleSubscription = this.pubSubService.subscribe('toggleMfe', data => this.setToggle(data));
        this.selectSubscription = this.pubSubService.subscribe('selectQuery', data => this.queryFor(data));
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        // unsubscribe from subscriptions
        this.toggleSubscription.unsubscribe();
        this.selectSubscription.unsubscribe();
    }

    /**
     *  set local toggle with toggle value of event
     * @param toggleR
     */
    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }
    /**
     * set queryParam equal to value of selection
     * @param selection
     */
    queryFor(selection: string) {
        this.queryParam = selection;
    }

}

