import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { timeout } from 'rxjs';
import { AuthClientService } from 'src/app/services/auth-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email!: string;
  password!: string;
  constructor(private authService: AuthClientService,
    private flashMessage: FlashMessagesService,
    private route: Router) { }

  ngOnInit(): void {
    this.authService.getAuth().subscribe((auth) => {
      if (auth) {
        return this.route.navigate(["/dashboard"]);
      }
      return 1;
    })
  }

  onLogin() {
    this.authService.login(this.email, this.password)
      .then(auth => {
        if (auth) {
          this.flashMessage.show("You are logged successfully", { cssClass: "alert-success", timeout: 5000 })
        }
        this.route.navigate(["/dashboard"]);
      })
      .catch(err => {
        this.flashMessage.show(err
          , { cssClass: "alert-danger", timeout: 10000 })

      }
      )
  }



  onLoginWithGoogle() {

    this.authService.loginWithGoogle()
      .then(auth => {
        if (auth) {
          this.flashMessage.show("You are logged successfully", { cssClass: "alert-success", timeout: 5000 })
        }
        this.route.navigate(["/dashboard"]);
      })
      .catch(err => {
        this.flashMessage.show(err
          , { cssClass: "alert-danger", timeout: 10000 })

      }
      )

  }

 

}
