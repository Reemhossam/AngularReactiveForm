import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'AngularReactiveForm';
  registerForm: FormGroup;

  ngOnInit(){
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, Validators.required),
      lastname: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required,Validators.email]),
      username: new FormControl(null),
      dob: new FormControl(null),
      gender: new FormControl('male'),
      address: new FormGroup({
        street: new FormControl(null, Validators.required),
        country: new FormControl('India'),
        city: new FormControl(null),
        region: new FormControl(null, Validators.required),
        postal: new FormControl(null, Validators.required)}),
      skills: new FormArray ([
        new FormControl(null),
        new FormControl(null),
        new FormControl(null)
      ])
      })
  }

  onSubmit() {
    console.log('Your form data:', this.registerForm);
  }
}
