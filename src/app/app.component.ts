import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { SettingsService } from './services/settings.service';
import { CategoryService } from './services/category.service';
import { Settings } from './models/settings.model';
import { Category } from './models/category.model';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  settings: Settings = new Settings()
  categories: Category[] = [] as Category[]

  constructor(public storage: Storage, public settingsService: SettingsService, public categoryService: CategoryService) {}

  async ngOnInit() {
    await this.storage.create()

    await this.initSettings()
    await this.initCategories()
  }

  async initSettings() {
    this.settings = await this.settingsService.get()

    if(!this.settings)
      this.settings = await this.settingsService.reset()
  }

  async initCategories() {
    this.categories = await this.categoryService.getAll()

    if(!this.categories || Array.isArray(this.categories) && this.categories.length == 0)
      this.categories = await this.categoryService.reset()
  }

}
