import { Component, OnInit, Renderer } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private render: Renderer) { }

  ngOnInit() {
    this.render.setElementClass(document.body, 'theme-deep-orange', true);
  }

}
