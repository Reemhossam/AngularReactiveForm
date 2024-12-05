import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomValidtors, noSpaceAllowed } from './Validators/noSpaceAllowed.validator';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  //providers:[CustomValidtors]
})
export class AppComponent implements OnInit{
  title = 'AngularReactiveForm';
  registerForm: FormGroup;

  ngOnInit(){
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidtors.noSpaceAllowed]),
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
        new FormControl(null, Validators.required),
      ]),
      experience: new FormArray([
        new FormGroup({
          compony: new FormControl(null),
          posation: new FormControl(null),
          totalExp: new FormControl(null),
          start: new FormControl(null),
          end: new FormControl(null),
        })
      ])
      })
  }

  onSubmit() {
    console.log('Your form data:', this.registerForm);
  }

  onButtonAddSkillClicked(){
    const skills = this.registerForm.controls['skills'] as FormArray;
    skills.push(new FormControl(null, Validators.required));
  }

  onButtonDeleteSkillClicked(i: number){
    const skills = this.registerForm.controls['skills'] as FormArray;
    skills.removeAt(i)
  }

  onButtonAddExperienceClicked(){
    const experience = this.registerForm.controls['experience'] as FormArray;
    experience.push(new FormGroup({
      compony: new FormControl(null),
      posation: new FormControl(null),
      totalExp: new FormControl(null),
      start: new FormControl(null),
      end: new FormControl(null),
    })
  );
  }

  onButtonDeleteExperienceClicked(i){
    const skills = this.registerForm.controls['experience'] as FormArray;
    skills.removeAt(i)
  }
}
