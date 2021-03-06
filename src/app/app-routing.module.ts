import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PanelComponent } from './panel/panel.component';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './search/search.component';
import { HeadComponent } from './head/head.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'panel',
    component: PanelComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: '',
    component: MainComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
