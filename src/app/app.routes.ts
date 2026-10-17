import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './features/home/home';
import { authGuard } from './core/guards/auth-guard';
import { guestGuard } from './core/guards/guest-guard';
import { Message } from './features/message/message';
import { Setting } from './features/setting/setting';
import { Report } from './features/report/report';
import { AccountManagement } from './features/account-management/account-management';
import { DataManagement } from './features/data-management/data-management';
import { Todo } from './features/todo/todo';
import { Complaint } from './features/complaint/complaint';
import { Analytics } from './features/analytics/analytics';
import { TicketList } from './features/ticket/ticket-list/ticket-list';
import { TicketDetail } from './features/ticket/ticket-detail/ticket-detail';
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
  },

  {
    path: '',
    component: AuthLayout,
    canActivate: [guestGuard],
    children: [
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'register',
        component: Register,
      },
    ],
  },

  {
    path: '',
    component: MainLayout,
    canActivate: [authGuard],
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'tickets',
        component: TicketList,
      },
      {
        path: 'tickets/new',
        component: TicketDetail,
      },
      {
        path: 'tickets/:id',
        component: TicketDetail,
      },
      {
        path: 'messages',
        component: Message,
      },
      {
        path: 'settings',
        component: Setting,
      },
      {
        path: 'report',
        component: Report,
      },
      {
        //add guard later
        path: 'accounts-management',
        component: AccountManagement,
      },
      {
        //add guard later
        path: 'data-management',
        component: DataManagement,
      },
      {
        //add guard later
        path: 'todo',
        component: Todo,
      },
      {
        //add guard later
        path: 'complaints',
        component: Complaint,
      },
      {
        //add guard later
        path: 'analytics',
        component: Analytics,
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'home',
  },
];
