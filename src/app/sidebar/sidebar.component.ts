import { Component, OnInit } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';
import { AuthService } from '../auth.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  email: String;
  fullName: String;
  constructor(private jwtHelper: JwtHelper, private auth: AuthService) { }

  ngOnInit() {
    this.email = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).user.email;
    this.fullName = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).user.first_name + ' '
      + this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).user.last_name;
  }

  logout() {
    swal({
      title: 'Logout Confirmation',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: ['Close', 'OK'],
      dangerMode: true,
    })
      .then((res) => {
        if (res) {
          this.auth.logout();
        }
      });
  }

}
