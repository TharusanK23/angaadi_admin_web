import { createSelector } from '@ngrx/store';
import { IndustryState } from '../reducers/industry.reducer';
import { State } from '../reducers/_index';

export const selectIndustryFeature = (state: State) => state.industry;

// POST
export const selectCreateIndustry = createSelector(
  selectIndustryFeature,
  (state: IndustryState) => state ? state.industry : null
);

export const selectCreateIndustryError = createSelector(
  selectIndustryFeature,
  (state: IndustryState) => state ? state.createIndustryError : null
);

// GET
export const selectGetAllIndustry = createSelector(
  selectIndustryFeature,
  (state: IndustryState) => state ? state.industryList : null
);

export const selectGetAllIndustryError = createSelector(
  selectIndustryFeature,
  (state: IndustryState) => state ? state.getAllIndustryError : null
);
