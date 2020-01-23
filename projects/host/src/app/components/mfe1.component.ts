import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';


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
    // Publsih this Event
    toggleEvent = 'toggleMfe';

    constructor(
        private activatedRoute: ActivatedRoute,
        private pubSubService: NgxPubSubService
    ) {}

    // publish Event with given Value
    publishEvent(val: boolean) {
        this.pubSubService.publishWithLast(this.toggleEvent, val);
    }

    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }
    // trigger publish Event with value of toggle
    toggleMfe($event: CustomEvent) {
        this.publishEvent($event.detail);
    }
}

