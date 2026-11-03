import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  isRateableItemId,
  isRatingValue,
  RateableItemId,
  RatingValue,
} from './rateable-items';

const sessionStorageKey = 'miguel-portfolio:visitor-ratings:v1';

export interface SessionRatingSnapshot {
  ratings: Partial<Record<RateableItemId, RatingValue>>;
  storageAvailable: boolean;
}

@Injectable({ providedIn: 'root' })
export class SessionRatingStorage {
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  restore(): SessionRatingSnapshot {
    if (!this.isBrowser) {
      return { ratings: {}, storageAvailable: false };
    }

    try {
      const storedValue = window.sessionStorage.getItem(sessionStorageKey);
      if (storedValue === null) {
        return { ratings: {}, storageAvailable: true };
      }

      try {
        const parsed: unknown = JSON.parse(storedValue);
        return {
          ratings: parseSessionRatings(parsed),
          storageAvailable: true,
        };
      } catch {
        return { ratings: {}, storageAvailable: true };
      }
    } catch {
      return { ratings: {}, storageAvailable: false };
    }
  }

  save(ratings: Partial<Record<RateableItemId, RatingValue>>): boolean {
    if (!this.isBrowser) {
      return false;
    }

    try {
      window.sessionStorage.setItem(
        sessionStorageKey,
        JSON.stringify({ version: 1, ratings }),
      );
      return true;
    } catch {
      return false;
    }
  }
}

export function parseSessionRatings(
  value: unknown,
): Partial<Record<RateableItemId, RatingValue>> {
  if (
    typeof value !== 'object' ||
    value === null ||
    !('version' in value) ||
    value.version !== 1 ||
    !('ratings' in value) ||
    typeof value.ratings !== 'object' ||
    value.ratings === null ||
    Array.isArray(value.ratings)
  ) {
    return {};
  }

  const ratings: Partial<Record<RateableItemId, RatingValue>> = {};
  for (const [itemId, rating] of Object.entries(value.ratings)) {
    if (isRateableItemId(itemId) && isRatingValue(rating)) {
      ratings[itemId] = rating;
    }
  }

  return ratings;
}
