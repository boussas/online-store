import { Component, Injectable } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import { FooterComponent } from '../components/footer/footer.component';
import { RouterOutlet } from '@angular/router';
@Injectable({ providedIn: 'root' })
@Component({
  selector: 'app-user-layout',
  template: `
    <app-header></app-header>
    <div class="bg-white">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
})
export class UserLayoutComponent {}
