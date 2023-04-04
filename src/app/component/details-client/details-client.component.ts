import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrls: ['./details-client.component.css']
})
export class DetailsClientComponent implements OnInit {
  id!: string;
  client!: Client;
  showBalance:boolean=false;
  constructor(private clientService: ClientService,
    private route: ActivatedRoute,
    private router:Router,
    private flashMessage: FlashMessagesService) { }

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
    this.flashMessage.show('Balance Updated',{cssClass:'alert-warning',timeout:4000});
  }


  deleteClient(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {

        this.clientService.deleteClient(this.client);
        this.flashMessage.show('Client deleted Successfully',{cssClass:'alert-danger',timeout:4000});
        this.router.navigate(['/dashboard']);

        Swal.fire(
          'Deleted!',
          'This Client has been deleted.',
          'success',
          
        )
      }
    })




  }
   
    

  }


