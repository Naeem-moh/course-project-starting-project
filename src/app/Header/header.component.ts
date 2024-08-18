import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private storageService: DataStorageService) {}

  onStoreData() {
    this.storageService.storeData();
  }

  onFetchData() {
    this.storageService.fetchData().subscribe();
  }
}
