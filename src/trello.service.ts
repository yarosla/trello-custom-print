import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import {TrelloBoard} from './trello.interfaces';

@Injectable()
export class TrelloService {
    private apiKey: string;
    private token: string;

    constructor(private http: Http) {}

    authorize(apiKey: string, token: string) {
        this.apiKey = apiKey;
        this.token = token;
    }

    isAuthorized(): boolean {
        return !!this.token;
    }

    listBoards(): Observable<TrelloBoard> {
        return this.callTrello('/members/me', {boards: 'open'})
            .map((me) => me.boards);
    }

    fetchBoard(boardId: string): Observable<TrelloBoard> {
        return this.callTrello('/boards/' + boardId, {
            lists: 'all',
            members: 'all',
            pluginData: 'true',
            checklists: 'all',
            cards: 'all',
            card_checklists: 'all',
            card_pluginData: 'true',
            labels: 'all'
        });
    }

    private callTrello(path: string, params: {[key: string]: string}): Observable<any> {
        let _params = new URLSearchParams();
        for (let k in params) _params.set(k, params[k]);
        _params.set('key', this.apiKey);
        _params.set('token', this.token);

        let url = 'https://api.trello.com/1' + path;
        return this.http.get(url, {search: _params})
            .map((res) => res.json());
    }
}
