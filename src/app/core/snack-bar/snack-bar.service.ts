import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';

@Injectable()
export class SnackBarService {

  snackBarConfig: MatSnackBarConfig = new MatSnackBarConfig();
  message: string;

  constructor(private snackBar: MatSnackBar) {
    this.snackBarConfig.duration = 3200;
  }

  showSnackBar(designType: string, messageType: string, message?: string) {
    this.setType(designType);
    this.setMessage(messageType, message);
    return this.snackBar.open(this.message, '', this.snackBarConfig);
  }

  setType(designType: string) {
    switch (designType) {
      case ('success'):
        this.snackBarConfig.panelClass = ['success-snackbar'];
        break;
      case ('error'):
        this.snackBarConfig.panelClass = ['error-snackbar'];
        break;
    }
  }

  setMessage(messageType: string, message?: string) {
    switch (messageType) {
      case ('custom'):
        this.message = message;
        break;
      case ('create'):
        this.message = 'Skapandet lyckades';
        break;
      case ('create-user'):
        this.message = 'Användare skapad';
        break;
      case ('delete'):
        this.message = 'Lyckad bortagning';
        break;
      case ('update'):
        this.message = 'Lyckad uppdatering';
        break;
      case ('login'):
        this.message = 'Lyckad inloggning';
        break;
      case ('login-fail'):
        this.message = 'Misslyckad inloggning';
        break;
      case ('logout'):
        this.message = 'Lyckad Utloggning';
        break;
      case ('sign-up'):
        this.message = 'Lyckad regnistrering';
        break;
      case ('auth'):
        this.message = 'Du måste vara inloggad för att nå denna sida';
        break;
      case ('image'):
        this.message = 'Endast bildfiler är tillåtna';
        break;
      case ('login-error'):
        this.message = 'Fel email eller lösenord';
        break;
      case ('wrong-password'):
        this.message = 'Fel lösenord';
        break;
      case ('wrong-email'):
        this.message = 'Emailen är inte registrerad';
        break;
      case ('password-reset'):
        this.message = 'Lösenord återställt, kolla din Mail';
        break;

    }
  }

}
