import { CreateNoteDto, Note, UpdateNoteDto } from "../../../domain/Note";
import { NoteManyQuery, NoteOneQuery } from "../../queries/Note";
import { NoteRepositoryResponse } from "../../responces/Note";

export interface INoteRepository {
    getMany (query? : NoteManyQuery) : Promise<NoteRepositoryResponse[]>;
    getOne(query? : NoteOneQuery) : Promise<Note>;
    create(dto : CreateNoteDto) : Promise<Note>;
    update(dto : UpdateNoteDto) : Promise<Note>;
    delete (id : string) : Promise<void>;
}

export const INoteRepository = Symbol('INoteRepository');
