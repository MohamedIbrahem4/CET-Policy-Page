import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
    import { TableModule } from 'primeng/table';
import { DrawerModule } from 'primeng/drawer';
import { CustomTranslateService } from '../../services/custom-translate.service';
import { FormsModule } from '@angular/forms';
interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  info?: string;
  isRTL?: boolean;
}

@Component({
  selector: 'app-ploicy',
  imports: [
    CommonModule,
    TranslateModule,
    ButtonModule,
    CardModule,
 TableModule,
 DrawerModule,
 FormsModule,
  ],
  templateUrl: './ploicy.component.html',
  styleUrl: './ploicy.component.scss'
})
export class PloicyComponent {
  private translateService=inject(CustomTranslateService);
  private translate=inject(TranslateService);
 protected   visible: boolean = false;
  protected selectedLang: any;
  protected Lang: any[] = [];
  recentLanguages: Language[] = [];
  currentDate: Date = new Date();
  currentLang: string = 'en';

  @Output() languageSelected = new EventEmitter<string>();

  languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      info: 'International business language'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      info: 'Right-to-left script',
      isRTL: true
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      info: 'Original content language'
    },
    {
      code: 'el',
      name: 'Greek',
      nativeName: 'Ελληνικά',
      flag: '🇬🇷',
      info: 'Hellenic language'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      info: 'Romance language'
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      info: 'Romance language'
    },

    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      info: 'Cyrillic script'
    },
    {
    code: 'pl',
    name: 'Polish',
    nativeName: 'Polski',
    flag: '🇵🇱',
    info: 'West Slavic language'
  },
  {
    code: 'sk',
    name: 'Slovak',
    nativeName: 'Slovenčina',
    flag: '🇸🇰',
    info: 'West Slavic language'
  },
  {
    code: 'hu',
    name: 'Hungarian',
    nativeName: 'Magyar',
    flag: '🇭🇺',
    info: 'Uralic language'
  },
  {
    code: 'cs',
    name: 'Czech',
    nativeName: 'Čeština',
    flag: '🇨🇿',
    info: 'West Slavic language'
  },{
      code: 'nl',
      name: 'Dutch',
      nativeName: 'Nederlands',
      flag: '🇳🇱',
      info: 'Germanic language'
    },
  ];


      onLanguageChange(event: any) {
    const selectedLanguage = event;
    this.translateService.setLanguage(selectedLanguage);
    this.selectedLang = this.Lang.find(
      (lang) => lang.lang === selectedLanguage
    );
  }
  selectLanguage(lang: Language): void {
    this.currentLang = lang.code;
    this.translate.use(lang.code);
    this.languageSelected.emit(lang.code);
    //this.translateService.setLanguage();

    // Update document direction for RTL languages
    if (lang.isRTL) {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }

    // Add to recent languages
    this.addToRecentLanguages(lang);

    // Close drawer after a brief delay
    setTimeout(() => this.closeDrawer(), 300);
  }

  addToRecentLanguages(lang: Language): void {
    // Remove if already exists
    this.recentLanguages = this.recentLanguages.filter(l => l.code !== lang.code);

    // Add to beginning
    this.recentLanguages.unshift(lang);

    // Keep only last 4
    this.recentLanguages = this.recentLanguages.slice(0, 4);

    // Save to localStorage
    localStorage.setItem('recentLanguages', JSON.stringify(this.recentLanguages.map(l => l.code)));
    const lag:any =lang.code;
    this.translateService.setLanguage(lag);

  }

  loadRecentLanguages(): void {
    try {
      const recentCodes = JSON.parse(localStorage.getItem('recentLanguages') || '[]');
      this.recentLanguages = recentCodes
        .map((code: string) => this.languages.find(l => l.code === code))
        .filter((lang: Language | undefined): lang is Language => !!lang)
        .slice(0, 4);
    } catch (error) {
      this.recentLanguages = [];
    }
  }

  isCurrentLanguage(langCode: string): boolean {
    return this.currentLang === langCode;
  }

  getLanguageItemClass(lang: Language): string {
    const baseClasses = 'rounded-xl border transition-all duration-200';

    if (this.isCurrentLanguage(lang.code)) {
      return `${baseClasses} bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-sm`;
    }

    return `${baseClasses} border-gray-200 hover:border-blue-300 hover:bg-blue-25 hover:shadow-md`;
  }

  closeDrawer(): void {
    this.visible = false;
    // this.visibleChange.emit(false);
    // this.searchTerm = '';
    // this.filteredLanguages = [...this.languages];
  }



}
