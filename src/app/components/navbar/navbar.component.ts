import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  isConnected : boolean = false;
  userRole! : string | null;

  constructor(private _authService : AuthService) {}

  ngOnInit(): void {
    this._authService.isConnected$.subscribe((connectionState : boolean) => {
      console.log('ETAT DE CONNEXION : ', connectionState);
      this.isConnected = connectionState;
    })
    this._authService.userRole$.subscribe((userRole : string | null) => {
      this.userRole = userRole;
    })
  }

  disConnect() : void {
    this._authService.logout();
  }
}
