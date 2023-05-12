import {Answer} from "./Answer.ts";

export interface Question {
    id: string
    text: string
    answers: Answer[]
}
