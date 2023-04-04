import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AddClientComponent } from './component/add-client/add-client.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { SettingComponent } from './component/setting/setting.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { DetailsClientComponent } from './component/details-client/details-client.component';
import { EditClientComponent } from './component/edit-client/edit-client.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { environment } from 'src/environments/environment';
import { ClientsComponent } from './component/clients/clients.component';
import { FormsModule } from '@angular/forms';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { FlashMessagesService } from 'angular2-flash-messages/module/flash-messages.service';
import { AuthClientService } from './services/auth-client.service';
import { ClientService } from './services/client.service';
import { NgbPaginationModule, NgbAlertModule, NgbModule, NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';









@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    AddClientComponent,
    SidebarComponent,
    SettingComponent,
    LoginComponent,
    RegisterComponent,
    DetailsClientComponent,
    EditClientComponent,
    NotFoundComponent,
    ClientsComponent,
    NavbarComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    NgbModule,
    NgbCollapseModule
    
     
    
     
  ],
  providers: [FlashMessagesService,AuthClientService,ClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
