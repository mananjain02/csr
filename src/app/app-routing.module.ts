import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentAllRequestComponent } from './student/student-all-request/student-all-request.component';
import { AllRequestsComponent } from './warden/all-requests/all-requests.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGaurd } from './auth/auth.gaurd';
import { EditProfileComponent } from './student/edit-profile/edit-profile.component';

// uncomment when authentication is ready
const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', component: HomeComponent, pathMatch:'full', canActivate: [AuthGaurd] },
  { path: 'my-requests', component: StudentAllRequestComponent, canActivate: [AuthGaurd] },
  { path: 'all-requests', component: AllRequestsComponent, canActivate: [AuthGaurd] },
  { path: 'profile', component: EditProfileComponent, canActivate: [AuthGaurd] },
  { path: '**', redirectTo:'' }
];

// const routes: Routes = [
//   { path:'login', component: LoginComponent},
//   { path:'', component: HomeComponent, pathMatch:'full' },
//   { path:'my-requests', component: StudentAllRequestComponent },
//   { path: 'all-requests', component: AllRequestsComponent },
//   { path: 'profile', component: EditProfileComponent },
//   { path: '**', redirectTo:'/' }
// ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGaurd]
})
export class AppRoutingModule { }
