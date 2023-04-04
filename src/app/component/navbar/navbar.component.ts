import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from 'src/app/services/auth-client.service';
import { AddClientComponent } from '../add-client/add-client.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isCollapsed:boolean = true;
  isLoggedIn!:boolean;
  userLoggedIn!:string;
  constructor(private authService: AuthClientService,
    private flashMessage: FlashMessagesService,
    private route: Router,private collaps:NgbCollapseModule
  ) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth=>{
      if(auth){
        this.isLoggedIn=true;
        this.userLoggedIn=auth.email!;
      }else{
        this.isLoggedIn=false;
      }
    })
  }

  onlogOut() {
    this.authService.logOut();
    this.route.navigate(["/login"]);
    

  }
  
 
  



}
