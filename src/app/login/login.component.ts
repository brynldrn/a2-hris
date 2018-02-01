import { Component, OnInit, Renderer } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: any = {};
  error: Boolean;

  constructor(private renderer: Renderer, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.renderer.setElementClass(document.body, 'login-page', true);
    if (localStorage.getItem('currentUser')) {
      location.href = '/dashboard';
    }
  }

  login() {
    this.authService.login(this.user.username, this.user.password).subscribe(res => {
      if (res != null) {
        location.href = '/dashboard';
        this.error = false;
      } else {
        this.error = true;
      }
    });
  }

}
