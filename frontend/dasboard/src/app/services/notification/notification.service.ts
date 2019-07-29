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
    console.log('try')
    if ('Notification' in window && Notification.permission === "granted") {
      console.log('eee', title)
      const n = new Notification(title);
    }
  }
}
