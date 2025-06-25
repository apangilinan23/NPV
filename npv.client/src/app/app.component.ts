import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import {NpvViewModel} from './npv-view-model'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public results: NpvViewModel = {
    cashFlow:0,
    increment:0,
    lowerBound: 0,
    upperBound:0
  };

  npvForm = this.formBuilder.group({
    cashFlow: 0,
    lowerBound: 0,
    upperBound: 0,
    increment: 0
  });

  constructor(private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {    
  }

  onSubmit(){
    debugger;
    this.http.post<NpvViewModel>('/npv', this.npvForm.value).subscribe(
      (result) => {
        this.results = result;
      },
      (error) => {
        console.error(error);
      }
    );
    
  }

  title = 'npv.client';
}
