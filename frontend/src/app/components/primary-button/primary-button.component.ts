import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-primary-button',
  imports: [],
  templateUrl: './primary-button.component.html',
  styleUrl: './primary-button.component.css',
})
export class PrimaryButtonComponent {
  handleClick() {
    this.buttonClicked.emit();
  }
  buttonClicked = output();
  label = input<string>();
  disabled = input<boolean>();
}
