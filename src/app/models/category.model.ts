import { Identifiable } from "../core/models/identifiable.model"
import { Sortable } from "../core/models/sortable.model"
import { Timer } from "./timer.model"

export interface Category extends Identifiable, Sortable {
    name: string
    timers: Timer[]
}