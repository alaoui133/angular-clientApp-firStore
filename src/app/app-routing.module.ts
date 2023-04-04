import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddClientComponent } from './component/add-client/add-client.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { DetailsClientComponent } from './component/details-client/details-client.component';
import { EditClientComponent } from './component/edit-client/edit-client.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { RegisterComponent } from './component/register/register.component';
import { SettingComponent } from './component/setting/setting.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [


  {
    path: "dashboard",
    component: DashboardComponent , canActivate:[AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "client/:id",
    component: DetailsClientComponent,canActivate:[AuthGuard]
  },
  {
    path: "client/edit/:id",
    component: EditClientComponent, canActivate:[AuthGuard]
  },
  {
    path: "addClient",
    component: AddClientComponent, canActivate:[AuthGuard]
  },
  {
    path: "setting",
    component: SettingComponent,canActivate:[AuthGuard]
  },
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "**",
    component: NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
