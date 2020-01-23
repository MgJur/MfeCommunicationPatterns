import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxPubSubService } from '@pscoped/ngx-pub-sub';


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

    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);

        // subscribe to Events
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

    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }

    queryFor(selection: string) {
        this.queryParam = selection;
    }

}

