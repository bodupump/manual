export class Note {
    id : string;
    text : string;
    description : string;

    constructor(note : Note) {
        this.id = note.id;
        this.text = note.text;
        this.description = note.description;
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