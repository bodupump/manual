import { NoteTarget } from "../targets/note";
import { BaseManyQuery } from "./BaseManyQuery";
import { BaseOneQuery } from "./BaseOneQuerry";

export class NoteManyQuery extends BaseManyQuery<NoteTarget> {

}

export class NoteOneQuery extends BaseOneQuery<NoteTarget> {

}