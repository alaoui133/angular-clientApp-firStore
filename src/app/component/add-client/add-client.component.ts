import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthClientService } from 'src/app/services/auth-client.service';



@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  client: Client = {
    firstName: "",
    lastName: "",
    email: "",
    phone: null,
    balance: null,
    user:""
  }
  constructor(private clientService: ClientService,
              private route: Router,
              private flashMessages: FlashMessagesService,
              private authService:AuthClientService) {

  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth=>{
      this.client.user=auth?.uid
      
    })

  }

  onSubmit() {

    this.clientService.newClient(this.client);

    this.flashMessages.show('Client added successfully', { cssClass: 'alert-primary', timeout: 5000 })
    return this.route.navigate(['/dashboard']);
    console.log(this.client);
  }

}
