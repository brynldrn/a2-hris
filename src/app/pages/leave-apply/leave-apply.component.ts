import swal from 'sweetalert';
import { Component, OnInit, Renderer } from '@angular/core';
import { LeaveService } from '../../leave.service';
import { NgForm } from '@angular/forms';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'app-leave-apply',
  templateUrl: './leave-apply.component.html',
  styleUrls: ['./leave-apply.component.css']
})
export class LeaveApplyComponent implements OnInit {

  private leave: any = {};

  constructor(private render: Renderer, private leaveService: LeaveService, private jwtHelper: JwtHelper) {
  }

  ngOnInit() {
    this.render.setElementClass(document.body, 'theme-deep-orange', true);
    this.leave.empID = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).user._id;
    this.leave.fullName = this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).user.first_name + ' '
      + this.jwtHelper.decodeToken(JSON.parse(localStorage.getItem('currentUser')).token).user.last_name;
    this.leave.leave_status = 'PENDING';
  }

  submit(f: NgForm) {
    swal({
      title: 'Confirmation',
      text: 'Are you sure you want to submit this application?',
      icon: 'info',
      buttons: ['CANCEL', 'OK'],
      dangerMode: true
    }).then(isSure => {
      if (isSure) {
        this.leaveService.applyLeave(this.leave).subscribe(res => {
          if (res) {
            swal({
              title: 'Success!',
              text: 'The HR is now reviewing your request. Thanks for submitting.',
              icon: 'success',
            });
            this.leave = {};
            f.resetForm();
          } else {
            swal({
              title: 'Error!',
              text: 'Please check your inputs.',
              icon: 'warning',
              buttons: ['OK']
            });
          }
        });
      }
    });
  }

}
