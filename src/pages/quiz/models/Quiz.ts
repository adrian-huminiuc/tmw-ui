import {Question} from "./Question.ts";

export interface Quiz {
    id: number
    name: string
    description: string
    questions: Array<Question>
}
