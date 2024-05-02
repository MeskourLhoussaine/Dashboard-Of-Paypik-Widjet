export enum AdminRoutes {
  Dashboard = 'dashboard',
  More = 'more/:marchanId',
  Transaction = 'more/transaction',
  Edit = 'marchand/edit/:merchantId',
  Validation = 'validation',
  Add = 'marchand/add',
  Events = 'events',
  Settings = 'settings',
  Elements = 'elements',
}

export enum ElementRoutes {
  Alert = 'alert',
  Modal = 'modal',
  Buttons = 'buttons',
  Tabs = 'tabs',
  DataTable = 'data-table',
  Forms = 'forms',
}

export enum SettingRoutes {
  Profile = 'profile',
  Users = 'users',
}
