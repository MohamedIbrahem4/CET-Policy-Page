import { Injectable } from '@angular/core';
import { StorageKey } from './enum';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  public set(key: StorageKey, object: any, storeInLocalStorage: boolean = true) {
    const objStr = JSON.stringify(object);
    try {
      if (storeInLocalStorage) {
        localStorage.setItem(key.toString(), objStr);
      } else {
        sessionStorage.setItem(key.toString(), objStr);
      }
    } catch (err) {
      console.warn('Error in store object in session or local storage, ' + err);
    }
  }

  public get(key: StorageKey) {
    try {
      let objStr = sessionStorage.getItem(key.toString());

      if (!objStr) {
        objStr = localStorage.getItem(key.toString());
      }

      if (!objStr) {
        return null;
      }

      return JSON.parse(objStr);
    } catch (err) {
      console.warn('Error in get object from session or local storage, ' + err);
    }
  }

  public clearAllStorage() {
    this.clearLocalStorage();
    this.clearSessionStorage();
  }

  public clearLocalStorage() {
    localStorage.clear();
  }

  public clearSessionStorage() {
    sessionStorage.clear();
  }
}
