import {Component, Input, Type} from '@angular/core';
import {TrelloBoard} from './trello.interfaces';
import {CardDetailComponent} from './card-detail-wrapper.component';
import {BasicCardDetailComponent} from './cards/basic-card-detail.component';

export class BoardSettings {
    numColumns: number = 4;
    showDesc: boolean = true;
    showChecklists: boolean = true;
    showCustomFields: boolean = true;
    lists?: {show: boolean, name: string}[];
    cardType: Type<CardDetailComponent> = BasicCardDetailComponent;


    constructor(board: TrelloBoard) {
        this.lists = [];
        board.lists.forEach((list) => this.lists.push({name: list.name, show: true}));
    }
}

@Component({
    selector: 'board-settings',
    templateUrl: './board-settings.component.html',
    styles: [`
            `]
})
export class BoardSettingsComponent {
    @Input()
    settings: BoardSettings;
}
