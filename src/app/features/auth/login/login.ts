import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth-service';
import { CurrentUserService } from '../../../services/current-user-service';
import { LoadingService } from '../../../services/loading-service';

@Component({
  selector: 'app-login',
  imports: [RouterLink, FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private currentUserService: CurrentUserService,
    private loadingService: LoadingService,
  ) {}

  login(): void {
    this.authService
      .login(this.email, this.password)
      .subscribe({
        next: (resp) => {
          this.currentUserService.setUser(resp.user);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
}
