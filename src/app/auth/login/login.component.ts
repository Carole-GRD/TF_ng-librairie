import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm : FormGroup;


  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
  ) {
    this.loginForm = this._fb.group({
      credential : [null, Validators.required],
      password : [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
    })
  }


  connectToAccount() {
    console.log('test login');
    
    if (this.loginForm.valid) {
      // console.log('test loginForm');

      this._authService.login(this.loginForm.value).subscribe({

        next : (res) => {
          // console.log('RES : ', res);
          // console.log('RES - token : ', res.result.token);
          // console.log('RES - userToConnect : ', res.result.userToConnect.id);
          
          // Mettre dans le localStorage, notre token + autres infos
          localStorage.setItem('token', res.result.token);
          localStorage.setItem('userId', res.result.userToConnect.id.toString());
          localStorage.setItem('userRole', res.result.userToConnect.role);

          // Gestion observable pour savoir si une personne est connectée
          this._authService.connect();    // Pour émettre aux autres composants que la connection est établie
        },

        error : (err) => {
          // TODO : gestion de l'erreur email unique
        },

        complete : () => {
          // Redirection vers accueil
          this._router.navigateByUrl('/');
        },

      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
}
