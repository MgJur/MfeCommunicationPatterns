import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * Webcomponent made with axLazyElement
 * @param url (of served main-es2015.js of mfe)
 */
@Component({
    selector: 'app-mfe-activator',
    template: `
    <ng-template #loading>Loading Activator...</ng-template>
    <mfe-activator
      *axLazyElement="url; loadingTemplate: loading; errorTemplate: error"
      [params]="params"
      [toggleS]="toggleS">
    </mfe-activator>
    <ng-template #error> ACTIVATOR LOADING FAILED... </ng-template>
  `
})
export class MfeOneComponent implements OnInit, OnDestroy {

    url = 'http://localhost:8080/mfe1/main-es2015.js';

    params: any;
    destroyed$ = new Subject();

    /**
     * Takes the Behaviorsubject as  input and passes it to the MFE itself
     */
    @Input() toggleS: BehaviorSubject<boolean>;

    constructor(
        private activatedRoute: ActivatedRoute) {}


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

