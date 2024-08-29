export class Note {
    readonly id: string;
    readonly text: string;
    readonly description: string;

    constructor(id: string, text: string, description: string) {
        this.id = id;
        this.text = text;
        this.description = description;
    }

    toDto(): NoteDto {
        return {
            id: this.id,
            text: this.text,
            description: this.description,
        };
    }
}

export interface CreateNoteDto {
    text: string;
    description: string;
}

export interface UpdateNoteDto {
    id: string;
    text: string;
    description: string;
}

export interface NoteDto {
    id: string;
    text: string;
    description: string;
}
