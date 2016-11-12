import {Component, OnInit, Type} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrelloService} from './trello.service';
import {TrelloBoard} from './trello.interfaces';
import {BasicCardDetailComponent} from './cards/basic-card-detail.component';
import {CardDetailComponent} from './card-detail-wrapper.component';

@Component({
    selector: 'board-detail',
    templateUrl: './board-detail.component.html',
})
export class BoardDetailComponent implements OnInit {
    board: TrelloBoard = {id: null, name: null};
    cardType: Type<CardDetailComponent> = BasicCardDetailComponent;

    constructor(private trello: TrelloService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.trello.fetchBoard(params['boardId'])
                .subscribe((board) => {this.board = this.preProcessBoard(board);});
        });
    }

    private preProcessBoard(board: TrelloBoard): TrelloBoard {
        for (let card of board.cards) {
            if (card.closed) continue;
            let list = board.lists.find((l) => l.id == card.idList);
            list.cards = list.cards || [];
            list.cards.push(card);
        }
        board.lists = board.lists.filter((l)=>!l.closed);
        console.log('board', board);
        return board;
    }
}
