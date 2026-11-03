import { VisitorRatingActions } from './visitor-rating.actions';
import { rateableItems } from './rateable-items';
import {
  initialVisitorRatingState,
  visitorRatingReducer,
} from './visitor-rating.reducer';

describe('visitorRatingReducer', () => {
  it('sets and changes personal ratings without replacing other items', () => {
    const firstRating = visitorRatingReducer(
      initialVisitorRatingState,
      VisitorRatingActions.ratingSet({
        itemId: rateableItems.usheruPlatform,
        rating: 4,
      }),
    );
    const nextState = visitorRatingReducer(
      firstRating,
      VisitorRatingActions.ratingSet({
        itemId: rateableItems.suprnationPlatform,
        rating: 5,
      }),
    );
    const changedState = visitorRatingReducer(
      nextState,
      VisitorRatingActions.ratingSet({
        itemId: rateableItems.usheruPlatform,
        rating: 2,
      }),
    );

    expect(changedState.ratings).toEqual({
      [rateableItems.usheruPlatform]: 2,
      [rateableItems.suprnationPlatform]: 5,
    });
  });

  it('clears one rating and preserves the remaining ratings', () => {
    const state = {
      ...initialVisitorRatingState,
      ratings: {
        [rateableItems.usheruWorkflow]: 3 as const,
        [rateableItems.suprnationPlatform]: 5 as const,
      },
    };

    expect(
      visitorRatingReducer(
        state,
        VisitorRatingActions.ratingCleared({
          itemId: rateableItems.usheruWorkflow,
        }),
      ).ratings,
    ).toEqual({ [rateableItems.suprnationPlatform]: 5 });
  });

  it('restores ratings and records the storage availability', () => {
    const nextState = visitorRatingReducer(
      initialVisitorRatingState,
      VisitorRatingActions.sessionRestored({
        ratings: { [rateableItems.usheruPlatform]: 4 },
        storageAvailable: false,
      }),
    );

    expect(nextState).toEqual({
      ratings: { [rateableItems.usheruPlatform]: 4 },
      restored: true,
      storageAvailable: false,
    });
  });
});
