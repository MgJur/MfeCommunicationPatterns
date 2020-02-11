import { Component, OnInit, OnDestroy, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
      [activation]="toggleS"
      [query]="queryS">
    </mfe-picker>
    <ng-template #error> PICKER LOADING FAILED... </ng-template>
  `
})
export class MfeTwoComponent implements OnInit, OnDestroy {
    url = 'http://localhost:8080/mfe2/main-es2015.js';
    params: any;
    destroyed$ = new Subject();
    /**
     * Takes the Behaviorsubjects as input and passes them to the MFE itself
     */
    @Input() toggleS: BehaviorSubject<boolean>;
    @Input() queryS: BehaviorSubject<string>;

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

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

