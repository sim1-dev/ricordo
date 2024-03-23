import { Component, OnDestroy, OnInit } from '@angular/core';
import { SortableService } from '../core/services/sortable.service';
import { CategoryService } from '../services/category.service';
import { Observable, Subject, of, takeUntil, tap } from 'rxjs';
import { Category } from '../models/category.model';
import { Timer } from '../models/timer.model';
import { AlertController, AlertInput } from '@ionic/angular';

export class CategoryModalValue {
  id: number = 0
  name: string = ""
}

@Component({
  selector: 'app-categories',
  templateUrl: 'categories.page.html',
  styleUrls: ['categories.page.scss']
})
export class CategoriesPage implements OnInit, OnDestroy {

  destroy$: Subject<boolean> = new Subject<boolean>();
  categories$: Observable<Category[]> = new Observable<Category[]>()

  constructor(public categoryService: CategoryService, public sortableService: SortableService, public alertController: AlertController) {}

  async ngOnInit() {
    this.load()
  }

  async load() {
    let categories: Category[] = await this.categoryService.getAll()

    this.categories$ = of(categories).pipe(
      takeUntil(this.destroy$),
      tap(x => console.log(x, "loaded categories"))
    )
  }

  async saveAll(categories: Category[]) {
    await this.categoryService.saveAll(categories)
    await this.load()
  }

  async create(category: Category) {
    await this.categoryService.add(category)
    this.load()
  }

  async update(category: Category) {
    await this.categoryService.update(category)
    this.load()
  }

  async delete(id: number) {
    await this.categoryService.remove(id)
    this.load()
  }

  async openCreateOrUpdateModal(id: number = 0) {
    let isUpdate: boolean = id !== 0;

    let category: Category = {
      id: 0,
      order: 0,
      name: '',
      timers: [] as Timer[]
    }
    
    if(isUpdate)
      category = await this.categoryService.find(id) as unknown as Category

    const modal: HTMLIonAlertElement = await this.alertController.create({
      header: (isUpdate ? 'Update' : 'Create') + ' ' + 'category',
      buttons: [{
        text: 'Cancel',
        cssClass: 'alert-button-cancel',
        role: 'cancel',
      },
      {
        text: isUpdate ? 'Update' : 'Create',
        cssClass: 'alert-button-confirm',
        role: 'confirm',
        handler: async (value: CategoryModalValue) => {
          if(!value.name)
            return

          if(isUpdate)
            await this.handleUpdateModalResult(value)
          else
            await this.handleCreateModalResult(value)
        }
      }],
      inputs: [
        {
          name: 'id',
          type: 'number',
          value: category.id,
          cssClass: 'ion-hide'
        },
        {
          name: 'name',
          type: 'text',
          value: category.name,
          placeholder: 'Name',
          cssClass: 'alert-input',
        }
      ]
    });

    await modal.present()
  }

  async handleUpdateModalResult(categoryModalValue: CategoryModalValue) {
    let category: Category = await this.categoryService.find(categoryModalValue.id) as unknown as Category

    category = {
      ...category,
      ...categoryModalValue
    }

    await this.update(category)
  }

  async handleCreateModalResult(categoryModalValue: CategoryModalValue) { 
    let category: Category = {
      ...categoryModalValue,
      order: 0,
      timers: [] as Timer[],
    }

    await this.create(category)
  }



  async openDeleteModal(id: number) {
    const modal = await this.alertController.create({
      header: 'Confirm action',
      message: 'Are you sure you want to delete this category?',
      buttons: [{
        text: 'Cancel',
        cssClass: 'alert-button-cancel',
        role: 'cancel',
      },
      {
        text: 'Delete',
        cssClass: 'alert-button-confirm',
        role: 'confirm',
        handler: () => {
          this.delete(id)
        },
      }],
    });

    await modal.present();
  }


  async handleReorder(event: CustomEvent<any>) {
    console.log(event, "event on drag")
    console.log('Dragged from index', event.detail.from, 'to', event.detail.to)

    // TODO FIX UI (il target si sposta un blocco sopra)
    // TODO oppure write swapOrders

    // let categories: Category[] = await this.categoryService.getAll()

    // let categoryToMove: Category = categories[event.detail.from]
    // let destination: number

    // try {
    //   destination = categories[event.detail.to + 1].order
    // } catch (error) {
    //   destination = this.sortableService.getNextOrder(categories)
    // }
    
    // let sortedCategories: Category[] = this.sortableService.setOrder(categories, categoryToMove, destination) as Category[]

    // console.log(sortedCategories, "sortedCategories")

    event.detail.complete()

    //this.saveAll(sortedCategories)
  }




  ngOnDestroy() {
    this.destroy$.next(true)
    this.destroy$.complete()
  }

}
