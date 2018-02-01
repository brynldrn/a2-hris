import { Component, OnInit, Renderer } from '@angular/core';
import { EmployeeService } from '../../employee.service';
import { LocalDataSource } from 'ng2-smart-table/lib/data-source/local/local.data-source';
import swal from 'sweetalert';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  private data = [];
  private source: LocalDataSource;
  private settings = {
    mode: 'inline',
    attr: {
      class: 'table table-bordered table-striped table-hover'
    },
    add: {
      addButtonContent: '<span class="text-success"><i class= "material-icons"> add </i></span>',
      confirmCreate: true
    },
    edit: {
      editButtonContent: `<span class="text-info"><i class= "material-icons"> mode_edit </i></span>`,
      saveButtonContent: '<span class="text-success"><i class= "material-icons"> check </i></span>',
      cancelButtonContent: '<span class="text-danger"><i class= "material-icons"> close </i></span>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: `<span class="text-danger"><i class= "material-icons"> delete_forever </i></span>`,
      confirmDelete: true,
    },
    columns: {
      empID: {
        title: 'ID',
        filter: false
      },
      first_name: {
        title: 'First Name',
        filter: false
      },
      last_name: {
        title: 'Last Name',
        filter: false
      },
      middle_name: {
        title: 'Middle Name',
        filter: false
      },
      email_address: {
        title: 'Email Address',
        filter: false,
        type: 'email'
      },
      gender: {
        title: 'Gender',
        filter: false
      },
      date_of_birth: {
        title: 'Birthdate',
        filter: false,
        type: 'date'
      },
      date_hired: {
        title: 'Date Hired',
        filter: false,
        type: 'date'
      },
      date_regular: {
        title: 'Date Regularized',
        filter: false,
        type: 'date'
      },
      date_resigned: {
        title: 'Date Resigned',
        filter: false,
        type: 'date'
      },
      emp_status: {
        title: 'Status',
        filter: false
      },
      vl_credits: {
        title: 'VL Credits',
        filter: false
      },
      sl_credits: {
        title: 'SL Credits',
        filter: false
      },
      el_credits: {
        title: 'EL Credits',
        filter: false
      }
    }
  };

  constructor(private render: Renderer, private employeeService: EmployeeService) {
  }

  ngOnInit() {
    this.render.setElementClass(document.body, 'theme-deep-orange', true);
    this.employeeService.getAllEmployees().subscribe(res => {
      res.json().forEach(el => {
        this.data.push({
          empID: el.empID,
          first_name: el.first_name,
          last_name: el.last_name,
          middle_name: el.middle_name,
          email_address: el.email_address,
          gender: el.gender,
          date_of_birth: el.date_of_birth,
          date_hired: el.date_hired,
          date_regular: el.date_regular,
          date_resigned: el.date_resigned,
          emp_status: el.emp_status,
          vl_credits: el.vl_credits,
          sl_credits: el.sl_credits,
          el_credits: el.el_credits
        });
      });
      this.source = new LocalDataSource(this.data);
    });
  }

  onCreateConfirm(event): void {
    swal({
      title: 'Save Confirmation',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: ['Close', 'OK'],
      dangerMode: true,
    })
      .then((res) => {
        if (res) {
          this.employeeService.addNewEmployee(event.newData).subscribe(success => {
            if (success) {
              event.confirm.resolve();
            } else {
              swal({
                title: 'Error',
                text: 'Errors found on input. Please verify your data.',
                icon: 'warning',
                buttons: ['OK']
              });
            }
          });
        } else {
          event.confirm.reject();
        }
      });
  }

  onSaveConfirm(event): void {
    swal({
      title: 'Save Confirmation',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: ['Close', 'OK'],
      dangerMode: true,
    })
      .then((res) => {
        if (res) {
          this.employeeService.updateEmployee(event.newData).subscribe(result => {
            if (result) {
              event.confirm.resolve();
            } else {
              swal({
                title: 'Error',
                text: 'Errors found on input. Please verify your data.',
                icon: 'warning',
                buttons: ['OK']
              });
            }
          });
        } else {
          event.confirm.reject();
        }
      });
  }

  onDeleteConfirm(event): void {
    swal({
      title: 'Delete Confirmation',
      text: 'Are you sure?',
      icon: 'warning',
      buttons: ['Close', 'OK'],
      dangerMode: true,
    })
      .then((res) => {
        if (res) {
          this.employeeService.deleteEmployee(event.data).subscribe(result => {
            if (result) {
              event.confirm.resolve();
            } else {
              swal({
                title: 'Error',
                text: 'Errors found on input. Please verify your data.',
                icon: 'warning',
                buttons: ['OK']
              });
            }
          });
        } else {
          event.confirm.reject();
        }
      });
  }

}
