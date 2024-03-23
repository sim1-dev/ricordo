import { Injectable } from '@angular/core';
import { Sortable } from '../models/sortable.model';

@Injectable({
  providedIn: 'root'
})
export class SortableService {

  constructor() { }

  setOrder(list: Sortable[], targetItem: Sortable, newPosition: number): Sortable[] {
    // check if the passed item exists
    let originalTargetItem: Sortable | undefined = list.find(item => item.order === targetItem.order)

    if (!originalTargetItem) 
      return list

    // check if there is any existing item with the order on newPosition
    let conflictingItem = list.find((item: Sortable) => item.order === newPosition)

    // if there is, increase its and next items orders by 1
    if (conflictingItem) {
      const conflictingItemIndex: number = list.indexOf(conflictingItem)

      for(let i: number = conflictingItemIndex; i < list.length; i++) {
        list[i].order++
      }
    }

    // set target item order to newPosition
    originalTargetItem.order = newPosition

    // sort list by order
    this.sort(list)

    return list
  }

  getNextOrder(items: Sortable[]) {
    if(!items || items.length == 0) 
      return 1

    if(!items[items.length - 1].order)
      return 1

    let highestOrder: number = items.reduce((prev, curr) => {
      return curr.order! > prev ? curr.order! : prev
    } , 0)

    return highestOrder + 1
  }

  addOrder(itemToSave: Sortable, items: Sortable[]): Sortable {
    itemToSave.order = this.getNextOrder(items)
    return itemToSave
  }

  sort(list: Sortable[]): Sortable[] {
    return list.sort((a, b) => a.order - b.order)
  }

}
