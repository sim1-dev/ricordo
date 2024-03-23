import { Injectable } from '@angular/core';
import { EntityType } from '../core/enums/entity-type';
import { Category } from '../models/category.model';
import { EntityService } from '../core/services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends EntityService<Category> {
  constructor() { 
    super()
    this.index = EntityType.CATEGORIES
  }
}
