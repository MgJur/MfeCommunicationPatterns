import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
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
    params: any;
    toggle = false;
    destroyed$ = new Subject();
    // Publsih this Event
    selectionEvent = 'selectQuery';
    // Subscriptions Rxjs
    toggleSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private pubSubService: NgxPubSubService
    ) { }

    /**
     * publish event on PubSubService with name & event value
     * @param val
     */
    publishEvent(val: string) {
        this.pubSubService.publishWithLast(this.selectionEvent, val);
    }

    /**
     * events of the queryParamMap observables get handed to the mfe as input
     */
    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);
        // subscribe to Events and trigger setToggle() with received value 
        this.toggleSubscription = this.pubSubService.subscribe('toggleMfe', data => this.setToggle(data));
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        // unsubscribe from subscriptions
        this.toggleSubscription.unsubscribe();
    }

    /**
     *  set local toggle with toggle value of event
     * @param toggleR
     */
    setToggle(toggleR: boolean) {
        this.toggle = toggleR;
    }
    /**
     * call publish event when selected event gets triggered with value of event
     * @param event
     */
    onSelect(event: CustomEvent) {
        this.publishEvent(event.detail);
    }
}

