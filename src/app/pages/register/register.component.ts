import { Component } from '@angular/core';
import {HeaderComponent} from "../../layouts/header/header.component";
import {HeroSectionComponent} from "../../components/hero-section/hero-section.component";
import {FooterComponent} from "../../layouts/footer/footer.component";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    HeaderComponent,
    HeroSectionComponent,
    FooterComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  Register: string | undefined;
  form: FormGroup;
  errorMessage: string = '';
  backendErrors: Record<string, string> = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      username: new FormControl('', [Validators.required, Validators.minLength(6)]),
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      cin: new FormControl('', [Validators.required]),
      nationality: new FormControl('', [Validators.required]),
      licenseExpirationDate: new FormControl('', [Validators.required, this.futureDateValidator])
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.authService.register(this.form.value).subscribe({
        next: () => {
          this.router.navigate(['login']);
        },
        error: (error: any) => {
          this.errorMessage = 'Registration failed';
          if (error.error) {
            this.mapBackendErrors(error.error);
          }
        },
      });
    }
  }

  private mapBackendErrors(errors: Record<string, string>): void {
    this.backendErrors = errors;

    // Map backend errors to form controls
    Object.keys(errors).forEach(field => {
      const control = this.form.get(field);
      if (control) {
        control.setErrors({ backend: errors[field] });
      }
    });
  }

  futureDateValidator(control: FormControl): { [key: string]: any } | null {
    const date = new Date(control.value);
    if (isNaN(date.getTime())) {
      return { invalidDate: 'Invalid date' };
    }
    if (date <= new Date()) {
      return { notFutureDate: 'Date must be in the future' };
    }
    return null;
  }

  getErrorMessage(controlName: string): string {
    const control = this.form.get(controlName);
    if (control?.hasError('required')) {
      return `${controlName} is required`;
    } else if (control?.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `${controlName} must be at least ${minLength} characters long`;
    } else if (control?.hasError('email')) {
      return 'Invalid email address';
    } else if (control?.hasError('notFutureDate')) {
      return 'Date must be in the future';
    } else if (control?.hasError('backend')) {
      return control.getError('backend');
    }
    return '';
  }
}
