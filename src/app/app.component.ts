import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokerSheetComponent } from "./poker-sheet/poker-sheet.component";
import { HeaderComponent } from "./header/header.component";
import { ResultsComponent } from './results/results.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PokerSheetComponent, HeaderComponent, ResultsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'pokersheets';
}
