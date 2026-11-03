import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { VisitorRatingActions } from './visitor-rating.actions';
import {
  isRateableItemId,
  isRatingValue,
  RateableItemId,
  RatingValue,
} from './rateable-items';

export interface VisitorRatingState {
  ratings: Partial<Record<RateableItemId, RatingValue>>;
  restored: boolean;
  storageAvailable: boolean;
}

export const visitorRatingFeatureKey = 'visitorRatings';

export const initialVisitorRatingState: VisitorRatingState = {
  ratings: {},
  restored: false,
  storageAvailable: true,
};

export const visitorRatingReducer = createReducer(
  initialVisitorRatingState,
  on(VisitorRatingActions.sessionRestored, (_state, { ratings, storageAvailable }) => ({
    ratings,
    restored: true,
    storageAvailable,
  })),
  on(VisitorRatingActions.ratingSet, (state, { itemId, rating }) => {
    if (!isRateableItemId(itemId) || !isRatingValue(rating)) {
      return state;
    }

    return { ...state, ratings: { ...state.ratings, [itemId]: rating } };
  }),
  on(VisitorRatingActions.ratingCleared, (state, { itemId }) => {
    if (!isRateableItemId(itemId)) {
      return state;
    }

    const ratings = { ...state.ratings };
    delete ratings[itemId];
    return { ...state, ratings };
  }),
  on(VisitorRatingActions.sessionSaveCompleted, (state, { storageAvailable }) => ({
    ...state,
    storageAvailable,
  })),
);

const selectVisitorRatingState = createFeatureSelector<VisitorRatingState>(
  visitorRatingFeatureKey,
);

export const selectVisitorRatings = createSelector(
  selectVisitorRatingState,
  (state) => state.ratings,
);

export const selectRatingsRestored = createSelector(
  selectVisitorRatingState,
  (state) => state.restored,
);

export const selectRatingStorageAvailable = createSelector(
  selectVisitorRatingState,
  (state) => state.storageAvailable,
);
