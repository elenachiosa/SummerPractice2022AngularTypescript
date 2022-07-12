import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';

const routes: Routes = [
  {
    path: 'overview',
    component: UserOverviewComponent,
  },
  {
    path: 'settings',
    component: UserSettingsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
