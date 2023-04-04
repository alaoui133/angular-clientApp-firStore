import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';
import { ClientService } from 'src/app/services/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import Swal from 'sweetalert2'
import { AuthClientService } from 'src/app/services/auth-client.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [{}];
  total: number = 0;
  client: Client = {};
  searchClients!:Client[];


  constructor(private clientService: ClientService,
    private router: Router, private flashMessage: FlashMessagesService,
    private route: ActivatedRoute, private authService: AuthClientService) {

  }

  ngOnInit(): void {
    this.authService.getAuth().subscribe(auth => {
      this.clientService.getClients(auth?.uid!).subscribe(clients => {
       this.searchClients= this.clients = clients;
        this.total = this.getTotal();
      });


    });



  }


  getTotal(): any {
    const sum = this.clients.reduce((acc, client) => acc + +parseFloat(client.balance!.toString()), 0);
    return sum;

  }

  getCurrentClient(id: string) {
    this.clientService.getClient(id).subscribe((client: Client) => {
      this.client = client;
    });
    this.client.id = id;

  }

  deleteClient(id: string) {
    this.getCurrentClient(id);
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
        //this.flashMessage.show('Client deleted Successfully', { cssClass: 'alert-danger', timeout: 4000 });
        this.router.navigate(['/dashboard']);

        Swal.fire(
          'Deleted!',
          'This Client has been deleted.',
          'success',

        )
      }
    })




  }

  search(query:string){
    this.searchClients=(query) ? this.clients
    .filter(cl=>cl.firstName!.toLowerCase().includes(query!.toLowerCase()) 
    || cl.lastName!.toLowerCase().includes(query!.toLowerCase())
    || cl.phone!.toString().includes(query!)

    ):this.clients

  }


}






