import { AccountStatus } from "../enums/account-status.enum";
import { Language } from "../enums/language.enum";
import { Theme } from "../enums/theme.enum";

export class Settings {
    accountStatus: AccountStatus
    theme: Theme
    language: Language

    constructor() {
        this.accountStatus = AccountStatus.FREE
        this.theme = Theme.DARK
        this.language = Language.ENGLISH
    }
}

