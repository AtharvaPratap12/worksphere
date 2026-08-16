import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from '@angular/router';

import { NotificationItem, NotificationService } from '../services/notification';

import { AuthService } from '../services/auth';
import { Theme } from '../services/theme';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-layout',
  imports: [
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    DatePipe
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css'
})
export class Layout implements OnInit, OnDestroy  {

  isDarkMode = false;

  showNotifications = false;

  showProfile = false;

  notifications: NotificationItem[] = [];

  unreadNotifications = 0;

  private notificationSubscription?: Subscription;

  private themeSubscription?: Subscription; 


  constructor(
    private authService: AuthService,
    private router: Router,
    private themeService: Theme,
    private notificationService: NotificationService
  ) {

    this.isDarkMode =
      this.themeService.getCurrentTheme() === 'dark';

    this.themeSubscription = this.themeService.theme$.subscribe(
      theme => {
        this.isDarkMode = theme === 'dark';
      }
    );
 

  }

  ngOnDestroy(): void {
    this.themeSubscription?.unsubscribe();
  }


  toggleTheme(): void {

    this.themeService.toggleTheme();

    this.isDarkMode =
      this.themeService.getCurrentTheme() === 'dark';

  }

  loadNotifications(): void {

    const allNotifications = this.notificationService.getNotifications();

    this.notifications = allNotifications.filter(
      notification => !notification.read
    );

    this.unreadNotifications = this.notificationService.getUnreadCount();

  }


  toggleNotifications(): void {

    this.showNotifications =
      !this.showNotifications;

    this.showProfile = false;

  }

  markallNotificationsAsRead(): void {

    this.notificationService.markAllAsRead();

    this.loadNotifications();

  }


  toggleProfile(): void {

    this.showProfile =
      !this.showProfile;

    this.showNotifications = false;

  }


  closeDropdowns(): void {

    this.showNotifications = false;

    this.showProfile = false;

  }

  subscribeToNotifications(): void {

    this.notificationService.notifications$.subscribe(() => {
      this.loadNotifications();
    });
  }


  logout(): void {

    this.authService.logout();

    this.router.navigate(['/login']);

  }

  ngOnInit(): void {
    
    this.loadNotifications();

    this,this.notificationSubscription = this.notificationService.notifications$.subscribe(
      notifications => {
        this.notifications = notifications;

        this.unreadNotifications = notifications.filter(
          notification => !notification.read
        ).length;
      });
  }

  ngDestroy(): void {
    this.notificationSubscription?.unsubscribe();
  }






}