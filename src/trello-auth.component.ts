import {Component, HostListener, OnInit} from '@angular/core';
import {TrelloService} from './trello.service';
import {Router} from '@angular/router';

declare var TRELLO_API_KEY: string; // injected by webpack's DefinePlugin

interface TrelloMessageEvent {
    data: string;
    source: Window;
}

@Component({
    selector: 'trello-auth',
    template: '<p>{{message}}</p><router-outlet></router-outlet>'
})
export class TrelloAuthComponent implements OnInit {
    message: string;

    constructor(private trello: TrelloService, private router: Router) {
    }

    @HostListener('window:message', ['$event'])
    private onMessage(evt: TrelloMessageEvent): void {
        console.log('auth event', evt);
        evt.source.close();
        if (evt.data) {
            this.trello.authorize(TRELLO_API_KEY, evt.data);
            this.router.navigate(['boards']);
        }
        else {
            this.message = 'Auth failed';
        }
    }

    ngOnInit(): void {
        this.message = 'Requesting access...';
        window.open('https://trello.com/1/authorize?callback_method=postMessage&return_url=http://localhost:8055&scope=read&expiration=never&name=Print+Trello&key=' + TRELLO_API_KEY, 'trelloAuth', 'width=800,height=600');
    }
}
