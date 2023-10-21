import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService } from 'app/services/loading.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordForm!: FormGroup;
  senhaNova = '' as string;
  confirmaSenhaNova = '' as string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      senhaNova: ['', [Validators.minLength(8)]],
      confirmaSenhaNova: ['', [Validators.minLength(8)]],
    });
  }

  alterarSenha() {
    console.log('chamou o alterar senha');
    this.loadingService.loading$.subscribe((isLoading) => {
      console.log('Loading is:', isLoading);
    });
    this.loadingService.show();
  }
}
