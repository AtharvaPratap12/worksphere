import { Component } from '@angular/core';

import { Theme } from '../../services/theme';

@Component({
  selector: 'app-setting',
  imports: [],
  templateUrl: './setting.html',
  styleUrl: './setting.css',
})
export class Setting {

  isDarkMode = false;

  notificationsEnabled = true;

  constructor(
    private themeService: Theme
  ) {

    this.isDarkMode =
      this.themeService.getCurrentTheme() === 'dark';

    const savedNotifications =
      localStorage.getItem(
        'worksphere_notifications_enabled'
      );

    if (savedNotifications !== null) {

      this.notificationsEnabled =
        savedNotifications === 'true';

    }

  }


  toggleTheme(): void {

  

    this.themeService.toggleTheme();

    this.isDarkMode =
  
    this.themeService.getCurrentTheme() === 'dark';

  }

  toggleNotifications(): void {

    this.notificationsEnabled =
      !this.notificationsEnabled;

    localStorage.setItem(
      'worksphere_notifications_enabled',
      String(this.notificationsEnabled)
    );

  }


  clearDemoData(): void {

    const confirmed = confirm(
      'This will remove all WorkSphere employee and candidate data. Continue?'
    );

    if (!confirmed) {
      return;
    }

    localStorage.removeItem('employees');

    localStorage.removeItem('worksphere_candidates');

    alert(
      'Employee and Candidate demo data has been cleared. Refresh the application to see the changes.'
    );

  }

}
