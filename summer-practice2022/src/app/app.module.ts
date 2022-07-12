import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersModule } from './features/users/users.module';

import { MenuComponent } from './core/components/menu/menu.component';
import { RegisterComponent } from './core/components/register/register.component';

@NgModule({
  declarations: [AppComponent, RegisterComponent, MenuComponent],
  imports: [BrowserModule, AppRoutingModule, UsersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
