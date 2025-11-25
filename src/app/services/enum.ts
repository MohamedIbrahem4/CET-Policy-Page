

export type StorageLanguage = 'en' | 'ar'|'de';
export enum StorageKey {
  Language = 'LANGUAGE',
  Cart='CART',
  CartToken='CART_TOKEN',
  Tokenization = 'TOKENIZATION',
  AccountLogo = 'ACCOUNTLOGO',
  Permissions = 'PERMISSIONS',
  AccountId = 'AccountId',
  User = 'USER',
  UserLogin = 'USER_LOGIN',
}


export enum Permissions {
  NoPermission = 'NoPermission',
  Admin = 'Admin',
  user='User'
}

export enum UserRole {
  Admin = 1,
  Customer = 2
}
