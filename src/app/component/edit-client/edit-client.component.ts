import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id!: string;
  client!: Client;
  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private router:Router,
    private flashMessage: FlashMessagesService) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe((client: Client)=>{
      this.client=client;
      console.log(client);
    });
  }

  onSubmit(){
    this.client.id=this.id;
    this.clientService.updateClient(this.client);
    this.flashMessage.show("Client Updated",{cssClass:"alert-success",timeout:4000});
    this.router.navigate(['/client/',this.id])
  }

}
