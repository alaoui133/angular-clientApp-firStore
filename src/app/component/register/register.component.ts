import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { FlashMessage } from 'angular2-flash-messages/module/flash-message';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email!: string;
  password!: string;
  constructor(private authService: AuthClientService, private route: Router,

    private flasMessage: FlashMessagesService) { }

  ngOnInit(): void {
  }

  onRegister() {
    this.authService.onRegister(this.email, this.password)
      .then((register:any) => {
        if (register) {
          this.flasMessage.show("Congratulation you are logged",{cssClass:"alert-success",
        timeout:4000})
         this.route.navigate(["/dashboard"])
        }
      }).catch((error:any)=>{
        this.flasMessage.show(error,{cssClass:"alert-success",
        timeout:4000})
         this.route.navigate(["/dashboard"])
      })
  }

}
