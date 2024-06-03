import { TransactionComponent } from "./views/transaction/transaction.component";

export enum MarchandRoutes {
    MarchandDashboard  = 'dashboard/:id',
    More = 'transaction/:id/:transaId/:clientName',
    Support = 'support',
    Settings = 'settings',
    Elements = 'elements',
    
}

export enum SettingRoutes {
    Profile = 'profile',
    Users = 'users',
}

export enum SupportRoutes {
    FAQ = 'faq',
    Contact = 'contact',
}