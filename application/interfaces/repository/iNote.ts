import { CreateNoteDto, Note, UpdateNoteDto } from "../../../domain/Note";

export interface INoteRepository {
    get() : Promise<Note[]>;
    create(dto : CreateNoteDto) : Promise<Note>;
    update(dto : UpdateNoteDto) : Promise<Note>;
    delete (id : string) : Promise<void>;
}