import { Injectable, inject } from '@angular/core';
import { EntityType } from '../enums/entity-type';
import { Storage } from '@ionic/storage';
import { Identifiable } from '../models/identifiable.model';
import { IdentifiableService } from './identifiable.service';
import { Sortable } from '../models/sortable.model'
import { SortableService } from './sortable.service';
import { Crud } from 'src/app/interface/crud.interface';

@Injectable({
  providedIn: 'root'
})
export class EntityService<T extends Identifiable & Sortable> implements Crud<T> {
  index: EntityType

  storage: Storage
  identifiableService: IdentifiableService
  sortableService: SortableService

  constructor() {
    this.index = EntityType.SETTINGS

    this.storage = inject(Storage)
    this.identifiableService = inject(IdentifiableService)
    this.sortableService = inject(SortableService)
  }

  async getAll(): Promise<T[]> {
    let unparsedItems: string = await this.storage.get(this.index)

    let items: T[] = JSON.parse(unparsedItems) as T[]

    if(!items || typeof items === 'string')
      return [] as T[]

    items = this.sortableService.sort(items) as T[]

    return items
  }

  async saveAll(items: T[]): Promise<T[]> {
    await this.storage.set(this.index, JSON.stringify(items))

    return items
  }

  async find(id: number): Promise<T | undefined> {
    let items: T[] = await this.getAll()

    let item: T | undefined = items.find(item => item.id === id)

    return item
  }

  async findByOrder(order: number): Promise<T | undefined> {
    let items: T[] = await this.getAll()

    let item: T | undefined = items.find(item => item.order === order)

    return item
  }

  async add(item: T): Promise<T[]> {
    let items: T[] = await this.getAll()

    this.identifiableService.addId(item, items)
    this.sortableService.addOrder(item, items);

    items.push(item)

    await this.storage.set(this.index, JSON.stringify(items))

    return items 
  }

  async update(item: T): Promise<T[]> {
    let items: T[] = await this.getAll()
    
    let indexToUpdate: number = items.findIndex(existingItem => existingItem.id === item.id)
    items[indexToUpdate] = item
    items = Object.assign([], items)

    await this.storage.set(this.index, JSON.stringify(items))

    return items
  }

  async remove(id: number): Promise<T[]> {
    let items: T[] = await this.getAll()

    let item: T = items.find(item => item.id === id) as T

    items.splice(items.indexOf(item), 1)

    await this.storage.set(this.index, JSON.stringify(items))

    return items
  }

  async reset(): Promise<T[]> {
      let emptyItems: T[] = [] as T[]

      await this.storage.remove(this.index)
  
      await this.storage.set(this.index, JSON.stringify(emptyItems.toString()))

      return emptyItems
  }

}
