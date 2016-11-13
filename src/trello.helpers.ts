import {TrelloCustomFieldType, TrelloCustomField, TrelloPluginData, TrelloBoard} from './trello.interfaces';

const TRELLO_CUSTOM_FIELDS_PLUGIN_ID = '56d5e249a98895a9797bebb9';

class TrelloCustomFieldDef {
    id: string;
    label: string;
    type: TrelloCustomFieldType;
    showOnCard: boolean;
    options?: string[];
}

export class TrelloCustomFieldDecoder {
    fieldDefs: TrelloCustomFieldDef[] = [];

    constructor(board: TrelloBoard) {
        if (!board.pluginData) return;
        let plugin = board.pluginData.find((pd) => pd.idPlugin == TRELLO_CUSTOM_FIELDS_PLUGIN_ID);
        if (!plugin) return;
        let fieldsEncoded = JSON.parse(plugin.value).fields as {[key: string]: any}[];
        for (let field of fieldsEncoded) {
            this.fieldDefs.push({
                id: field['id'] as string,
                label: field['n'] as string,
                type: field['t'] as TrelloCustomFieldType,
                showOnCard: !!field['b'] as boolean,
                options: field['o'] as string[],
            });
        }
    }

    decode(cardPluginData: TrelloPluginData[]): TrelloCustomField[] {
        let plugin = cardPluginData.find((pd) => pd.idPlugin == TRELLO_CUSTOM_FIELDS_PLUGIN_ID);
        if (!plugin) return null;
        let fieldsEncoded = JSON.parse(plugin.value).fields as {[key: string]: any};
        let fields: TrelloCustomField[] = [];
        this.fieldDefs.forEach((fd) => {
            if (fd.showOnCard && fd.id in fieldsEncoded) {
                let value = fieldsEncoded[fd.id];
                if (fd.type == TrelloCustomFieldType.LIST)
                    value = fd.options[value - 1];
                fields.push({
                    label: fd.label,
                    type: fd.type,
                    value: value
                });
            }
        });
        return fields;
    }
}
