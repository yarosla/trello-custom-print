import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {TrelloService} from './trello.service';
import {TrelloBoard} from './trello.interfaces';

@Component({
    selector: 'boards-list',
    // styleUrls: ['./boards-list.component.scss'],
    templateUrl: './boards-list.component.html',
})
export class BoardsListComponent implements OnInit {
    boardId: string;
    boards: Observable<TrelloBoard>;

    constructor(private trello: TrelloService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.boards = this.trello.listBoards();
        });
    }
}
