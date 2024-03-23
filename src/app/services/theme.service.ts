import { Injectable } from '@angular/core';
import { Theme } from '../enums/theme.enum';
import { SettingsService } from './settings.service';
import { Settings } from '../models/settings.model';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(public settingsService: SettingsService) { }

  // TODO return string
    async get(): Promise<Theme> {
      let settings: Settings = await this.settingsService.get()
  
      return settings.theme as Theme
    }
  
    async set(theme: Theme): Promise<Theme> {
      let settings: Settings = await this.settingsService.get()
  
      settings.theme = theme
  
      this.settingsService.set(settings)

      return settings.theme as Theme
    }

}
