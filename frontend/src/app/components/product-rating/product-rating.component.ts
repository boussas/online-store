import { Component, Input } from '@angular/core';
import { IconsModule } from '../../icons/icons.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-rating',
  imports: [IconsModule, CommonModule],
  template: `
    <div class="flex items-center gap-1">
      <ng-container *ngFor="let _ of [].constructor(5); let i = index">
        <fa-icon
          [icon]="getStarIcon(i)"
          [ngClass]="{
            'text-yellow-400': i <= rating,
            'text-gray-300 ': i > rating
          }"
        ></fa-icon>
      </ng-container>
    </div>
  `,
})
export class ProductRatingComponent {
  @Input() rating: number = 0;

  get displayRating(): string {
    return this.rating.toFixed(1);
  }

  getStarIcon(index: number): string {
    const fullStars = Math.floor(this.rating);
    const hasHalfStar = this.rating % 1 >= 0.5;

    if (index < fullStars) {
      return 'star'; // Full star
    } else if (index === fullStars && hasHalfStar) {
      return 'star-half-alt'; // Half star
    } else {
      return 'star';
    }
  }
}
