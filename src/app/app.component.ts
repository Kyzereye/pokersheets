import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { PokerSheetComponent } from './poker-sheet/poker-sheet.component';
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, PokerSheetComponent, ResultsComponent],
  templateUrl: './app.component.html',
})
export class AppComponent {}
