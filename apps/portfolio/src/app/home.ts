import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { RatingControl } from './rating-control/rating-control';

@Component({
  selector: 'app-home',
  imports: [RouterLink, RatingControl],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
