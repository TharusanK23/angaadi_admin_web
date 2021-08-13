import { createSelector } from '@ngrx/store';
import { ImageState } from '../reducers/image.reducer';
import { State } from '../reducers/_index';

export const selectImageFeature = (state: State) => state.image;

export const selectImage = createSelector(
  selectImageFeature,
  (state: ImageState) => state ? state.image : null
);

export const selectImageError = createSelector(
  selectImageFeature,
  (state: ImageState) => state ? state.imageUploadError : null
);
