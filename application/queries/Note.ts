import { NoteTarget } from "../targets/Note";
import { BaseManyQuery } from "./BaseManyQuery";
import { BaseOneQuery } from "./BaseOneQuery";

export class NoteManyQuery extends BaseManyQuery<NoteTarget> {

}

export class NoteOneQuery extends BaseOneQuery<NoteTarget> {

}