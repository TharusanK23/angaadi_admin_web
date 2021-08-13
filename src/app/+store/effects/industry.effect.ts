import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { IndustryService } from 'src/app/services/industry.service';
import {
  createIndustry,
  createIndustrySuccess,
  createIndustryError,
  createIndustryReset,
  getAllIndustry,
  getAllIndustrySuccess,
  getAllIndustryError,
  getAllIndustryReset
} from '../action/industry.action';

@Injectable()
export class IndustryEffects {

  createIndustry$ = createEffect(() => this.action$.pipe(
    ofType(createIndustry),
    mergeMap((params) => this.industryService.createIndustry(params.params)
      .pipe(
        switchMap(res => {
          return [
            ({ type: createIndustrySuccess.type, result: res }),
            ({ type: getAllIndustry.type }),
            ({ type: createIndustryReset.type })
          ];
        }),
        catchError((err) => of({ type: createIndustryError.type, error: err.error }))
      ))
  ));

  getAllIndustry$ = createEffect(() => this.action$.pipe(
    ofType(getAllIndustry),
    mergeMap((_) => this.industryService.getAllIndustry()
      .pipe(
        switchMap(res => {
          return [
            ({ type: getAllIndustrySuccess.type, result: res })
          ];
        }),
        catchError((err) => of({ type: getAllIndustryError.type, error: err.error }))
      ))
  ));


  constructor(
    private action$: Actions,
    private industryService: IndustryService
  ) { }

}
