import { computed, Component, input, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  RateableItemId,
  RatingValue,
  ratingValues,
} from '../visitor-state/rateable-items';
import { VisitorRatingActions } from '../visitor-state/visitor-rating.actions';
import {
  selectRatingStorageAvailable,
  selectRatingsRestored,
  selectVisitorRatings,
} from '../visitor-state/visitor-rating.reducer';

@Component({
  selector: 'app-rating-control',
  templateUrl: './rating-control.html',
  styleUrl: './rating-control.scss',
})
export class RatingControl {
  private readonly store = inject(Store);

  readonly itemId = input.required<RateableItemId>();
  readonly itemLabel = input.required<string>();
  readonly ratingValues = ratingValues;
  readonly ratings = this.store.selectSignal(selectVisitorRatings);
  readonly restored = this.store.selectSignal(selectRatingsRestored);
  readonly storageAvailable = this.store.selectSignal(
    selectRatingStorageAvailable,
  );
  readonly currentRating = computed(() => this.ratings()[this.itemId()] ?? null);

  setRating(rating: RatingValue): void {
    this.store.dispatch(
      VisitorRatingActions.ratingSet({ itemId: this.itemId(), rating }),
    );
  }

  clearRating(): void {
    this.store.dispatch(
      VisitorRatingActions.ratingCleared({ itemId: this.itemId() }),
    );
  }
}
