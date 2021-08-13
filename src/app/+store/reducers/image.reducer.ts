import { createReducer, on } from '@ngrx/store';
import { Image, Error } from 'src/app/models';
import { uploadImageError, uploadImageSuccess } from '../action/image.action';

export const imageFeatureKey = 'image';

export interface ImageState {
  image?: Image;
  imageUploadError?: Error;
}

export const initialState: ImageState = {
  image: undefined,
  imageUploadError: undefined,
};

export const reducer = createReducer(initialState,
  on(uploadImageSuccess, (state, { result }) => ({ ...state, image: result })),
  on(uploadImageError, (state, { error }) => ({ ...state, imageUploadError: error }))
);
