import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm : FormGroup;

  constructor(
    private _fb : FormBuilder,
    private _authService : AuthService,
    private _router : Router
  ) {
    this.registerForm = this._fb.group({
      firstname : [null, Validators.required],
      lastname : [null, Validators.required],
      pseudo : [null, Validators.required],
      email : [null, [Validators.required, Validators.email]],
      password : [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]]
    })
  }

  fileAvatar! : File
  loadFile(e : any) : void {
    this.fileAvatar = e.target.files[0]
  }

  createAccount() {
    if(this.registerForm.valid) {
      this._authService.register(this.registerForm.value, this.fileAvatar).subscribe({
        
        next : (res) => {
          // console.log(res);
          
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
      this.registerForm.markAllAsTouched();
    }
  }
}
