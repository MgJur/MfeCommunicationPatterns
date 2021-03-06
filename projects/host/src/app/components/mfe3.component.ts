import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


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

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activatedRoute.queryParamMap
            .pipe(takeUntil(this.destroyed$))
            .subscribe(() => this.params = this.activatedRoute.snapshot.queryParams);
    }

    ngOnDestroy() {
        this.destroyed$.next();
        this.destroyed$.complete();
    }

    setToggle(toggle: boolean) {
        this.toggle = toggle;
    }

    queryFor(selection: string) {
        this.queryParam = selection;
    }

}

