import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';

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

    publishEvent(val: string) {
        this.pubSubService.publishWithLast(this.selectionEvent, val);
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);
        // subscribe to Events
        this.toggleSubscription = this.pubSubService.subscribe('toggleMfe', data => this.setToggle(data));
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
        // unsubscribe from subscriptions
        this.toggleSubscription.unsubscribe();
    }

    setToggle(toggleR: boolean) {
        this.toggle = toggleR;
    }

    onSelect(event: CustomEvent) {
        this.publishEvent(event.detail);
    }
}

