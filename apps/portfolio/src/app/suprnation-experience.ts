import { Component } from '@angular/core';
import { CompanyExperiencePage } from './company-experience-page';
import { suprnationExperience } from './experience-content';

@Component({
  selector: 'app-suprnation-experience',
  imports: [CompanyExperiencePage],
  templateUrl: './suprnation-experience.html',
  styleUrl: './suprnation-experience.scss',
})
export class SuprNationExperience {
  readonly experience = suprnationExperience;
}
