import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

function createControls(count: number): FormControl[] {
  return Array.from({ length: count }, () => new FormControl(''));
}

@Injectable({ providedIn: 'root' })
export class PokerDataService {
  column1 = createControls(20);
  column2 = createControls(20);
  column3 = createControls(20);
  gameOne = createControls(10);
  gameTwo = createControls(4);
  dealers = createControls(4);
}
