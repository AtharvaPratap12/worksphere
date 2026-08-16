import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private readonly authKey = 'worksphere_logged_in';

    login(email: string, password: string): boolean {

        // Demo credentails
        if (
            email === 'admin@worksphere.com' && 
            password === 'admin123'
        ) {
            localStorage.setItem(
                this.authKey,
                'true'
            );

            return true;
        }

        return false;
 
    }

    logout(): void {
        localStorage.removeItem(
            this.authKey
        );
    }


    isLoggedIn(): boolean {

        return localStorage.getItem(
        this.authKey
        ) === 'true';

    }

}
