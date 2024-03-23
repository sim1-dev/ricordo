import { Identifiable } from "../core/models/identifiable.model"

export interface Timer extends Identifiable {
    name: string
    lastPressed: Date
    icon: string
}