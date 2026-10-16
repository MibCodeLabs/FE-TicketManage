import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentUserService } from '../../services/current-user-service';
import { constructURL } from '../../utils/Utils';
import { AuthService } from '../../services/auth-service';
import { LoadingService } from '../../services/loading-service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private currentUserService = inject(CurrentUserService);
  private authService = inject(AuthService);
  private loadingService = inject(LoadingService);
  private router = inject(Router);

  profileUrl = computed(() => {
    const picture = this.currentUserService.currentUser()?.profilePicture;

    return picture ? constructURL(picture) : '';
  });

  fullName = computed(() => {
    return this.currentUserService.currentUser()?.fullName;
  });

  role = computed(() => {
    return this.currentUserService.currentUser()?.accountType;
  });

  logout() {
    this.loadingService.setDisplayText('Logging Out');
    this.loadingService.setLoading(true);

    this.authService
      .logout()
      .pipe(
        finalize(() => {
          this.loadingService.clearMessage();
          this.loadingService.setLoading(false);
          this.router.navigate(["/login"])
        }),
      )
      .subscribe({
        error: (err) => {
          console.error('Logout failed:', err);
        },
      });
  }
}
