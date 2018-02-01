import { Component, OnInit, Renderer } from '@angular/core';
import { LeaveService } from '../../leave.service';

@Component({
  selector: 'app-leave-history',
  templateUrl: './leave-history.component.html',
  styleUrls: ['./leave-history.component.css']
})
export class LeaveHistoryComponent implements OnInit {
  private data = [];
  constructor(private render: Renderer, private leaveService: LeaveService) { }

  ngOnInit() {
    this.render.setElementClass(document.body, 'theme-deep-orange', true);
    this.leaveService.getAllHistory().subscribe(res => {
      this.data = res.json();
    });
  }

}
