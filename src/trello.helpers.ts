import {
    CalculatedCustomField,
    TrelloBoard,
    TrelloCustomFieldDefinition,
    TrelloCustomFieldItem,
    TrelloCustomFieldType
} from "./trello.interfaces";

export class TrelloCustomFieldDecoder {
    fieldDefs: TrelloCustomFieldDefinition[] = [];

    constructor(board: TrelloBoard) {
        if (!board.customFields) return;
        this.fieldDefs = board.customFields;
        console.debug('board fieldDefs', board.customFields);
    }

    decode(cardFieldItems: TrelloCustomFieldItem[]): CalculatedCustomField[] {
        if (!cardFieldItems) return null;
        let fields: CalculatedCustomField[] = [];
        this.fieldDefs.forEach((fd) => {
            if (fd.display.cardFront) {
                let item = cardFieldItems.find((i) => i.idCustomField == fd.id);
                if (item) {
                    let value: string;
                    if (fd.type == TrelloCustomFieldType.TEXT) {
                        value = item.value.text;
                    } else if (fd.type == TrelloCustomFieldType.NUMBER) {
                        value = item.value.number;
                    } else if (fd.type == TrelloCustomFieldType.LIST) {
                        let opt = fd.options.find((o) => o.id == item.idValue);
                        value = opt ? opt.value.text : '?';
                    } else if (fd.type == TrelloCustomFieldType.CHECKBOX) {
                        value = item.value.checked ? 'Yes' : 'No';
                    } else if (fd.type == TrelloCustomFieldType.DATE) {
                        value = item.value.date ? item.value.date.substring(0, 10) : '-';
                    }
                    fields.push({
                        label: fd.name,
                        type: fd.type,
                        value: value
                    });
                }
            }
        });
        return fields;
    }
}
