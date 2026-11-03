import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RateableItemId, RatingValue } from './rateable-items';

export const VisitorRatingActions = createActionGroup({
  source: 'Visitor Ratings',
  events: {
    'Session Restore Requested': emptyProps(),
    'Session Restored': props<{
      ratings: Partial<Record<RateableItemId, RatingValue>>;
      storageAvailable: boolean;
    }>(),
    'Rating Set': props<{ itemId: RateableItemId; rating: RatingValue }>(),
    'Rating Cleared': props<{ itemId: RateableItemId }>(),
    'Session Save Completed': props<{ storageAvailable: boolean }>(),
  },
});
