import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const components = [MenuComponent, RegisterComponent, PageNotFoundComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
})
export class CoreModule {}
