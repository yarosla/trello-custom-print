import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TrelloService} from './trello.service';
import {TrelloBoard} from './trello.interfaces';

@Component({
    selector: 'boards-list',
    templateUrl: './boards-list.component.html',
})
export class BoardsListComponent implements OnInit {
    boards: Observable<TrelloBoard[]>;

    constructor(private trello: TrelloService) {
    }

    ngOnInit() {
        this.boards = this.trello.listBoards();
    }
}
