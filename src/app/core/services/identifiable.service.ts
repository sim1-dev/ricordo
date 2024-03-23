import { Injectable } from '@angular/core';
import { Identifiable } from '../models/identifiable.model';

@Injectable({
  providedIn: 'root'
})
export class IdentifiableService {
  constructor() { }

  getNextId(items: Identifiable[]) {
    if(!items || items.length == 0) 
      return 1

    if(!items[items.length - 1].id)
      return 1

    // calc highest id
    let highestId = items.reduce((prev, curr) => {
      return curr.id! > prev ? curr.id! : prev
    } , 0)

    return highestId + 1
  }

  addId(itemToSave: Identifiable, items: Identifiable[]): Identifiable {
    itemToSave.id = this.getNextId(items)
    return itemToSave
  }
}
