import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { CompanyExperienceContent } from './experience-content';
import { RatingControl } from './rating-control/rating-control';

@Component({
  selector: 'app-company-experience-page',
  imports: [RouterLink, RatingControl],
  templateUrl: './company-experience-page.html',
  styleUrl: './company-experience-page.scss',
})
export class CompanyExperiencePage {
  readonly experience = input.required<CompanyExperienceContent>();
}
