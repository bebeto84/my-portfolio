export const rateableItems = {
  usheruPlatform: 'usheru:platform',
  usheruWorkflow: 'usheru:ai-workflow',
  suprnationPlatform: 'suprnation:platform',
} as const;

export type RateableItemId = (typeof rateableItems)[keyof typeof rateableItems];
export type RatingValue = 1 | 2 | 3 | 4 | 5;

export const ratingValues: readonly RatingValue[] = [1, 2, 3, 4, 5];

export function isRateableItemId(value: string): value is RateableItemId {
  return Object.values(rateableItems).some((itemId) => itemId === value);
}

export function isRatingValue(value: unknown): value is RatingValue {
  return (
    typeof value === 'number' &&
    Number.isInteger(value) &&
    value >= 1 &&
    value <= 5
  );
}
