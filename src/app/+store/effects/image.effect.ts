import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ImageService } from 'src/app/services/image.service';
import { uploadImage, uploadImageError, uploadImageSuccess } from '../action/image.action';

@Injectable()
export class ImageEffects {

  uploadImage$ = createEffect(() => this.action$.pipe(
    ofType(uploadImage),
    mergeMap((params) => this.imageService.uploadImage(params.params)
      .pipe(
        map(image => {
          return ({ type: uploadImageSuccess.type, result: image });
        }),
        catchError(() => of({ type: uploadImageError.type }))
      ))
  ));


  constructor(
    private action$: Actions,
    private imageService: ImageService
  ) { }

}
