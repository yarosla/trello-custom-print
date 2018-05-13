import {Injectable, Type} from '@angular/core';
import {TrelloBoard} from './trello.interfaces';
import {CardDetailComponent} from './card-detail-wrapper.component';
import {BasicCardDetailComponent} from './cards/basic-card-detail.component';

export class BoardSettings {
    numColumns: number = 4;
    showBoardTitle: boolean = true;
    showDesc: boolean = true;
    showChecklists: boolean = true;
    showCustomFields: boolean = true;
    showDueDates: boolean = true;
    showList: {[key: string]: boolean} = {};
    cardType: Type<CardDetailComponent> = BasicCardDetailComponent;

    constructor(other?: BoardSettings) {
        if (other)
            Object.assign(this, other);
    }

    update(board: TrelloBoard): void {
        // default showList to true
        board.lists.forEach((list) => this.showList[list.id] = list.id in this.showList ? this.showList[list.id] : true);
    }
}

@Injectable()
export class SettingsService {
    private static readonly STORAGE_KEY = 'trello-board-settings';
    private settings: BoardSettings;

    constructor() {
        this.settings = new BoardSettings(JSON.parse(sessionStorage.getItem(SettingsService.STORAGE_KEY)));
    }

    loadSettings() {
        return this.settings;
    }

    saveSettings(settings: BoardSettings): void {
        this.settings = settings;
        sessionStorage.setItem(SettingsService.STORAGE_KEY, JSON.stringify(settings));
    }
}
