import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
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
    cashFlows: []
  };

  npvForm = this.formBuilder.group({
    investment: 0,
    lowerBound: 0,
    upperBound: 0,
    increment: 0
  });

  constructor(private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    const incrementInput = document.getElementById('increment') as HTMLInputElement;

    if (incrementInput) {
      incrementInput.addEventListener('change', (event: Event) => {
        const target = event.target as HTMLInputElement;
        const newValue = parseFloat(target.value); // Convert to number

        if (!isNaN(newValue)) {
          setTimeout(this.generateCashFlowInput, 500);
        }
      });
    }
  }

  generateCashFlowInput() {
    debugger;
    let periods = 0;
    const lowerBoundInput = document.getElementById('lowerBound') as HTMLInputElement;
    const upperBoundInput = document.getElementById('upperBound') as HTMLInputElement;
    const incrementInput = document.getElementById('increment') as HTMLInputElement;
    const textBoxContainer = document.getElementById('textBoxContainer') as HTMLDivElement;

    textBoxContainer.innerHTML = '';

    for (var start = parseInt(lowerBoundInput.value); start <= parseInt(upperBoundInput.value); start += parseInt(incrementInput.value)) {
      periods++;
    }

    
    for (let i = 0; i < periods; i++) {
      const newTextBox = document.createElement('input');
      newTextBox.type = 'text';
      newTextBox.placeholder = `Textbox ${i + 1}`;
      newTextBox.id = `textBox_${i}`; // Optional: assign unique IDs
      textBoxContainer.appendChild(newTextBox);
      textBoxContainer.appendChild(document.createElement('br')); // Optional: add line break
    }

  }

  onSubmit() {
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
