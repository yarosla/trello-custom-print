
export interface TrelloCard {
    id: string;
    name: string;
}

export interface TrelloBoard {
    id: string;
    name: string;
    cards?: Array<TrelloCard>;
}
