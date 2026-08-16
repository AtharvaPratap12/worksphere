import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationItem {
  id: number;
  title: string;
  message: string;
  type: 'employee' | 'candidate' | 'success' | 'info';
  createdAt: string;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private readonly storageKey =
    'worksphere_notifications';

  private readonly settingsKey =
    'worksphere_notifications_enabled';

  private notifications: NotificationItem[] = [];

  private notificationsSubject =
    new BehaviorSubject<NotificationItem[]>([]);

  notifications$ =
    this.notificationsSubject.asObservable();


  constructor() {

    this.loadNotifications();

  }


  private loadNotifications(): void {

    const stored =
      localStorage.getItem(this.storageKey);

    if (stored) {

      try {

        this.notifications =
          JSON.parse(stored);

      } catch {

        this.notifications = [];

      }

    } else {

      this.notifications = [];

    }

    this.notificationsSubject.next(
      [...this.notifications]
    );

  }


  private saveNotifications(): void {

    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.notifications)
    );

    this.notificationsSubject.next(
      [...this.notifications]
    );

  }


  /*
   * Check whether notifications are enabled
   */
  private areNotificationsEnabled(): boolean {

    const setting =
      localStorage.getItem(
        this.settingsKey
      );

    // Notifications are ON by default
    if (setting === null) {
      return true;
    }

    return setting === 'true';

  }


  getNotifications(): NotificationItem[] {

    return [...this.notifications];

  }


  getUnreadCount(): number {

    return this.notifications.filter(
      notification => !notification.read
    ).length;

  }


  addNotification(
    title: string,
    message: string,
    type: NotificationItem['type']
  ): void {

    /*
     * STOP HERE if notifications are disabled.
     */
    if (!this.areNotificationsEnabled()) {

      return;

    }


    const notification: NotificationItem = {

      id: Date.now(),

      title,

      message,

      type,

      createdAt:
        new Date().toISOString(),

      read: false

    };


    this.notifications.unshift(
      notification
    );


    // Keep only latest 10

    this.notifications =
      this.notifications.slice(0, 10);


    this.saveNotifications();

  }


  markAllAsRead(): void {

    this.notifications =
      this.notifications.map(
        notification => ({
          ...notification,
          read: true
        })
      );


    this.saveNotifications();

  }


  deleteNotification(id: number): void {

    this.notifications =
      this.notifications.filter(
        notification =>
          notification.id !== id
      );


    this.saveNotifications();

  }

}