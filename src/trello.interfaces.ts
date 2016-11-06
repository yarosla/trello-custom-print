export interface TrelloPluginData {
    id: string;
    idPlugin: string;
    idModel: string;
    value: string;
}

export interface TrelloChecklistItem {
    id: string;
    name: string;
    state: string;
}

export interface TrelloChecklist {
    id: string;
    name: string;
    checkItems?: TrelloChecklistItem[];
}

export interface TrelloList {
    id: string;
    name: string;
    closed: boolean;
    cards?: TrelloCard[];
}

export interface TrelloCard {
    id: string;
    idList: string;
    pos: number;
    closed: boolean;
    name: string;
    url: string;
    desc: string;
    labels?: Object[];
    checklists?: TrelloChecklist[];
    pluginData?: TrelloPluginData[];
}

export interface TrelloBoard {
    id: string;
    name: string;
    cards?: TrelloCard[];
    lists?: TrelloList[];
    url?: string;
}
