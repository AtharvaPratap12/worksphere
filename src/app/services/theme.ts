import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root'
})
export class Theme {

  private readonly storageKey = 'worksphere_theme';

  private themeSubject =
    new BehaviorSubject<ThemeMode>(
      this.getStoredTheme()
    );

  theme$ =
    this.themeSubject.asObservable();


  constructor() {

    this.applyTheme(
      this.themeSubject.value
    );

  }


  private getStoredTheme(): ThemeMode {

    const savedTheme =
      localStorage.getItem(this.storageKey);

    return savedTheme === 'dark'
      ? 'dark'
      : 'light';

  }


  getCurrentTheme(): ThemeMode {

    return this.themeSubject.value;

  }


  toggleTheme(): void {

    const newTheme: ThemeMode =
      this.getCurrentTheme() === 'dark'
        ? 'light'
        : 'dark';

    this.setTheme(newTheme);

  }


  setTheme(theme: ThemeMode): void {

    localStorage.setItem(
      this.storageKey,
      theme
    );

    this.themeSubject.next(theme);

    this.applyTheme(theme);

  }


  private applyTheme(
    theme: ThemeMode
  ): void {

    document.body.classList.toggle(
      'dark-mode',
      theme === 'dark'
    );

    document.documentElement.classList.toggle(
      'dark-mode',
      theme === 'dark'
    );

  }

}