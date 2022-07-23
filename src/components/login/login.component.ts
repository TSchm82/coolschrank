import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
  selector: 'components-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  public user: string;
  public password: string;

  constructor(public authService: AuthService) { }

  public login() {
    this.authService.login(this.user, this.password);
  }

}
