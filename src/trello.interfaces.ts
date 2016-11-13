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

export interface TrelloPluginData {
    id: string;
    idPlugin: string;
    idModel: string;
    value: string;
}

export enum TrelloCustomFieldType {
    TEXT, NUMBER, CHECKBOX, DATE, LIST
}

export interface TrelloCustomField {
    label: string;
    type: TrelloCustomFieldType;
    value: any;
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
    customFields?: TrelloCustomField[];
}

export interface TrelloList {
    id: string;
    name: string;
    closed: boolean;
    cards?: TrelloCard[];
}

export interface TrelloBoardPluginData {
    id: string;
    idModel: string;
    idPlugin: string;
    value: string;
}

export interface TrelloBoard {
    id: string;
    name: string;
    cards?: TrelloCard[];
    lists?: TrelloList[];
    url?: string;
    pluginData?: TrelloBoardPluginData[];
}
