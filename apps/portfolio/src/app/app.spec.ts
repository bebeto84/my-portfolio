import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appRoutes } from './app.routes';
import { Home } from './home';
import { UsheruExperience } from './usheru-experience';
import { SuprNationExperience } from './suprnation-experience';

describe('portfolio routes', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideRouter(appRoutes)],
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
      page.querySelector('#suprnation a[href="/experience/suprnation#frontend-foundations"]'),
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
});
