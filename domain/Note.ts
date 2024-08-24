export class Note {
    id : string;
    text : string;
    description : string;

    constructor(id : string, text : string, description : string) {
        this.id = id;
        this.text = text;
        this.description = description;
    }
}

export interface CreateNoteDto {
    text : string;
    description : string;
}

export interface UpdateNoteDto {
    id : string;
    text : string;
    description : string;
}