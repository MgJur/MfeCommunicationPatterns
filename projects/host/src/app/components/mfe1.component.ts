import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
    selector: 'app-mfe-activator',
    template: `
    <ng-template #loading>Loading Activator...</ng-template>
    <mfe-activator
      *axLazyElement="url; loadingTemplate: loading; errorTemplate: error"
      [params]="params">
    </mfe-activator>
    <ng-template #error> MFE ACTIVATOR LOADING FAILED... </ng-template>
  `
})
export class MfeOneComponent implements OnInit, OnDestroy {

    url = 'http://localhost:8080/mfe1/main-es2015.js';

    params: any;
    destroyed$ = new Subject();

    constructor(
        private activatedRoute: ActivatedRoute
    ) {}

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

