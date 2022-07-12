import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuComponent } from './components/menu/menu.component';
import { RegisterComponent } from './components/register/register.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const components = [[MenuComponent, RegisterComponent, PageNotFoundComponent]];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule],
})
export class CoreModule {}
