import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      [toggle]="toggleS"
      [query]="queryS">
    </mfe-finder>
    <ng-template #error> Finder LOADING FAILED... </ng-template>
  `
})
export class MfeThreeComponent implements OnInit, OnDestroy {

    url = 'http://localhost:8080/mfe3/main-es2015.js';
    params: any;
    destroyed$ = new Subject();

    /**
     * Takes the Behaviorsubjects as input and passes them to the MFE itself
     */
    @Input() toggleS: BehaviorSubject<boolean>;
    @Input() queryS: BehaviorSubject<string>;

    constructor(private activatedRoute: ActivatedRoute) {}

    /**
     * events of the queryParamMap observables get handed to the mfe as input
     */
    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }


}

