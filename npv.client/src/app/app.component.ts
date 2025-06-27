import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms';
import { NpvViewModel } from './npv-view-model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public results: NpvViewModel = {
    investment: 0,
    increment: 0,
    lowerBound: 0,
    upperBound: 0,
    cashFlows: [],
    cashFlowNumber: 0
  };  
  npvForm : any;

  constructor(private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) {     
  }

  ngOnInit() {
    this.npvForm = this.formBuilder.group({
      investment: 0,
      lowerBound: 0,
      upperBound: 0,
      increment: 0,
      cashFlowNumber: 0,
      cashFlowArray: this.formBuilder.array([])
    });


    const cashFlowNumber = document.getElementById('cashFlowNumber') as HTMLInputElement;

    if (cashFlowNumber) {
      cashFlowNumber.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        const newValue = parseFloat(target.value); // Convert to number

        if (!isNaN(newValue)) {
          setTimeout(this.generateCashFlowInput, 50, parseInt(cashFlowNumber.value));
        }
      });

      cashFlowNumber.addEventListener('keyup', (event: Event) => {
        const target = event.target as HTMLInputElement;
        const newValue = parseFloat(target.value); // Convert to number

        if (!isNaN(newValue)) {
          setTimeout(this.generateCashFlowInput, 50, parseInt(cashFlowNumber.value));
        }
      });
    }
  }

  generateCashFlowInput(cashFlowCount: number) {
    const textBoxContainer = document.getElementById('textBoxContainer') as HTMLDivElement;

    textBoxContainer.innerHTML = '';
    for (let i = 0; i < cashFlowCount; i++) {

      let newTextBox = document.createElement('input');
      let newTextBoxDiv = document.createElement('div');
      newTextBoxDiv.className = 'col';

      newTextBox.type = 'text';
      newTextBox.id = `cash-flow${i}`;
      newTextBox.className = 'form-control cash-flow-item';

      newTextBoxDiv.appendChild(newTextBox);
      textBoxContainer.appendChild(newTextBoxDiv);
    }

  }

  onSubmit() {
    
    const cashFlowList = document.querySelectorAll('.cash-flow-item');

    cashFlowList.forEach((element: Element) => {
      let valElem = element as HTMLInputElement
      this.npvForm.value.cashFlowArray.push(parseFloat(valElem.value));
    });

    this.http.post<NpvViewModel>('/npv', this.npvForm.value).subscribe(
      (result) => {
        this.results = result;
        this.npvForm.value.cashFlowArray = [];
      },
      (error) => {
        console.error(error);
      }
    );

  }

  title = 'npv.client';
}
