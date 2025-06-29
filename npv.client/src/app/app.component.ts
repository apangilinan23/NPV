import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { NpvResultViewModel } from './npv-result-view-model'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  npvForm: any;

  npvResults: NpvResultViewModel[] = [];

  constructor(private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private location: Location
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
      newTextBox.setAttribute('placeholder', `Cashflow ${i+1}`);

      newTextBoxDiv.appendChild(newTextBox);
      textBoxContainer.appendChild(newTextBoxDiv);
    }
  }

  validateForm(): boolean {
    if (this.npvForm.value.increment < 1 || this.npvForm.value.investment < 1
      || this.npvForm.value.upperBound < 1 || this.npvForm.value.lowerBound < 1
      || this.npvForm.value.cashFlowNumber < 1 || this.npvForm.value.lowerBound > this.npvForm.value.upperBound
      || this.npvForm.value.cashFlowArray.some((n: number) => n < 1)
      || this.npvForm.value.cashFlowArray.some((n: number) => isNaN(n))) {
      return false;
    } else {
      return true;
    }
  }

  onSubmit() {    
    const cashFlowList = document.querySelectorAll('.cash-flow-item');
    cashFlowList.forEach((element: Element) => {
      let valElem = element as HTMLInputElement
      this.npvForm.value.cashFlowArray.push(parseFloat(valElem.value));
    });

    if (!this.validateForm()) {
      alert('Invalid input.');
      this.npvForm.value.cashFlowArray = [];
      return;
    }

    this.http.post<NpvResultViewModel[]>('/npv', this.npvForm.value).subscribe(
      (result) => {
        this.npvResults = result;
        this.npvForm.value.cashFlowArray = [];
        const serializedItems = JSON.stringify(this.npvResults);
        this.router.navigate(['results-component'], { queryParams: { data: serializedItems } })
          .catch((err) => {
            console.log(err)
          });

      },
      (error) => {
        console.error(error);
      }
    );

  }

  title = 'npv.client';

  clear() {
    this.npvForm.value.cashFlowArray = [];
    this.location.replaceState('');
    window.location.reload();
  }
}
