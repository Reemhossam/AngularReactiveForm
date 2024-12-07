import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators  } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { CustomValidtors, noSpaceAllowed, userNameAllowedValidator } from './Validators/noSpaceAllowed.validator';

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
  formStatus:string='';

  firstname:string='';
  lastname:string='';
  email:string='';
  username:string='';
  dob:string='';
  street:string='';
  country:string='';
  city:string='';
  region:string='';
  postal:string='';

  ngOnInit(){
    this.registerForm = new FormGroup({
      firstname: new FormControl(null, [Validators.required, noSpaceAllowed]),
      lastname: new FormControl(null, [Validators.required, CustomValidtors.noSpaceAllowed]),
      email: new FormControl(null, [Validators.required,Validators.email]),
      username: new FormControl(null,Validators.required,userNameAllowedValidator.createValidator),
      dob: new FormControl(null,[Validators.required]),
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

      // this.registerForm.controls['firstname'].valueChanges.subscribe((value)=>{
      //   console.log(value);
      // })

      // this.registerForm.valueChanges.subscribe((value)=>{
      //   console.log(value);
      // })

      // this.registerForm.controls['email'].statusChanges.subscribe((status)=>{
      //   console.log(status);

      this.registerForm.statusChanges.subscribe((status)=>{
        //console.log(status);
        this.formStatus = status
      });
  }

  onSubmit() {
    console.log('Your form data:', this.registerForm);
    this.registerForm.reset();
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

  onUsernameButtonClick(){
    let userName='';
    if(String(this.registerForm.controls['firstname'].value).length>3)
      userName += String(this.registerForm.controls['firstname'].value).slice(0,3).toLowerCase()
    else userName += String(this.registerForm.controls['firstname'].value).toLowerCase();

    if(String(this.registerForm.controls['lastname'].value).length>3)
      userName += String(this.registerForm.controls['lastname'].value).slice(0,3).toLowerCase()
    else userName += String(this.registerForm.controls['lastname'].value).toLowerCase();

    userName += new Date(this.registerForm.controls['dob'].value).getFullYear();
    
    // this.registerForm.setValue({
    //   address: 
    //   {
    //     street: this.registerForm.value.address.street, 
    //     country: this.registerForm.value.address.country, 
    //     city: this.registerForm.value.address.city, 
    //     region: this.registerForm.value.address.region,  
    //     postal: this.registerForm.value.address.postal
    //   },
    //   dob: this.registerForm.value.dob,
    //   email: this.registerForm.value.email,
    //   experience: this.registerForm.value.experience,
    //   firstname: this.registerForm.value.firstname,
    //   gender: this.registerForm.value.gender,
    //   lastname: this.registerForm.value.lastname,
    //   skills: this.registerForm.value.skills,
    //   username: userName
    // })

    // this.registerForm.patchValue({
    //   username: userName
    // })

    this.registerForm.controls['username'].setValue(userName)
  }

  onSubmitForm(){
    this.firstname = this.registerForm.controls['firstname']?.value;
    this.lastname = this.registerForm.controls['lastname']?.value;
    this.email = this.registerForm.controls['email']?.value;
    this.username = this.registerForm.controls['username']?.value;
    this.dob = this.registerForm.controls['dob']?.value;
    this.street = this.registerForm.get('address.street')?.value;
    this.country = this.registerForm.get('address.country')?.value;
    this.city = this.registerForm.get('address.city')?.value;
    this.region = this.registerForm.get('address.region')?.value;
    this.postal = this.registerForm.get('address.postal')?.value;
    console.log('this.country'+this.country);
  }
}
