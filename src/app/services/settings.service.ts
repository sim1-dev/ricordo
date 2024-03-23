import { Injectable } from '@angular/core';
import { Settings } from '../models/settings.model';
import { EntityType } from '../core/enums/entity-type';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor(public storage: Storage) { }

  async get(): Promise<Settings> {
    let unparsedSettings: string | null = await this.storage.get(EntityType.SETTINGS)

    if(!unparsedSettings)
      return new Settings()

    let settings: Settings = JSON.parse(unparsedSettings) as Settings

    return settings
  }

  async set(settings: Settings): Promise<Settings> {
    await this.storage.set(EntityType.SETTINGS, settings.toString())

    return settings
  }

  async reset(): Promise<Settings> {
    await this.storage.remove(EntityType.SETTINGS)

    await this.storage.set(EntityType.SETTINGS, new Settings().toString())

    return await this.get() as Settings;
  }
}
