import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {TrelloService} from './trello.service';

@Injectable()
export class TrelloAuthGuard implements CanActivate {

    constructor(private trello: TrelloService, private router: Router) {}

    canActivate() {
        var authorized = this.trello.isAuthorized();
        if (!authorized)
            this.router.navigate(['auth']);
        return authorized;
    }
}
