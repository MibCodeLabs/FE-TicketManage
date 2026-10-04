import { Routes } from '@angular/router';
import { AuthLayout } from './layout/auth-layout/auth-layout';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { MainLayout } from './layout/main-layout/main-layout';
import { Home } from './features/home/home';

export const routes: Routes = [ {
    path: '',
    component: AuthLayout,
    children: [
      {
        path: 'login',
        component: Login
      },
      {
        path: 'register',
        component: Register
      }
    ]
  },

  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'home',
        component: Home
      }
    ]
  },

  {
    path: '**',
    redirectTo: 'login'
  }];
