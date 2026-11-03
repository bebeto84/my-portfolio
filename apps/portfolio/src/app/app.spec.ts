import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appRoutes } from './app.routes';
import { Home } from './home';
import { UsheruExperience } from './usheru-experience';
import { SuprNationExperience } from './suprnation-experience';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import {
  visitorRatingFeatureKey,
  visitorRatingReducer,
} from './visitor-state/visitor-rating.reducer';
import { VisitorRatingEffects } from './visitor-state/visitor-rating.effects';
import { Store } from '@ngrx/store';
import { rateableItems } from './visitor-state/rateable-items';
import { VisitorRatingActions } from './visitor-state/visitor-rating.actions';

describe('portfolio routes', () => {
  afterEach(() => {
    sessionStorage.clear();
    vi.restoreAllMocks();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter(appRoutes),
        provideStore({ [visitorRatingFeatureKey]: visitorRatingReducer }),
        provideEffects(VisitorRatingEffects),
      ],
    }).compileComponents();
  });

  it('renders the home introduction and selected work', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', Home);

    const page = harness.routeNativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('care and clarity');
    expect(page.querySelector('#work h2')?.textContent).toContain(
      'Selected work',
    );
    expect(page.querySelector('#suprnation-title')?.textContent).toContain(
      'Three brands, one shared platform',
    );
    expect(
      page.querySelector(
        '#suprnation a[href="/experience/suprnation#frontend-foundations"]',
      ),
    ).not.toBeNull();
  });

  it('renders the Usheru experience page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/experience/usheru', UsheruExperience);

    const page = harness.routeNativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain(
      '100+ branded apps',
    );
    expect(page.querySelector('#ai-workflow')).not.toBeNull();
  });

  it('renders the SuprNation experience page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl(
      '/experience/suprnation',
      SuprNationExperience,
    );

    const page = harness.routeNativeElement as HTMLElement;
    expect(page.querySelector('h1')?.textContent).toContain('shared frontend');
    expect(page.querySelector('#frontend-foundations')).not.toBeNull();
  });

  it('rates, changes, clears, and restores work items for the tab session', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', Home);
    const page = harness.routeNativeElement as HTMLElement;
    const store = TestBed.inject(Store);
    const usheruFourthStar = page.querySelector<HTMLButtonElement>(
      '[aria-label="Rate Usheru platform 4 out of 5"]',
    );
    const suprnationFifthStar = page.querySelector<HTMLButtonElement>(
      '[aria-label="Rate SuprNation platform 5 out of 5"]',
    );

    expect(usheruFourthStar?.disabled).toBe(true);
    store.dispatch(
      VisitorRatingActions.sessionRestored({
        ratings: {},
        storageAvailable: true,
      }),
    );
    await harness.fixture.whenStable();
    expect(usheruFourthStar?.disabled).toBe(false);

    usheruFourthStar?.dispatchEvent(new MouseEvent('mouseenter'));
    await harness.fixture.whenStable();
    expect(
      [...page.querySelectorAll<HTMLButtonElement>(
        '#work article:first-child .rating-options button',
      )].map((button) => button.classList.contains('previewed')),
    ).toEqual([true, true, true, true, false]);
    usheruFourthStar
      ?.closest('.rating-options')
      ?.dispatchEvent(new MouseEvent('mouseleave'));
    await harness.fixture.whenStable();
    expect(
      page.querySelector(
        '#work article:first-child .rating-options button.filled',
      ),
    ).toBeNull();

    usheruFourthStar?.click();
    suprnationFifthStar?.click();
    await harness.fixture.whenStable();
    expect(usheruFourthStar?.getAttribute('aria-pressed')).toBe('true');
    expect(suprnationFifthStar?.getAttribute('aria-pressed')).toBe('true');
    expect(
      [...page.querySelectorAll<HTMLButtonElement>(
        '#work article:first-child .rating-options button',
      )].map((button) => button.classList.contains('filled')),
    ).toEqual([true, true, true, true, false]);

    page
      .querySelector<HTMLButtonElement>(
        '#work article:first-child .rating-control .rating-options [aria-label="Rate Usheru platform 2 out of 5"]',
      )
      ?.click();
    await harness.fixture.whenStable();
    expect(
      page.querySelector(
        '#work article:first-child .rating-control [aria-label="Rate Usheru platform 2 out of 5"]',
      )?.getAttribute('aria-pressed'),
    ).toBe('true');

    page
      .querySelector<HTMLButtonElement>(
        '#work article:first-child .rating-control .clear-rating',
      )
      ?.click();
    await harness.fixture.whenStable();
    expect(
      page.querySelector(
        '#work article:first-child .rating-control [aria-label="Rate Usheru platform 2 out of 5"]',
      )?.getAttribute('aria-pressed'),
    ).toBe('false');
    expect(suprnationFifthStar?.getAttribute('aria-pressed')).toBe('true');

    store.dispatch(VisitorRatingActions.sessionRestoreRequested());
    await harness.fixture.whenStable();
    expect(suprnationFifthStar?.getAttribute('aria-pressed')).toBe('true');
    expect(
      JSON.parse(
        sessionStorage.getItem('miguel-portfolio:visitor-ratings:v1') ?? '{}',
      ).ratings,
    ).toEqual({ [rateableItems.suprnationPlatform]: 5 });

    await harness.navigateByUrl('/experience/usheru', UsheruExperience);
    const usheruPage = harness.routeNativeElement as HTMLElement;
    expect(
      usheruPage
        .querySelector<HTMLButtonElement>(
          '[aria-label="Rate One foundation, configured for each brand. 5 out of 5"]',
        )
        ?.getAttribute('aria-pressed'),
    ).toBe('false');

    await harness.navigateByUrl('/experience/suprnation', SuprNationExperience);
    const experiencePage = harness.routeNativeElement as HTMLElement;
    expect(
      experiencePage
        .querySelector<HTMLButtonElement>(
          '[aria-label="Rate One Nx workspace for three brands. 5 out of 5"]',
        )
        ?.getAttribute('aria-pressed'),
    ).toBe('true');
  });

  it('keeps ratings usable when session storage is unavailable', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage is unavailable');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage is unavailable');
    });

    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/', Home);
    const page = harness.routeNativeElement as HTMLElement;
    const store = TestBed.inject(Store);
    store.dispatch(VisitorRatingActions.sessionRestoreRequested());
    await harness.fixture.whenStable();

    const ratingButton = page.querySelector<HTMLButtonElement>(
      '[aria-label="Rate Usheru platform 3 out of 5"]',
    );
    expect(ratingButton?.disabled).toBe(false);
    ratingButton?.click();
    await harness.fixture.whenStable();

    expect(ratingButton?.getAttribute('aria-pressed')).toBe('true');
    expect(page.querySelector('[role="status"]')?.textContent).toContain(
      'could not be saved for reload',
    );
  });
});
