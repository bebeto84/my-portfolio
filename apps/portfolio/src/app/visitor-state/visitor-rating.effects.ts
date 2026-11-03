import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { catchError, defer, map, of, switchMap, withLatestFrom } from 'rxjs';
import { SessionRatingStorage } from './session-rating-storage';
import { VisitorRatingActions } from './visitor-rating.actions';
import { selectVisitorRatings } from './visitor-rating.reducer';

@Injectable()
export class VisitorRatingEffects {
  private readonly actions$ = inject(Actions);
  private readonly store = inject(Store);
  private readonly storage = inject(SessionRatingStorage);

  readonly restoreSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(VisitorRatingActions.sessionRestoreRequested),
      switchMap(() =>
        defer(() => of(this.storage.restore())).pipe(
          catchError(() => of({ ratings: {}, storageAvailable: false })),
        ),
      ),
      map(({ ratings, storageAvailable }) =>
        VisitorRatingActions.sessionRestored({ ratings, storageAvailable }),
      ),
    ),
  );

  readonly saveSession$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        VisitorRatingActions.ratingSet,
        VisitorRatingActions.ratingCleared,
      ),
      withLatestFrom(this.store.select(selectVisitorRatings)),
      map(([, ratings]) =>
        VisitorRatingActions.sessionSaveCompleted({
          storageAvailable: this.storage.save(ratings),
        }),
      ),
    ),
  );
}
