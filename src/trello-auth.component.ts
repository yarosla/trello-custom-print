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
    // https://developers.trello.com/authorize
    // https://trello.com/1/client.coffee

    message: string;

    constructor(private trello: TrelloService, private router: Router) {
    }

    @HostListener('window:message', ['$event'])
    private onMessage(evt: TrelloMessageEvent): void {
        evt.source.close();
        if (evt.data && /[0-9a-f]{64}/.test(evt.data)) {
            this.trello.authorize(TRELLO_API_KEY, evt.data);
            this.router.navigate(['boards']);
        }
        else {
            this.message = 'Auth failed';
        }
    }

    ngOnInit(): void {
        this.message = 'Requesting access...';
        let origin = window.location.origin;
        window.open('https://trello.com/1/authorize?callback_method=postMessage&return_url=' + origin + '&scope=read&expiration=never&name=Trello+Custom+Print&key=' + TRELLO_API_KEY, 'trelloAuth', 'width=800,height=600');
    }
}
