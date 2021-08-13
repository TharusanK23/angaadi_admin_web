import { createAction, props } from '@ngrx/store';
import { Image, Error } from 'src/app/models';

export const uploadImage = createAction('[UPLOAD_IMAGE] Upload Image', props<{ params: any }>());

export const uploadImageSuccess = createAction('[UPLOAD_IMAGE] Upload Image Success', props<{ result: Image }>());

export const uploadImageError = createAction('[UPLOAD_IMAGE] Upload Image Error', props<{ error: Error }>());
