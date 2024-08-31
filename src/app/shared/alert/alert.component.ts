import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css',
})
export class AlertComponent {
  @Output() close = new EventEmitter<void>();

  @Input() message: string;

  onClose() {
    this.close.emit();
  }
}
