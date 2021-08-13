import { createReducer, on } from '@ngrx/store';
import { Industry, Error } from 'src/app/models';
import {
  createIndustrySuccess,
  createIndustryError,
  createIndustryReset,
  getAllIndustrySuccess,
  getAllIndustryError,
  getAllIndustryReset
} from '../action/industry.action';

export const industryFeatureKey = 'industry';

export interface IndustryState {
  industry?: Industry;
  createIndustryError?: Error;
  industryList?: Industry[];
  getAllIndustryError?: Error;
}

export const initialState: IndustryState = {
  industry: undefined,
  createIndustryError: undefined,
  industryList: undefined,
  getAllIndustryError: undefined
};

export const reducer = createReducer(initialState,
  // POST
  on(createIndustrySuccess, (state, { result }) => ({ ...state, industry: result })),
  on(createIndustryError, (state, { error }) => ({ ...state, createIndustryError: error })),
  on(createIndustryReset, (state) => ({ ...state, industry: undefined, createIndustryError: undefined })),

  // GET
  on(getAllIndustrySuccess, (state, { result }) => ({ ...state, industryList: result })),
  on(getAllIndustryError, (state, { error }) => ({ ...state, getAllIndustryError: error })),
  on(getAllIndustryReset, (state) => ({ ...state, industryList: undefined, getAllIndustryError: undefined })),

);
