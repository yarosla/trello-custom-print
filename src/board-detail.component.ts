import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {TrelloService} from './trello.service';
import {TrelloBoard, TrelloList, TrelloCard} from './trello.interfaces';
import {BoardSettings, SettingsService} from './settings.service';
import {TrelloCustomFieldDecoder} from './trello.helpers';


@Component({
    selector: 'board-detail',
    templateUrl: './board-detail.component.html',
})
export class BoardDetailComponent implements OnInit {
    board: TrelloBoard;
    settings: BoardSettings;

    get selectedLists() {
        return this.board.lists.filter((list, idx) => this.settings.showList[list.id]);
    }

    constructor(private trello: TrelloService, private settingsService: SettingsService, private route: ActivatedRoute) {
    }

    //noinspection JSMethodCanBeStatic
    trackByLists(index: number, list: TrelloList) { return list.id; }

    //noinspection JSMethodCanBeStatic
    trackByCards(index: number, card: TrelloCard) { return card.id; }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.trello.fetchBoard(params['boardId'])
                .subscribe((board) => {
                    this.board = this.preProcessBoard(board);
                    this.settings = this.settingsService.loadSettings();
                    this.settings.update(this.board);
                });
        });
    }

    settingsChanged(settings: BoardSettings) {
        this.settingsService.saveSettings(settings);
    }

    //noinspection JSMethodCanBeStatic
    print() {
        window.print();
    }

    refresh() {
        this.trello.fetchBoard(this.board.id)
            .subscribe((board) => {
                this.board = this.preProcessBoard(board);
                this.settings.update(this.board);
            });
    }

    private preProcessBoard(board: TrelloBoard): TrelloBoard {
        let customFieldDecoder = new TrelloCustomFieldDecoder(board);
        // sort cards into lists
        for (let card of board.cards) {
            if (card.closed) continue;
            let list = board.lists.find((l) => l.id == card.idList);
            list.cards = list.cards || [];
            list.cards.push(card);
            this.preProcessCard(card, customFieldDecoder);
        }
        board.lists = board.lists.filter((l) => !l.closed);
        console.log('board', board);
        return board;
    }

    //noinspection JSMethodCanBeStatic
    private preProcessCard(card: TrelloCard, customFieldDecoder: TrelloCustomFieldDecoder) {
        card.customFields = customFieldDecoder.decode(card.pluginData);
    }
}
