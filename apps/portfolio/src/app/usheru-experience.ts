import { Component } from '@angular/core';
import { CompanyExperiencePage } from './company-experience-page';
import { usheruExperience } from './experience-content';

@Component({
  selector: 'app-usheru-experience',
  imports: [CompanyExperiencePage],
  templateUrl: './usheru-experience.html',
  styleUrl: './usheru-experience.scss',
})
export class UsheruExperience {
  readonly experience = usheruExperience;
}
