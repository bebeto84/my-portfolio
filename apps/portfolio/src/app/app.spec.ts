import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { appRoutes } from './app.routes';
import { Home } from './home';
import { UsheruExperience } from './usheru-experience';

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
});
