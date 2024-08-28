import { User } from '../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isAuthenticated = true;

  constructor(
    private storageService: DataStorageService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  onStoreData() {
    this.storageService.storeData();
  }

  onFetchData() {
    this.storageService.fetchData().subscribe();
  }
}
