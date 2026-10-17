
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CurrentUserService } from '../../core/services/current-user-service';
import { SidebarOption, sideBarOptions as SIDEBAR_OPTIONS } from './sidebar.config';
import { AccountType } from '../../enum/account-type.enum';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private currentUserService = inject(CurrentUserService);

  readonly sideBarOptions = computed<readonly SidebarOption[]>(() => {
    const user = this.currentUserService.currentUser();

    if (!user) {
      return [];
    }

    return SIDEBAR_OPTIONS[user.accountType] ?? [];
  });
}
