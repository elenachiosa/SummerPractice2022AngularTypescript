import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserSettingsComponent } from './user-settings/user-settings.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UserOverviewComponent, UserSettingsComponent],
  imports: [CommonModule, UsersRoutingModule, HttpClientModule],
  exports: [UserOverviewComponent, UserSettingsComponent],
})
export class UsersModule {}
