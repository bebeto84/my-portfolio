import { ApplicationRef, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Store } from '@ngrx/store';
import { filter, take } from 'rxjs';
import { VisitorRatingActions } from './visitor-rating.actions';

@Injectable({ providedIn: 'root' })
export class VisitorRatingBootstrap {
  private readonly appRef = inject(ApplicationRef);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly store = inject(Store);

  initialize(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.appRef.isStable
      .pipe(
        filter((isStable) => isStable),
        take(1),
      )
      .subscribe(() =>
        this.store.dispatch(VisitorRatingActions.sessionRestoreRequested()),
      );
  }
}
