import { Component, OnInit } from '@angular/core';
import { FetchDataService } from './fetch-data/fetch-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'coolschrank';

  constructor(private fetchDataService: FetchDataService) { }

  public ngOnInit(): void {
    this.fetchDataService.createFridge().subscribe(response => console.log(response));
  }
}
