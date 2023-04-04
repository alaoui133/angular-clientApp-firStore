import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { map, observable } from 'rxjs';
import { Client } from '../model/client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  clientCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client> | undefined;

  constructor(private afs: AngularFirestore) {

    this.clientCollection = afs.collection('clients');


  }

  getClients(user:string): Observable<Client[]> {
    return this.afs.collection('clients',ref=>ref.where('user','==',user)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );

  }

  newClient(client: Client) {
    this.clientCollection.add(client);
  }

  getClient(id: string):any {
   return this.clientCollection.doc(id).valueChanges();

  }

  updateClient(client:Client){

   this.clientDoc= this.clientCollection.doc(client.id);
    this.clientDoc.update(client);
  }

  deleteClient(client:Client){
     this.clientDoc= this.clientCollection.doc(client.id);
     this.clientDoc.delete();
  }
}
