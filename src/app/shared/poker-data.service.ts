import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PokerDataService {
  // Poker sheet data
  column1Controls: FormControl[] = Array.from({ length: 20 }, () => new FormControl(''));
  column2Controls: FormControl[] = Array.from({ length: 20 }, () => new FormControl(''));
  column3Controls: FormControl[] = Array.from({ length: 20 }, () => new FormControl(''));

  // Results data
  gameOneControls: FormControl[] = Array.from({ length: 10 }, () => new FormControl(''));
  gameTwoControls: FormControl[] = Array.from({ length: 4 }, () => new FormControl(''));
  dealerControl1 = new FormControl('');
  dealerControl2 = new FormControl('');
  dealerControl3 = new FormControl('');
  dealerControl4 = new FormControl('');
}

