import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { 
    if ('Notification' in window && Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }

  showNotification(title: string) {
    if ('Notification' in window && Notification.permission === "granted") {
      const n = new Notification(title);
    }
  }
}
