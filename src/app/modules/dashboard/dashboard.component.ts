import { Component } from '@angular/core';
import { NavegationComponent } from './components/navegation/navegation.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    NavegationComponent,
    RouterOutlet
  ]
})
export class DashboardComponent {

}
