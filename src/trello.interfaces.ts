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
    TEXT = 'text', NUMBER = 'number', CHECKBOX = 'checkbox', DATE = 'date', LIST = 'list'
}

export interface CalculatedCustomField {
    label: string;
    type: TrelloCustomFieldType;
    value: any;
}

export interface TrelloCustomFieldDefinition {
    id: string;
    name: string;
    pos: number;
    type: TrelloCustomFieldType;
    display: { cardFront: boolean };
    options?: { id: string, pos: number, color: string, value: { text: string } }[];
}

export interface TrelloCustomFieldItem {
    id: string;
    idCustomField: string;
    value?: { text?: string, number?: string, checked?: string, date?: string };
    idValue?: string; // for LIST type
}

export interface TrelloCard {
    id: string;
    idList: string;
    pos: number;
    closed: boolean;
    name: string;
    url: string;
    desc: string;
    due: string;
    dueComplete: boolean;
    labels?: Object[];
    checklists?: TrelloChecklist[];
    pluginData?: TrelloPluginData[];
    customFields?: CalculatedCustomField[];
    customFieldItems?: TrelloCustomFieldItem[];
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
    customFields?: TrelloCustomFieldDefinition[];
}
