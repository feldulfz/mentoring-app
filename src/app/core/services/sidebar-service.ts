import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private _isSidebarOpen = false;

  get isSidebarOpen(): boolean {
    return this._isSidebarOpen;
  }

  open() {
    this._isSidebarOpen = true;
  }

  close() {
    this._isSidebarOpen = false;
  }

  toggle() {
    this._isSidebarOpen = !this._isSidebarOpen;
  }

}
