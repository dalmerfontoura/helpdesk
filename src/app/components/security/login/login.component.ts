import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { SharedService } from 'src/app/services/shared.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { CurrentUser } from 'src/app/model/current-user.model';
import { routes } from 'src/app/app.routes';
import { invalid } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User('', '', '', '');
  shared: SharedService;
  message: string;

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
  }

  login() {
    this.message = '';
    this.userService.login(this.user).subscribe((userAutentication: CurrentUser) => {
      this.shared.token = userAutentication.token;
      this.shared.user = userAutentication.user;
      this.shared.user.profile = this.shared.user.profile.substr(5);
      this.shared.showTemplate.emit(true);
      this.router.navigate(['/']);
    }, err => {
      this.shared.token = null;
      this.shared.user = null;
      this.shared.showTemplate.emit(false);
      this.message = 'Erro';
    });
  }

  cancelLogin() {
    this.message = '';
    this.user = new User('', '', '', '');
    window.location.href = '/login';
    window.location.reload();
  }

  getFormGroupClass(isInvalid: boolean, isDirty): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-succes': !isInvalid && !isDirty
    };
  }

}
