  import { Injectable, Inject } from '@angular/core';
  import { TranslateService } from '@ngx-translate/core';
  import { DOCUMENT } from '@angular/common';
  import { PrimeNG } from 'primeng/config';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
import { StorageKey, StorageLanguage } from './enum';
import { StorageService } from './storage.service';

  @Injectable({
    providedIn: 'root',
  })
  export class CustomTranslateService {
    public ArabicIsDefaultLang = true;
    public currentLanguage!: StorageLanguage; // Definite assignment operator to avoid TS error
    private languageChangeSubject = new BehaviorSubject<StorageLanguage>(this.currentLanguage || 'en');
    public languageChange$ = this.languageChangeSubject.asObservable();

    public globalDictionary: { [id: string]: any } = {
      error: '',
      success: '',
      accountInformation: '',
      internalServerError: '',
      unauthorized: '',
      wrongLogin: '',
      productAvailability: '',
      statusEnum1: '',
      statusEnum0: '',
      storeStatus0: '',
      storeStatus1: '',
      storeStatus2: '',
      storeStatus3: '',
      userStatus0: '',
      userStatus1: '',
      userStatus2: '',
      userStatus3: '',
      userRole1: '',
      userRole2: '',
      userRole3: '',
      userRole4: '',
    };

    constructor(
      private config: PrimeNG,
      @Inject(DOCUMENT) private document: Document,
      private translate: TranslateService,
      private storageService: StorageService
    ) {}

    public translateInstant(key: string) {
      let translation = this.translate.instant(key);
      return translation;
    }

    public instant(key: string, params?: any) {
      return this.translate.instant(key, params);
    }

    get currentLang(): string {
      return this.translate.currentLang;
    }

    public checkDirection() {
      let htmlTag = this.document.getElementsByTagName('html')[0] as HTMLHtmlElement;
      htmlTag.dir = this.isArabic ? 'rtl' : 'ltr'; // Set RTL direction for Arabic
      htmlTag.lang = this.currentLanguage; // Set language attribute

    }

    changeCssFile(lang: string) {
      let headTag = this.document.getElementsByTagName('head')[0] as HTMLHeadElement;
      let existingLink = this.document.getElementById('langCss') as HTMLLinkElement;

      let bundleName = lang === 'ar' ? 'css/classic-ar.css' : 'css/classic.css';

      if (existingLink) {
        existingLink.href = bundleName;
      } else {
        let newLink = this.document.createElement('link');
        newLink.rel = 'stylesheet';
        newLink.type = 'text/css';
        newLink.id = 'langCss';
        newLink.href = bundleName;
        headTag.appendChild(newLink);
      }
    }

    public setDefaultLanguage(lang: StorageLanguage) {
      this.translate.setDefaultLang(lang);
    }

    public setLanguage(lang: StorageLanguage) {
      this.currentLanguage = lang;
      this.storageService.set(StorageKey.Language, lang);
      this.translate.setDefaultLang(lang);
      this.translate.use(lang);

      this.translate.get('primeng').subscribe((res) => this.config.setTranslation(res));
      this.languageChangeSubject.next(this.currentLanguage);

      this.setGlobalDictionary();
      this.checkDirection(); // Update the direction whenever the language is changed

    }

    public get isArabic(): boolean {
      return this.currentLanguage === 'ar'; // Check if the current language is Arabic
    }

    public get direction(): string {
      return this.isArabic ? 'rtl' : 'ltr'; // Return 'rtl' for Arabic and 'ltr' for others
    }

    public getkeyName(key: string): Observable<string> {
      return this.translate.get(key).pipe(map((nameData) => nameData));
    }

    public getArraykeysName(key: Array<string>): Observable<Array<string>> {
      return this.translate.get(key).pipe(map((nameData) => nameData));
    }

    public fillDictionary(dictionary: any): Observable<any> {
      const arr = Object.values(dictionary) as any;
      return this.getArraykeysName(arr).pipe(
        map((res) => {
          Object.keys(dictionary).forEach((prop: any) => {
            dictionary[prop] = res[prop];
          });
          return res;
        })
      );
    }

    public setGlobalDictionary(): Observable<any> {
      Object.keys(this.globalDictionary).forEach((key) => {
        this.globalDictionary[key] = key;
      });

      return this.fillDictionary(this.globalDictionary);
    }

    // Removed hardcoding the language to 'ar'. Now it checks storage on initialization.
    initialize(): Observable<boolean> {
      this.checkDefaultlanguage(); // Ensure the language is checked from storage or fallback to default.
      return this.setGlobalDictionary().pipe(
        map(() => {
          return true;
        })
      );
    }

    // Check and load the language from storage or default to 'en' if not set
    private checkDefaultlanguage() {
      this.currentLanguage = this.storageService.get(StorageKey.Language) || 'en'; // Default to 'en' if no language is stored
      this.setLanguage(this.currentLanguage); // Set language to stored or default value
    }
  }
