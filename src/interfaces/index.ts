export interface ValueOption {
    nextId: number | Boolean;
    value: Boolean | string;
    text: string;
}

export interface ListItem {
    id: number;
    name: string;
    text: string;
    uiType: string;
    valueType: string;
    valueOptions: ValueOption[];
}


export interface AnswerItem {
    name: string;
    value: Boolean | string;
}
