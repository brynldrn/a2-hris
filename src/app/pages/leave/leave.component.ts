import { Component, OnInit, Renderer } from '@angular/core';
import { LeaveService } from '../../leave.service';
import swal from 'sweetalert';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {

  private data = [];
  private fullName: String;

  constructor(private render: Renderer, private leaveService: LeaveService, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.render.setElementClass(document.body, 'theme-deep-orange', true);
    this.leaveService.getAllLeaves().subscribe(res => {
      this.data = res.json();
    });
  }

  approve(row) {
    swal({
      title: 'Approve Confirmaton',
      text: 'Are you sure you want to approve this leave?',
      icon: 'info',
      buttons: ['Close', 'OK'],
      dangerMode: true,
    })
      .then((isTrue) => {
        if (isTrue) {
          this.leaveService.approveLeave(row).subscribe(success => {
            if (success) {
              swal({
                title: 'Success',
                text: 'Leave Approved!',
                icon: 'success',
                buttons: ['OK'],
              });
              this.leaveService.getAllLeaves().subscribe(res => {
                this.data = res.json();
              });
            } else {
              swal({
                title: 'Error!',
                text: 'There was an error encountered approving this leave. Please contact the devs.',
                icon: 'warning',
                buttons: ['OK'],
              });
            }
          });
        }
      });
  }

  reject(row) {
    swal({
      title: 'Reject Confirmaton',
      text: 'Are you sure you want to reject this leave?',
      icon: 'warning',
      buttons: ['Close', 'OK'],
      dangerMode: true,
    })
      .then((isTrue) => {
        if (isTrue) {
          this.leaveService.rejectLeave(row).subscribe(success => {
            if (success) {
              swal({
                title: 'Success',
                text: 'Leave Rejected!',
                icon: 'success',
                buttons: ['OK'],
              });
              this.leaveService.getAllLeaves().subscribe(res => {
                this.data = res.json();
              });
            } else {
              swal({
                title: 'Error!',
                text: 'There was an error encountered rejecting this leave. Please contact the devs.',
                icon: 'warning',
                buttons: ['OK'],
              });
            }
          });
        }
      });
  }

}
