import { Component, OnInit } from '@angular/core';

import { CallcenterDataService } from './callcenter-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'dasboard';

  constructor(private callcenterDataService: CallcenterDataService) {}

  ngOnInit() {
    this.getData();
  }

  getData(): void {
    this.callcenterDataService.getData()
      .subscribe(data => console.log('get', data));
  }
}
