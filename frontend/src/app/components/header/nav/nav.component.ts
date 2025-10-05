import { Component } from '@angular/core';
import { SidebarCategoriesComponent } from "../../sidebar-categories/sidebar-categories.component";

@Component({
  selector: 'app-nav',
  imports: [SidebarCategoriesComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
