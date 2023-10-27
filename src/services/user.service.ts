import { Injectable } from '@angular/core';
import {
  Auth,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private auth: Auth) {}

  register({ email, password }: { email: string; password: string }) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  loginWithCredentials({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }
}
