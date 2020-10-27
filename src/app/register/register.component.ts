import { AuthenticationService , UserService} from '@/_services';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';



@Component({
selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading  = false;
  submitted = false;

  // DI
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ){
           // redirect to home if already logged in
          //   if (this.authenticationService.currentUserValue) {
          //     this.router.navigate(['/']);
          // }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  onSubmit() {

    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.userService.register(this.registerForm.value)
        .pipe(first())
        .subscribe(
            data => {
                alert("register ok !!");
                //this.router.navigate(['/login']);
            },
            error => {
                alert("cannot register !!");
        });
}

}
