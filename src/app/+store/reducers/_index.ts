import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromImage from './image.reducer';
import * as fromIndustry from './industry.reducer';


export interface State {
  [fromImage.imageFeatureKey]: fromImage.ImageState;
  [fromIndustry.industryFeatureKey]: fromIndustry.IndustryState;
}

export const reducers: ActionReducerMap<State> = {
  [fromImage.imageFeatureKey]: fromImage.reducer,
  [fromIndustry.industryFeatureKey]: fromIndustry.reducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
