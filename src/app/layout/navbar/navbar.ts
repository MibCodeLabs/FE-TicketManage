import { Component, computed, inject} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentUserService } from '../../core/services/current-user-service';
import { constructURL } from '../../utils/Utils';
import { finalize } from 'rxjs';
import { AuthService } from '../../features/auth/services/auth-service';
import { LoadingService } from '../../core/services/loading-service';

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

    this.authService
      .logout()
      .pipe(
        finalize(() => {
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
