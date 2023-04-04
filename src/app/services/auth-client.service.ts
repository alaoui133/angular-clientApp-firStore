import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseApps } from '@angular/fire/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from "firebase/compat/app";
import { ClientService } from './client.service';
import { Router } from '@angular/router';






@Injectable({
  providedIn: 'root'
})
export class AuthClientService {

  status!:boolean;
  constructor(private afAuth:AngularFireAuth,private clientService:ClientService,
    private route:Router) { }

  login(email:string,password:string){
    return new Promise((reslove,reject)=>{
      this.afAuth.signInWithEmailAndPassword(email,password)
      .then((userData)=>reslove(userData),(error)=>reject(error)); 
      
    });
  }

  loginWithGoogle(){
    return new Promise((reslove,reject)=>{
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userData)=>reslove(userData),(error)=>reject(error));
      
      
    });

  }

  getAuth(){
    return this.afAuth.authState.pipe(auth=> auth);
  }

  logOut(){
    this.afAuth.signOut();
  }
   
  checkLogin():boolean{
    this.getAuth().subscribe((auth) => {
      if (auth) {
        this.status=true;
      } else{
        this.status= false;
      }
     
    })
     return this.status;
  }


  onRegister(email:string,password:string){
    return new Promise((reslove,reject)=>{
      this.afAuth.createUserWithEmailAndPassword(email,password,)
      .then((userData)=>reslove(userData),(error)=>reject(error)); 
      
    });
  }
  
}
