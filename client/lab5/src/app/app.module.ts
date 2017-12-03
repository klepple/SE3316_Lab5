import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth.guard';

// Import the Http Module and our Data Service
import { HttpModule } from '@angular/http';
import { DataService } from './data.service';
import { PublicpageComponent } from './publicpage/publicpage.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { PrivacyPolComponent } from './privacy-pol/privacy-pol.component';


const appRoutes:Routes = [
  { path:'', component: PublicpageComponent, pathMatch: 'full' },
  { path: 'login', component: LoginFormComponent },
  { path: 'signup', component: SignupFormComponent },
  { path: 'privacy', component: PrivacyPolComponent },
  { path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    DashboardComponent,
    PublicpageComponent,
    SignupFormComponent,
    PrivacyPolComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpModule
  ],
  providers: [UserService, AuthGuard, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }