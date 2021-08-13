import { createAction, props } from '@ngrx/store';
import { IndustryCreateModel, Industry, Error } from 'src/app/models';

// POST
export const createIndustry = createAction('[CREATE_INDUSTRY] Create Industry', props<{ params: IndustryCreateModel }>());

export const createIndustrySuccess = createAction('[CREATE_INDUSTRY] Create Industry Success', props<{ result: Industry }>());

export const createIndustryError = createAction('[CREATE_INDUSTRY] Create Industry Error', props<{ error: Error }>());

export const createIndustryReset = createAction('[CREATE_INDUSTRY] Create Industry Reset');

// GET
export const getAllIndustry = createAction('[GET_ALL_INDUSTRY] Get All Industry');

export const getAllIndustrySuccess = createAction('[GET_ALL_INDUSTRY] Get All Industry Success', props<{ result: Industry[] }>());

export const getAllIndustryError = createAction('[GET_ALL_INDUSTRY] Get All Industry Error', props<{ error: Error }>());

export const getAllIndustryReset = createAction('[GET_ALL_INDUSTRY] Get All Industry Reset');
