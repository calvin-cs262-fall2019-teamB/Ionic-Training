import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { DataService } from './data.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private dataService: DataService) {

  }

  canActivate(): boolean {

    if (this.dataService.user.fbid === null) {
      this.router.navigate(['login']);
      return false;
    }

    return true;
    
  }

}