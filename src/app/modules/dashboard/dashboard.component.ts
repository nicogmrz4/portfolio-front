import { Component } from '@angular/core';
import { NavegationComponent } from './components/navegation/navegation.component';
import { RouterOutlet } from '@angular/router';
import { LoadingLayerComponent } from './components/loading-layer.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: true,
  imports: [
    NavegationComponent,
    RouterOutlet,
    LoadingLayerComponent,
  ]
})
export class DashboardComponent {

}
