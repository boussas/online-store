import { Component, inject, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IconsModule } from '../../../icons/icons.module';
import { SearchService } from '../../../services/search.service';
@Component({
  selector: 'app-search-bar',
  imports: [IconsModule, CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
})
export class SearchBarComponent {
  searchQuery = signal('');
  searchService=inject(SearchService)
  handleSearch() {
    this.searchService.setSearchQuery(this.searchQuery());
  }
}
