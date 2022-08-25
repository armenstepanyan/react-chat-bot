export interface ValueOption {
    nextId: number | boolean;
    value: boolean | string;
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
    value: boolean | string;
}
