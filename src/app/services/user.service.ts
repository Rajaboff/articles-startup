import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export enum UserRole {
  Admin = 'admin',
  Client = 'client',
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isAdmin = new BehaviorSubject<UserRole>(UserRole.Client);

  constructor() { }
}
