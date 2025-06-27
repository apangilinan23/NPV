import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './results-component.html',
  styleUrl: './app.component.css'
})
export class ResultsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }


  ngOnInit(): void {
    debugger;
    this.route.queryParams.subscribe(params => {
      const serializedItems = params['data'];
      if (serializedItems) {
        const items = JSON.parse(serializedItems);
        console.log(items);
      }
    });
  }
}