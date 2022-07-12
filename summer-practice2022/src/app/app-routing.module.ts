import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';
import { RegisterComponent } from './core/components/register/register.component';
import { MyFirstGuardGuard } from './shared/guards/my-first-guard.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    canActivate: [MyFirstGuardGuard],
    component: RegisterComponent,
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./features/users/users.module').then(
        (module) => module.UsersModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
