import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() routeSelected: EventEmitter<string> = new EventEmitter<string>();
  selectRoute(selection: string) {
    this.routeSelected.emit(selection);
  }
}
