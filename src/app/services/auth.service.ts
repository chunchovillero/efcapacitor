import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthenticateService {

    constructor(
      private router: Router,
      private db: AngularFirestore,
      public afAuth: AngularFireAuth
    ) {

    }

    createAccount(value) {
      return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then( res => {
       const uid = res.user.uid;
       console.log('values', res.user.uid, value);
       resolve(res);
      }, err => reject(err));
    });
   }

  loginUser(value) {
   return new Promise<any>((resolve, reject) => {
     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
     .then(
       res => resolve(res),
       err => reject(err)
    );
   });
  }

  logoutUser(iduser) {
    setTimeout(() => {
      return new Promise((resolve, reject) => {
        if (firebase.auth().currentUser) {
          firebase.auth().signOut()
          .then(() => {
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 200);
            resolve();
          }).catch((error) => {
            reject();
          });
        }
      });
    }, 1000);
  }

  userDetails() {
    return firebase.auth().currentUser;
  }

  resetPassword(email: string) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(email)
      .then(
        res => resolve(res),
        err => reject(err)
     );
    });
  }
}
