import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { AccessService } from './services/access/access.service';
import { LoginComponent } from './login/login.component';
import { HeadComponent } from './head/head.component';
import { PanelComponent } from './panel/panel.component';
import { TableComponent } from './table/table.component';
import { SearchComponent } from './search/search.component';
//import { TscUiModule } from 'tsc-ui';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HeadComponent,
    PanelComponent,
    TableComponent,
    SearchComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    //TscUiModule
  ],
  providers: [AccessService],
  bootstrap: [AppComponent]
})
export class AppModule { }
