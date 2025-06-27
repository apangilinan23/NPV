import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NpvResultViewModel } from './npv-result-view-model';


@Component({
  selector: 'app-root',
  templateUrl: './results-component.html',
  styleUrl: './app.component.css'
})
export class ResultsComponent implements OnInit {
  constructor(private route: ActivatedRoute) {
  }

  results: NpvResultViewModel[] = [];


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const serializedItems = params['data'];
      if (serializedItems) {
        const items = JSON.parse(serializedItems);
        console.log(items);

        items.forEach((item: NpvResultViewModel) => {
          let parsedDiscountRate = (item.discountRate * 100).toFixed(2);
          let parsedNpv = item.npv.toFixed(2);
          this.results.push({ discountRate: parseFloat(parsedDiscountRate), npv: parseFloat(parsedNpv) });
        })


      }
    });
  }
}