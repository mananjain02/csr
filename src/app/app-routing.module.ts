import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { StudentAllRequestComponent } from './student/student-all-request/student-all-request.component';
import { AllRequestsComponent } from './warden/all-requests/all-requests.component';

const routes: Routes = [
  { path:'', component: HomeComponent, pathMatch:'full' },
  { path:'my-requests', component: StudentAllRequestComponent },
  { path: 'all-requests', component: AllRequestsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
