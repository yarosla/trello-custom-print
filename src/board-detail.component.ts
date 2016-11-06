import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrelloService} from './trello.service';
import {TrelloBoard} from './trello.interfaces';

@Component({
    selector: 'board-detail',
    templateUrl: './board-detail.component.html',
})
export class BoardDetailComponent implements OnInit {
    board: TrelloBoard = {id: null, name: null};

    constructor(private trello: TrelloService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.trello.fetchBoard(params['boardId'])
                .subscribe((board) => {this.board = this.processBoard(board);});
        });
    }

    private processBoard(board: TrelloBoard): TrelloBoard {
        for (let card of board.cards) {
            if (card.closed) continue;
            let list = board.lists.find((l) => l.id == card.idList);
            list.cards = list.cards || [];
            list.cards.push(card);
        }
        console.log('board', board);
        return board;
    }
}
