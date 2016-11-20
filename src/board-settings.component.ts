import {Component, Input, Type} from '@angular/core';
import {TrelloBoard, TrelloList} from './trello.interfaces';
import {CardDetailComponent} from './card-detail-wrapper.component';
import {BasicCardDetailComponent} from './cards/basic-card-detail.component';

export class BoardSettings {
    numColumns: number = 4;
    showBoardTitle: boolean = true;
    showDesc: boolean = true;
    showChecklists: boolean = true;
    showCustomFields: boolean = true;
    lists?: {id: string, name: string, show: boolean}[];
    cardType: Type<CardDetailComponent> = BasicCardDetailComponent;

    constructor(board: TrelloBoard) {
        this.refresh(board);
    }

    refresh(board: TrelloBoard) {
        let oldLists = this.lists;
        this.lists = [];
        board.lists.forEach((list) => {
            this.lists.push({id: list.id, name: list.name, show: wasShown(list)});
        });

        function wasShown(list: TrelloList): boolean {
            if (!oldLists) return true; // shown by default
            let oldList = oldLists.find((l)=>l.id == list.id);
            return oldList ? oldList.show : true;
        }
    }

    isShown(list: TrelloList): boolean {
        let l = this.lists.find((l)=>l.id == list.id);
        return l ? l.show : true;
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
