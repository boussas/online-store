import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { DrawerModule } from 'primeng/drawer';
import 'primeicons/primeicons.css';
@Component({
  selector: 'app-admin-layout',
  imports: [
    RouterOutlet,
    RouterModule,
    CommonModule,
    AvatarModule,
    DrawerModule,
    ButtonModule,
    RippleModule,
  ],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  visible: boolean = false;

  openDrawer() {
    this.visible = true;
  }

  closeDrawer() {
    this.visible = false;
  }
}
