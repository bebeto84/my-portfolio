import { parseSessionRatings } from './session-rating-storage';
import { rateableItems } from './rateable-items';

describe('parseSessionRatings', () => {
  it('keeps valid ratings for known work and drops invalid entries', () => {
    expect(
      parseSessionRatings({
        version: 1,
        ratings: {
          [rateableItems.usheruPlatform]: 4,
          [rateableItems.suprnationPlatform]: 6,
          'unknown:work': 5,
          [rateableItems.usheruWorkflow]: '3',
        },
      }),
    ).toEqual({ [rateableItems.usheruPlatform]: 4 });
  });

  it('rejects malformed and unsupported payloads', () => {
    expect(parseSessionRatings(null)).toEqual({});
    expect(parseSessionRatings('{invalid')).toEqual({});
    expect(parseSessionRatings({ version: 2, ratings: {} })).toEqual({});
  });
});
